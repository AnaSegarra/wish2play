const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Wish = require('../models/Wish');
const { isLoggedIn } = require('../lib/authMW');

// GET route - retrieve all users from database
router.get('/', async (req, res, next) => {
  try {
    const users = await User.find();
    return res.json({
      message: 'Users successfully retrieved from database',
      results: users.length,
      users
    });
  } catch (error) {
    console.log('Error fetching users from db', error);
    return res.status(500).json({ message: 'Internal server error fetching users from database' });
  }
});

// GET route - search users by name
router.get('/search', async (req, res, next) => {
  const { searchTerm } = req.query;
  const queryCondition = { $regex: searchTerm, $options: 'i' };

  try {
    // find users matching either username and name
    const foundUsers = await User.find({
      $or: [{ username: queryCondition }, { name: queryCondition }]
    });

    if (foundUsers.length === 0) {
      return res.json({
        message: 'There are no users in our database that match that search',
        results: foundUsers.length
      });
    }

    return res.json({ message: 'Successful query', results: foundUsers.length, users: foundUsers });
  } catch (error) {
    console.log('User search failed', error);
    return res.status(500).json({ message: 'Internal server error fetching users from database' });
  }
});

// GET route - retrieve user's friends
router.get('/friends', isLoggedIn(), async (req, res, next) => {
  try {
    const { friends } = await User.findById(req.user.id).populate('friends');
    const friendsMapped = [...friends].map(friend => {
      return { name: friend.name, username: friend.username };
    });

    return res.json({ message: 'Friends retrieved successfully', friends: friendsMapped });
  } catch (error) {
    console.log('Error retrieving friends', error);
    return res.status(500).json({ message: 'Internal server error fetching friends' });
  }
});

// GET route - retrieve games played by a user
router.get('/:id/games-played', async (req, res, next) => {
  const { id } = req.params;
  try {
    const { gamesPlayed } = await User.findById(id).populate('gamesPlayed');
    return res
      .status(200)
      .json({ message: 'Games played retrieved', results: gamesPlayed.length, gamesPlayed });
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
      return res.json({ message: 'New friend added successfully', friends: userUpdated });
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
router.delete('/friends/:id', isLoggedIn(), async (req, res, next) => {
  const { id } = req.params;
  try {
    const isFriend = req.user.friends.includes(id);

    if (isFriend) {
      // update friend's wishes status
      await Wish.updateMany(
        {
          $and: [{ _id: { $in: req.user.reservedWishes } }, { owner: id }, { status: 'Reserved' }]
        },
        { status: 'Free' }
      );

      // find every friend wish
      const friendWishes = await Wish.find({ owner: id });

      // remove friend and their wishes
      const userUpdated = await User.findByIdAndUpdate(
        req.user.id,
        { $pull: { friends: id }, $pullAll: { reservedWishes: friendWishes } },
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
router.delete('/games-played/:id', isLoggedIn(), async (req, res, next) => {
  const { id } = req.params;
  try {
    const isIncluded = req.user.gamesPlayed.includes(id);

    if (isIncluded) {
      const userUpdated = await User.findByIdAndUpdate(
        req.user.id,
        { $pull: { gamesPlayed: id } },
        { new: true }
      );

      return res.json({ message: 'Game removed successfully from games played list', userUpdated });
    }

    return res.status(400).json({ message: 'Already not included in games played' });
  } catch (error) {
    console.log('Error removing game from games played list', error);
    return res.status(500).json({ message: 'Internal server error deleting game' });
  }
});

module.exports = router;
