const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Wish = require('../models/Wish');
const Game = require('../models/Game');
const Review = require('../models/Review');
const { isLoggedIn } = require('../lib/authMW');
const calcAverage = require('../utils/avgCalculator');

// GET route - retrieve all users from database
router.get('/', async (req, res, next) => {
  try {
    const { searchTerm } = req.query;
    const queryCondition = { $regex: searchTerm, $options: 'i' };

    let filter = {
      _id: { $not: { $in: req.user.friends } },
      $and: [{ _id: { $ne: req.user.id } }, { isAdmin: { $ne: true } }]
    }; // removes users friends, current user and user's who are admin

    // finds users by username or name but excludes current user
    if (searchTerm) {
      filter = {
        ...filter,
        $or: [{ username: queryCondition }, { name: queryCondition }]
      };
    }
    const numOfUsers = await User.find(filter); // total num of users that are not friends

    const page = Number(req.query.page) || 1;
    const skip = (page - 1) * 4;

    const users = await User.find(filter).skip(skip).limit(4).select('username _id');

    return res.json({
      message: 'Users successfully retrieved from database',
      total: numOfUsers.length,
      users
    });
  } catch (error) {
    console.log('Error fetching users from db', error);
    return res.status(500).json({ message: 'Internal server error fetching users from database' });
  }
});

// GET route - retrieve user's friends
router.get('/friends', isLoggedIn(), async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const { friends } = await User.findById(req.user.id);
    const user = await User.findById(req.user.id).populate({
      path: 'friends',
      select: 'name username _id',
      skip: (page - 1) * 4,
      limit: 4
    });

    return res.json({
      message: 'Friends retrieved successfully',
      total: friends.length,
      friends: user.friends
    });
  } catch (error) {
    console.log('Error retrieving friends', error);
    return res.status(500).json({ message: 'Internal server error fetching friends' });
  }
});

// GET route - retrieve games played by a user
router.get('/:user_id/games-played', async (req, res, next) => {
  const { user_id } = req.params;
  try {
    const user = await User.findById(user_id).populate('gamesPlayed');
    return res.status(200).json({
      message: 'Games played retrieved',
      gamesPlayed: user.gamesPlayed,
      user: user.username
    });
  } catch (error) {
    console.log('Error retrieving games played', error);
    return res.status(500).json({ message: 'Internal server error fetching played games' });
  }
});

// POST route - add new friend
router.post('/friends', isLoggedIn(), async (req, res, next) => {
  const { user_id } = req.body;
  try {
    // check if user to friend exists in db or it's current user
    const userExists = await User.find({ $and: [{ _id: user_id }, { _id: { $ne: req.user.id } }] });
    if (userExists.length === 0)
      return res.status(400).json({ message: `User either doesn't exist or it's yourself` });

    // add to friend list if it's not already friended
    const isFriend = req.user.friends.includes(user_id);
    if (!isFriend) {
      const userUpdated = await User.findByIdAndUpdate(
        req.user.id,
        { $push: { friends: user_id } },
        { new: true }
      );
      return res.json({ message: 'New friend added successfully', userUpdated });
    }

    // status 400 if is already a friend
    return res.status(400).json({ message: 'You are friends already' });
  } catch (error) {
    console.log('Error adding a new friend', error);
    return res.status(500).json({ message: 'Internal server error adding a new friend' });
  }
});

// POST route - add game to games played list
router.post('/games-played', isLoggedIn(), async (req, res, next) => {
  const { game_id } = req.body;
  try {
    const isIncluded = req.user.gamesPlayed.includes(game_id);

    if (!isIncluded) {
      const userUpdated = await User.findByIdAndUpdate(
        req.user.id,
        { $push: { gamesPlayed: game_id } },
        { new: true }
      );

      return res.json({ message: 'Game added successfully to games played list', userUpdated });
    }

    return res.status(400).json({ message: 'Already included in games played list' });
  } catch (error) {
    console.log('Error adding a game to games played list', error);
    return res
      .status(500)
      .json({ message: 'Internal server error adding a game to games played list' });
  }
});

// DELETE route - delete friend
router.delete('/friends/:user_id', isLoggedIn(), async (req, res, next) => {
  const { user_id } = req.params;
  try {
    const isFriend = req.user.friends.includes(user_id);

    if (isFriend) {
      // update friend's wishes status
      await Wish.updateMany(
        {
          $and: [
            { _id: { $in: req.user.reservedWishes } }, // id included in user's reservedWishes
            { owner: user_id }, // whose owner is the friend to be deleted
            { status: 'Reserved' } // with status of reserved
          ]
        },
        { status: 'Free' }
      );

      // find every friend wish
      const friendWishes = await Wish.find({ owner: user_id });

      // remove friend and their wishes
      const userUpdated = await User.findByIdAndUpdate(
        req.user.id,
        { $pull: { friends: user_id }, $pullAll: { reservedWishes: friendWishes } },
        { new: true }
      );

      return res.json({ message: 'Friend removed', userUpdated });
    }

    // status 400 if they are not friends
    return res.status(400).json({ message: 'You are not friends already' });
  } catch (error) {
    console.log('Error deleting a friend', error);
    return res.status(500).json({ message: 'Internal server error deleting friend' });
  }
});

// DELETE route - remove game from games played list
router.delete('/games-played/:game_id', isLoggedIn(), async (req, res, next) => {
  const { game_id } = req.params;
  try {
    const isIncluded = req.user.gamesPlayed.includes(game_id);

    if (isIncluded) {
      const userUpdated = await User.findByIdAndUpdate(
        req.user.id,
        { $pull: { gamesPlayed: game_id } },
        { new: true }
      );

      // find game a populate it
      const game = await Game.findById(game_id).populate({
        path: 'reviews',
        populate: { path: 'author', select: 'username' }
      });

      // delete reviews posted by user from db
      await Review.deleteMany({
        $and: [{ _id: { $in: game.reviews } }, { author: req.user.id }]
      });

      // filter out reviews from game
      const reviewsUpdated = game.reviews.filter(
        review => review.author.username !== req.user.username
      );

      // update game with new reviews array and avg
      game.reviews = reviewsUpdated;
      game.totalRating = calcAverage(game.reviews);
      await game.save();

      return res.json({
        message: 'Game removed successfully from games played list',
        userUpdated,
        game
      });
    }

    return res.status(400).json({ message: 'Already not included in games played' });
  } catch (error) {
    console.log('Error removing game from games played list', error);
    return res.status(500).json({ message: 'Internal server error deleting game' });
  }
});

module.exports = router;
