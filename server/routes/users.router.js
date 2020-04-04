const express = require('express');
const router = express.Router();
const User = require('../models/User');

// GET route - retrieve all users from database
router.get('/', async (req, res, next) => {
  try {
    const users = await User.find();
    console.log('Users retrieve from db', users);
    return res.status(200).json({
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
    const foundUsers = await User.find({
      $or: [{ username: queryCondition }, { name: queryCondition }]
    });

    if (foundUsers.length === 0) {
      return res.status(200).json({
        message: 'Sorry, there are no users in our database that match your search',
        results: foundUsers.length
      });
    }

    console.log('Users found', foundUsers);
    return res
      .status(200)
      .json({ message: 'Successful query', results: foundUsers.length, users: foundUsers });
  } catch (error) {
    console.log('User search failed', error);
    return res.status(500).json({ message: 'Internal server error fetching users from database' });
  }
});

// GET route - retrieve user's friends
// POST route - add new friend
router.post('/friends', async (req, res, next) => {
  const { user_id } = req.body;
  try {
    // check if user to friend exists in db
    const userExists = await User.findById(user_id);
    if (!userExists) {
      console.log('There are no users with an id of ', user_id);
      return res.status(400).json({ message: `Couldn't find that user` });
    }
    // add to friend list if it's not already friended
    const isFriend = req.user.friends.includes(user_id);
    if (!isFriend) {
      const userUpdated = await User.findByIdAndUpdate(
        req.user.id,
        { $push: { friends: user_id } },
        { new: true }
      );
      console.log('New friend added', userUpdated);
      return res
        .status(200)
        .json({ message: 'New friend added successfully', friends: userUpdated });
    }

    console.log(`User with id ${user_id} is already a friend`);
    return res.status(400).json({ message: 'You are friends already' });
  } catch (error) {
    console.log('Error adding a new friend', error);
    return res.status(500).json({ message: 'Internal server error adding a new friend' });
  }
});

// DELETE route - delete friend

module.exports = router;
