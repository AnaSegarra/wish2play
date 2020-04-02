const express = require('express');
const router = express.Router();
const Game = require('../models/Game');
const Review = require('../models/Review');

// GET route - retrieve all games from database
router.get('/', async (req, res, next) => {
  try {
    const games = await Game.find();
    console.log(games);
    return res
      .status(200)
      .json({ message: 'Games fetched successfully', results: games.length, games });
  } catch (error) {
    console.log('Error retrieving games', error);
    return res.status(500).json({ message: 'Internal server error fetching games from database' });
  }
});

// GET route - search by game title
router.get('/search', async (req, res, next) => {
  const { name, releaseYear, platforms, genres, ESRB, company } = req.query;
  console.log('searching by ', req.query);

  const queryObj = {};
  if (name) queryObj.name = { $regex: name, $options: 'i' };
  if (releaseYear) queryObj.releaseYear = releaseYear;
  if (platforms) queryObj.platforms = { $all: platforms };
  if (genres) queryObj.genres = { $all: genres };
  if (ESRB) queryObj.ESRB = ESRB;
  if (company) queryObj.company = company;

  console.log('la condición', queryObj);

  try {
    const foundGames = await Game.find(queryObj);

    if (foundGames.length === 0) {
      return res.status(200).json({
        message: 'Sorry, there are no games in our database that match your search',
        results: foundGames.length
      });
    }

    console.log('Games found', foundGames);
    return res
      .status(200)
      .json({ message: 'Successful query', results: foundGames.length, game: foundGames });
  } catch (error) {
    console.log('Search failed', error);
    return res.status(500).json({ message: 'Internal server error fetching games from database' });
  }
});

// GET route - retrieve a single game
router.get('/:id', (req, res, next) => {
  const { id } = req.params;

  Game.findById(id)
    .populate('reviews')
    .exec((err, game) => {
      if (err) {
        console.log('Error populating game', err);
        return res
          .status(500)
          .json({ message: 'Internal server error fetching a game from database' });
      } else if (!game) {
        console.log(`Game with id ${id} is not in the database`);
        return res.status(404).json({ message: 'Game not found' });
      } else {
        console.log('game found', game);
        return res.status(200).json({ message: 'Game found in the database', game });
      }
    });
});

// POST route - add a new game
router.post('/', async (req, res, next) => {
  const {
    name,
    description,
    image,
    releaseYear,
    platforms,
    linkToBuy,
    genres,
    ESRB,
    company
  } = req.body;

  try {
    const gameInDB = await Game.findOne({ name });

    // status 400 if game is already in db
    if (gameInDB) {
      console.log(`${name} is already in db`);
      return res.status(400).json({ message: `${name} is already included in the database` });
    }

    const newGame = await Game.create({
      name,
      description,
      image,
      releaseYear,
      platforms,
      linkToBuy,
      genres,
      ESRB,
      company
    });
    console.log('New game added to database', newGame);
    return res.status(201).json({ message: 'Game successfully added to database', game: newGame });
  } catch (error) {
    console.log('Error in game creation failed', error);
    return res.status(500).json({ message: 'Internal server error adding a game from database' });
  }
});

// POST route - add a new game review
router.post('/:id/reviews', async (req, res, next) => {
  const { id } = req.params;
  const { content, rating } = req.body;

  try {
    const game = await Game.findById(id);
    console.log('Game found', game);
    if (!game) {
      console.log('Unable to find a game that matches an id of ', id);
      return res.status(400).json({ message: `Couldn't find that game` });
    }

    const newReview = await Review.create({ author: req.user.id, content, rating });
    console.log('Review added ', newReview);

    // include review in game's reviews array
    const updatedGame = await Game.findByIdAndUpdate(
      game._id,
      { $push: { reviews: newReview } },
      { new: true }
    ).populate('reviews');

    // update game's rating taking into account the newly created review
    const { reviews } = updatedGame;
    const average = reviews.reduce((acc, cur) => acc + cur.rating, 0) / reviews.length;

    updatedGame.totalRating = Math.round(average * 2) / 2;
    await updatedGame.save();

    return res.status(201).json({ message: 'Review added successfully', review: newReview });
  } catch (error) {
    console.log('Error posting a review', error);
    return res.status(500).json({ message: 'Internal server error adding a review' });
  }
});

// PUT route - edit a game
router.put('/:id', async (req, res, next) => {
  const { id } = req.params;
  const {
    name,
    description,
    image,
    releaseYear,
    platforms,
    linkToBuy,
    genres,
    ESRB,
    company
  } = req.body;

  try {
    const updatedGame = await Game.findByIdAndUpdate(
      id,
      {
        name,
        description,
        image,
        releaseYear,
        platforms,
        linkToBuy,
        genres,
        ESRB,
        company
      },
      { new: true }
    );

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
router.put('/:id/reviews/:review_id', async (req, res, next) => {
  const { id, review_id } = req.params;
  const { content, rating } = req.body;

  try {
    const game = await Game.findById(id);
    if (!game) return res.status(404).json({ message: 'Game not found' });

    const updatedReview = await Review.findByIdAndUpdate(
      review_id,
      {
        content,
        rating
      },
      { new: true }
    );

    // if rating is changed, game average rate needs to be updated
    if (rating) {
      const updatedGame = await Game.findById(game._id).populate('reviews');
      const { reviews } = updatedGame;
      const average = reviews.reduce((acc, cur) => acc + cur.rating, 0) / reviews.length;

      updatedGame.totalRating = Math.round(average * 2) / 2;
      await updatedGame.save();
    }

    console.log('Review updated', updatedReview);
    return res.status(200).json({ message: 'Review successfully edited', review: updatedReview });
  } catch (error) {
    console.log('Error updating a review', error);
  }
});

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
    if (!game || !review) {
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
