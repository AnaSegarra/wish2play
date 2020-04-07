const express = require('express');
const router = express.Router();
const Game = require('../models/Game');
const Review = require('../models/Review');
const { isEmptyField } = require('../lib/validatorMW');
const { checkUserRole, isLoggedIn, hasPlayed, checkOwnership } = require('../lib/authMW');
const calcAverage = require('../utils/avgCalculator');

// GET route - retrieve all games from database
router.get('/', async (req, res, next) => {
  try {
    const games = await Game.find();
    return res.status(200).json({ results: games.length, games });
  } catch (error) {
    console.log('Error retrieving games', error);
    return res.status(500).json({ message: 'Internal server error fetching games from database' });
  }
});

// GET route - search by game title
router.get('/search', async (req, res, next) => {
  const { name, platforms, genres } = req.query;
  const queryObj = { ...req.query };

  if (name) queryObj.name = { $regex: name, $options: 'i' };
  if (platforms) queryObj.platforms = { $all: platforms };
  if (genres) queryObj.genres = { $all: genres };

  try {
    const foundGames = await Game.find(queryObj);

    if (foundGames.length === 0) {
      return res.status(200).json({
        message: 'Sorry, there are no games in our database that match your search',
        results: foundGames.length
      });
    }

    return res.status(200).json({ results: foundGames.length, game: foundGames });
  } catch (error) {
    console.log('Search failed', error);
    return res.status(500).json({ message: 'Internal server error fetching games from database' });
  }
});

// GET route - retrieve a single game
router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const game = await Game.findById(id).populate('reviews');
    if (!game) res.status(404).json({ message: 'Game not found' });

    return res.status(200).json(game);
  } catch (error) {
    console.log('Error retrieving a single game', error);
    return res.status(500).json({ message: 'Internal server error fetching a game from database' });
  }
});

// POST route - add a new game
router.post(
  '/',
  isLoggedIn(),
  checkUserRole(),
  isEmptyField('name', 'description'),
  async (req, res, next) => {
    try {
      const gameInDB = await Game.findOne({ name: req.body.name });

      // status 400 if game is already in db
      if (gameInDB)
        return res
          .status(400)
          .json({ message: `${req.body.name} is already included in the database` });

      // otherwise create new user
      const newGame = await Game.create(req.body);
      return res
        .status(201)
        .json({ message: 'Game successfully added to database', game: newGame });
    } catch (error) {
      console.log('Error in game creation failed', error);
      return res.status(500).json({ message: 'Internal server error adding a game from database' });
    }
  }
);

// POST route - add a new game review
router.post(
  '/:id/reviews',
  isLoggedIn(),
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
router.put(
  '/:id',
  isLoggedIn(),
  checkUserRole(),
  isEmptyField('name', 'description'),
  async (req, res, next) => {
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
  }
);

// PUT route - edit a game review
router.put(
  '/:id/reviews/:review_id',
  isLoggedIn(),
  checkOwnership(),
  isEmptyField('content', 'rating'),
  async (req, res, next) => {
    const { id, review_id } = req.params;
    const { content, rating } = req.body;

    try {
      const updatedReview = await Review.findByIdAndUpdate(
        review_id,
        {
          content,
          rating
        },
        { new: true }
      );

      // if rating is changed, game average rate needs to be updated
      const updatedGame = await Game.findById(id).populate('reviews');
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
router.delete('/:id', async (req, res, next) => {
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
router.delete('/:id/reviews/:review_id', async (req, res, next) => {
  const { id, review_id } = req.params;
  try {
    const game = await Game.findById(id);
    const review = await Review.findById(review_id);

    // status 404 if id's are incorrect or if review doesn't correspond to the game
    if (!game || !review || !game.reviews.includes(review_id)) {
      console.log(`Couldn't find a review or game with ids of ${review_id} and ${id} respectively`);
      return res.status(404).json({ message: 'Review or game not found' });
    }

    await review.delete(); //remove review from db

    const updatedGame = await Game.findByIdAndUpdate(
      id,
      { $pull: { reviews: review_id } },
      { new: true }
    ).populate('reviews'); //remove review from game reviews array

    // update game's rating after deleting a review
    const { reviews } = updatedGame;
    const average =
      reviews.length > 0 ? reviews.reduce((acc, cur) => acc + cur.rating, 0) / reviews.length : 0;

    updatedGame.totalRating = Math.round(average * 2) / 2;
    await updatedGame.save();

    return res.status(202).json({ message: 'Review successfully deleted from database' });
  } catch (error) {
    console.log('Error deleting a review', error);
  }
});

module.exports = router;
