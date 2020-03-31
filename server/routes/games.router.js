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
router.get('/:id', async (req, res, next) => {
  const { id } = req.params;

  try {
    await Game.findById(id)
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
  } catch (error) {
    console.log('Retrieval of a single game failed', error);
    return res.status(500).json({ message: 'Internal server error fetching a game from database' });
  }
});

module.exports = router;
