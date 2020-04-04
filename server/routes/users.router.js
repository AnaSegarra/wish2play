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

module.exports = router;
