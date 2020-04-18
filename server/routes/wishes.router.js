const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Wish = require('../models/Wish');
const Game = require('../models/Game');
const { isLoggedIn, isFriend, checkOwnership } = require('../lib/authMW');

// GET route - retrieve wishlist from a user
router.get('/:user_id/wishlist', async (req, res, next) => {
  const { user_id } = req.params;
  try {
    const user = await User.findById(user_id, { wishlist: 1, username: 1 }).populate({
      path: 'wishlist',
      populate: [{ path: 'game', select: 'name image' }]
    });

    return res.json({
      message: 'Wishlist retrieved',
      results: user.wishlist.length,
      wishlist: user.wishlist,
      user: { username: user.username, _id: user._id }
    });
  } catch (error) {
    console.log('Error retrieving wishlist', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// GET route - retrieve reserved wishes
router.get('/reserved-wishes', async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id, { reservedWishes: 1 }).populate({
      path: 'reservedWishes',
      populate: [
        { path: 'owner', select: '-_id username' },
        { path: 'game', select: '-_id name' }
      ]
    });
    return res.json({ message: 'Reserved wishes from friends', results: user.reservedWishes });
  } catch (error) {
    console.log('Error retrieving reserved wishes', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// POST route - add game to wishlist
router.post('/wishlist', isLoggedIn(), async (req, res, next) => {
  const { game_id } = req.body;
  try {
    const gameExists = await Game.findById(game_id);
    if (!gameExists) return res.status(400).json({ message: 'Game not found' });

    // check if game is already in wishlist
    const isGameWished = await Wish.find({ owner: req.user.id, game: game_id });
    if (isGameWished.length !== 0)
      return res.status(400).json({ message: 'Already included in wishlist' });

    const newWish = await Wish.create({ owner: req.user.id, game: game_id });
    const userUpdated = await User.findByIdAndUpdate(
      req.user.id,
      { $push: { wishlist: newWish._id } },
      { new: true }
    );

    return res.json({ message: 'Game added successfully to wishlist', userUpdated });
  } catch (error) {
    console.log('Error adding a game to games played list', error);
    return res
      .status(500)
      .json({ message: 'Internal server error adding a game to games played list' });
  }
});

// PUT route - update wish status
router.put('/wishlist/:id', isLoggedIn(), checkOwnership(Wish, 'owner'), async (req, res, next) => {
  const { id } = req.params;
  try {
    const wishUpdated = await Wish.findByIdAndUpdate(id, req.body, { new: true }).populate({
      path: 'game',
      select: 'name image'
    });
    return res.json({ message: 'Wish status updated', wishUpdated });
  } catch (error) {
    console.log('Error editing wish status', error);
    return res.status(500).json({ message: 'Internal server error editing wish status' });
  }
});

// POST route - add friend's wish to reservedWishes
router.post('/reserved-wishes', isFriend(), async (req, res, next) => {
  try {
    const { wish } = req.body; // wish id
    const isReserved = req.user.reservedWishes.includes(wish);

    if (!isReserved) {
      // update user's reserved wishes list
      const userUpdated = await User.findByIdAndUpdate(
        req.user.id,
        { $push: { reservedWishes: wish } },
        { new: true }
      );

      // update wish status
      const wishUpdated = await Wish.findByIdAndUpdate(
        wish,
        { status: 'Reserved' },
        { new: true }
      ).populate({
        path: 'game',
        select: 'name image'
      });
      return res.json({ message: 'Wish successfully reserved', userUpdated, wishUpdated });
    }

    return res.status(400).json({ message: 'Already reserved' });
  } catch (error) {
    console.log('Error while reserving a wish', error);
    return res
      .status(500)
      .json({ message: 'Internal server error adding a game to games played list' });
  }
});

// DELETE route - remove wish from wishlist
router.delete(
  '/wishlist/:id',
  isLoggedIn(),
  checkOwnership(Wish, 'owner'),
  async (req, res, next) => {
    const { id } = req.params;
    try {
      const wish = await Wish.findById(id);
      // remove wish from wishlist and from db
      const userUpdated = await User.findByIdAndUpdate(
        req.user.id,
        {
          $pull: { wishlist: id }
        },
        { new: true }
      );

      // remove wish from user that reserved it
      if (wish.status === 'Reserved') {
        await User.findOneAndUpdate(
          { reservedWishes: id },
          { $pull: { reservedWishes: id } },
          { new: true }
        );
      }

      await wish.delete();

      return res.json({ message: 'Wish removed succesfully from wishlist', userUpdated });
    } catch (error) {
      console.log('Error removing wish from wishlist', error);
      return res.status(500).json({ message: 'Internal server error deleting wish' });
    }
  }
);

// DELETE route - delete friend's wish from reservedWishes
router.delete('/reserved-wishes/:id', isLoggedIn(), async (req, res, next) => {
  const { id } = req.params;
  try {
    const isReserved = req.user.reservedWishes.includes(id);
    if (isReserved) {
      const userUpdated = await User.findByIdAndUpdate(
        req.user.id,
        { $pull: { reservedWishes: id } },
        { new: true }
      );

      await Wish.findByIdAndUpdate(id, { status: 'Free' }, { new: true });

      return res.json({ message: 'Wish successfully deleted', userUpdated });
    }

    return res.status(400).json({ message: 'Wish is not reserved' });
  } catch (error) {
    console.log('Error while reserving a wish', error);
    return res
      .status(500)
      .json({ message: 'Internal server error adding a game to games played list' });
  }
});

module.exports = router;
