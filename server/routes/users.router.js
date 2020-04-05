const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Wish = require('../models/Wish');

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
router.get('/friends', async (req, res, next) => {
  try {
    const { friends } = await User.findById(req.user.id).populate('friends');
    const friendsMapped = [...friends].map((friend) => {
      return { name: friend.name, username: friend.username };
    });

    return res.status(200).json({ message: 'Friends retrieved successfully', friendsMapped });
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

// GET route - retrieve wishlist from a user
router.get('/:id/wishlist', async (req, res, next) => {
  const { id } = req.params;
  try {
    const wishes = await Wish.find({ owner: id }).populate('game');

    const wishesMapped = [...wishes].map((wish) => {
      return {
        name: wish.game.name,
        totalRating: wish.game.totalRating,
        status: wish.status,
        isPublic: wish.isPublic,
        id: wish._id
      };
    });

    return res
      .status(200)
      .json({ message: 'Wishlist retrieved', results: wishesMapped.length, wishesMapped });
  } catch (error) {
    console.log('Error retrieving wishlist', error);
    return res.status(500).json({ message: 'Internal server error fetching wishlist' });
  }
});

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

// POST route - add game to games played list
router.post('/games-played', async (req, res, next) => {
  const { game_id } = req.body;
  try {
    const isIncluded = req.user.gamesPlayed.includes(game_id);

    if (!isIncluded) {
      const userUpdated = await User.findByIdAndUpdate(
        req.user.id,
        { $push: { gamesPlayed: game_id } },
        { new: true }
      );

      console.log('Game added', userUpdated);

      return res
        .status(200)
        .json({ message: 'Game added successfully to games played list', userUpdated });
    }

    console.log(`Game with id ${game_id} is already in list`);
    return res.status(400).json({ message: 'Already included in games played list' });
  } catch (error) {
    console.log('Error adding a game to games played list', error);
    return res
      .status(500)
      .json({ message: 'Internal server error adding a game to games played list' });
  }
});

// POST route - add game to wishlist
router.post('/wishlist', async (req, res, next) => {
  const { game_id } = req.body;
  try {
    // check if games is already in wishlist
    const isGameWished = await Wish.find({ owner: req.user.id, game: game_id });
    if (isGameWished.length !== 0) {
      console.log(`Game with id ${game_id} is already in wishlist`);
      return res.status(400).json({ message: 'Already included in wishlist' });
    }

    const newWish = await Wish.create({ owner: req.user.id, game: game_id });
    const userUpdated = await User.findByIdAndUpdate(
      req.user.id,
      { $push: { 'wishlist.wishes': newWish._id } },
      { new: true }
    );

    console.log('Game added', userUpdated, newWish);

    return res.status(200).json({ message: 'Game added successfully to wishlist', userUpdated });
  } catch (error) {
    console.log('Error adding a game to games played list', error);
    return res
      .status(500)
      .json({ message: 'Internal server error adding a game to games played list' });
  }
});

// DELETE route - delete friend
router.delete('/friends/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const isFriend = req.user.friends.includes(id);

    // remove friend
    if (isFriend) {
      // update friend's wishes status
      await Wish.updateMany(
        { _id: { $in: req.user.reservedWishes }, owner: id },
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

      console.log("Friend and their wishes removed from user's list", userUpdated);
      return res.status(200).json({ message: 'Friend removed', userUpdated });
    }

    // status 400 if they are not friends
    console.log(`User with id ${id} is not a friend`);
    return res.status(400).json({ message: 'You are not friends already' });
  } catch (error) {
    console.log('Error deleting a friend', error);
    return res.status(500).json({ message: 'Internal server error deleting friend' });
  }
});

// DELETE route - remove game from games played list
router.delete('/games-played/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const isIncluded = req.user.gamesPlayed.includes(id);

    if (isIncluded) {
      const userUpdated = await User.findByIdAndUpdate(
        req.user.id,
        { $pull: { gamesPlayed: id } },
        { new: true }
      );

      console.log('Game removed', userUpdated);

      return res
        .status(200)
        .json({ message: 'Game removed successfully from games played list', userUpdated });
    }

    console.log(`Game with id ${id} is not in list`);
    return res.status(400).json({ message: 'Already not included in games played' });
  } catch (error) {
    console.log('Error removing game from games played list', error);
    return res.status(500).json({ message: 'Internal server error deleting game' });
  }
});

// DELETE route - remove wish from wishlist
router.delete('/wishlist/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    // check whether is user's wish
    const wish = await Wish.findOne({ _id: id, owner: req.user.id });
    console.log('el wish', wish);
    if (wish) {
      // remove wish from wishlist and from db
      const userUpdated = await User.findByIdAndUpdate(
        req.user.id,
        {
          $pull: { 'wishlist.wishes': id }
        },
        { new: true }
      );
      await Wish.findByIdAndDelete(id);

      // remove wish from friend's reserved wishes list
      if (wish.status === 'Reserved') {
        const friend = await User.findOneAndUpdate(
          { _id: { $in: req.user.friends }, reservedWishes: id },
          { $pull: { reservedWishes: id } },
          { new: true }
        );

        console.log('el amiguito actualisado', friend);
      }

      return res
        .status(200)
        .json({ message: 'Wish removed succesfully from wishlist', userUpdated });
    }

    console.log(`Wish with id ${id} is not in list or not yours`);
    return res.status(400).json({ message: 'Wish is not included in your wishlist' });
  } catch (error) {
    console.log('Error removing wish from wishlist', error);
    return res.status(500).json({ message: 'Internal server error deleting wish' });
  }
});

module.exports = router;
