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
  const { name } = req.query;
  console.log('searching', name);

  try {
    const foundGames = await Game.find({ name: { $regex: name, $options: 'i' } });

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
    const editedGame = await Game.findByIdAndUpdate(
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
    console.log('Game updated', editedGame);
    return res.status(200).json({ message: 'Game successfully edited', game: editedGame });
  } catch (error) {
    console.log('Error updating game', error);

    return res.status(500).json({
      message: 'Editing game failed'
    });
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
    console.log(error);
    return res.status(500).json({ message: 'Internal server error removing a game from database' });
  }
});

module.exports = router;
