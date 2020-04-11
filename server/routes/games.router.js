const express = require('express');
const router = express.Router();
const Game = require('../models/Game');
const Review = require('../models/Review');
const { isEmptyField } = require('../lib/validatorMW');
const { checkUserRole, hasPlayed, checkOwnership } = require('../lib/authMW');
const calcAverage = require('../utils/avgCalculator');
const getOptions = require('../utils/getOptions');

// GET route - retrieve all games from database
router.get('/', async (req, res, next) => {
  try {
    const { name, platforms, genres, ESRB, sortBy, fields } = req.query;
    const filter = {};
    if (name) filter.name = { $regex: name, $options: 'i' };
    if (platforms) filter.platforms = { $all: platforms };
    if (genres) filter.genres = { $all: genres };
    if (ESRB) filter.ESRB = ESRB;

    const limit = Number(req.query.limit) || 9;
    const page = Number(req.query.page) || 1;
    const skip = (page - 1) * limit;
    const sort = Array.isArray(sortBy) ? sortBy.join(' ') : sortBy;

    const numOfGames = await Game.findGames(filter);
    console.log(numOfGames.length);

    const games = await Game.findGames(filter, limit, sort, fields, skip);

    return res.status(200).json({ results: games.length, games, total: numOfGames.length });
  } catch (error) {
    console.log('Error retrieving games', error);
    return res.status(500).json({ message: 'Internal server error fetching games from database' });
  }
});

// GET route - retrieve all platforms and genres avaiable in db
router.get('/filters', async (req, res, next) => {
  try {
    const retrievedGames = await Game.find({}, { platforms: 1, genres: 1, _id: 0 });
    const platforms = getOptions(retrievedGames, 'platforms');
    const genres = getOptions(retrievedGames, 'genres');
    const ESRB = Game.schema.path('ESRB').enumValues;

    return res.json({ platforms, genres, ESRB });
  } catch (error) {
    console.log('Error retrieving games', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// GET route - retrieve a single game
router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const game = await Game.findById(id).populate({
      path: 'reviews',
      populate: { path: 'author', select: 'username' }
    });

    if (!game) res.status(404).json({ message: 'Game not found' });

    return res.status(200).json(game);
  } catch (error) {
    console.log('Error retrieving a single game', error);
    return res.status(500).json({ message: 'Internal server error fetching a game from database' });
  }
});

// POST route - add a new game
router.post('/', checkUserRole(), isEmptyField('name', 'description'), async (req, res, next) => {
  try {
    const gameInDB = await Game.findOne({ name: req.body.name });

    // status 400 if game is already in db
    if (gameInDB)
      return res
        .status(400)
        .json({ message: `${req.body.name} is already included in the database` });

    // otherwise create new user
    const newGame = await Game.create(req.body);
    return res.status(201).json({ message: 'Game successfully added to database', game: newGame });
  } catch (error) {
    console.log('Error in game creation failed', error);
    return res.status(500).json({ message: 'Internal server error adding a game from database' });
  }
});

// POST route - add a new game review
router.post(
  '/:id/reviews',
  hasPlayed(),
  isEmptyField('content', 'rating'),
  async (req, res, next) => {
    const { id } = req.params;

    try {
      const game = await Game.findById(id);
      console.log('Game found', game);
      if (!game) {
        console.log('Unable to find a game that matches an id of ', id);
        return res.status(400).json({ message: `Couldn't find that game` });
      }

      const newReview = await Review.create({ ...req.body, author: req.user.id });
      console.log('Review added ', newReview);

      // include review in game's reviews array
      const updatedGame = await Game.findByIdAndUpdate(
        game._id,
        { $push: { reviews: newReview } },
        { new: true }
      ).populate('reviews');

      // update game's rating taking into account the newly created review
      const average = calcAverage(updatedGame.reviews);
      updatedGame.totalRating = average;
      await updatedGame.save();

      return res.status(201).json({ message: 'Review added successfully', review: newReview });
    } catch (error) {
      console.log('Error posting a review', error);
      return res.status(500).json({ message: 'Internal server error adding a review' });
    }
  }
);

// PUT route - edit a game
router.put('/:id', checkUserRole(), isEmptyField('name', 'description'), async (req, res, next) => {
  const { id } = req.params;
  try {
    const updatedGame = await Game.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedGame) {
      console.log(`Couldn't find a game with an id of ${id}`);
      return res.status(404).json({ message: 'Game not found' });
    }

    console.log('Game updated', updatedGame);
    return res.status(200).json({ message: 'Game successfully edited', game: updatedGame });
  } catch (error) {
    console.log('Error updating game', error);

    return res.status(500).json({
      message: 'Editing game failed'
    });
  }
});

// PUT route - edit a game review
router.put(
  '/:game_id/reviews/:id',
  checkOwnership(Review, 'author'),
  isEmptyField('content', 'rating'),
  async (req, res, next) => {
    const { game_id, id } = req.params;
    const { content, rating } = req.body;

    try {
      const updatedReview = await Review.findByIdAndUpdate(
        id,
        {
          content,
          rating
        },
        { new: true }
      );

      // if rating is changed, game average rate needs to be updated
      const updatedGame = await Game.findById(game_id).populate('reviews');
      const average = calcAverage(updatedGame.reviews);
      updatedGame.totalRating = average;
      await updatedGame.save();

      return res.status(200).json({ message: 'Review successfully edited', review: updatedReview });
    } catch (error) {
      console.log('Error updating a review', error);
      return res.status(500).json({ message: 'Internal server error updating a review' });
    }
  }
);

// DELETE route - delete game from database
router.delete('/:id', checkUserRole(), async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedGame = await Game.findByIdAndDelete(id);
    if (!deletedGame) {
      console.log(`Couldn't find a game with an id of ${id}`);
      return res.status(404).json({ message: 'Game not found' });
    }

    console.log(`Game removed ${deletedGame}`);
    return res.status(202).json({ message: 'Game successfully deleted from database' });
  } catch (error) {
    console.log('Error deleting a game from db', error);
    return res.status(500).json({ message: 'Internal server error removing a game from database' });
  }
});

// DELETE route - delete a review
router.delete('/:game_id/reviews/:id', checkOwnership(Review, 'author'), async (req, res, next) => {
  const { game_id, id } = req.params;
  try {
    const game = await Game.findById(game_id);
    const review = await Review.findById(id);

    // status 404 if id's are incorrect or if review doesn't correspond to the game
    if (!game || !review || !game.reviews.includes(id)) {
      console.log(`Couldn't find a review or game with ids of ${id} and ${game_id} respectively`);
      return res.status(404).json({ message: 'Review or game not found' });
    }

    await review.delete(); //remove review from db

    //remove review from game reviews array
    const updatedGame = await Game.findByIdAndUpdate(
      game_id,
      { $pull: { reviews: id } },
      { new: true }
    ).populate('reviews');

    // update game's rating after deleting a review
    const average = calcAverage(updatedGame.reviews);
    updatedGame.totalRating = average;
    await updatedGame.save();

    return res.status(202).json({ message: 'Review successfully deleted from database' });
  } catch (error) {
    console.log('Error deleting a review', error);
  }
});

module.exports = router;
