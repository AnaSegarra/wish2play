const Review = require('../models/Review');
const Wish = require('../models/Wish');

const checkUserRole = () => (req, res, next) => {
  if (!req.user)
    return res.status(401).json({
      message: 'Must be logged in'
    });

  if (req.user.isAdmin) {
    return next();
  } else {
    return res.status(403).json({
      message: 'Only an admin can do that'
    });
  }
};

const checkOwnership = (Model, field) => async (req, res, next) => {
  console.log('el middleware 🌈', Model, field);
  if (!req.user)
    return res.status(401).json({
      message: 'Must be logged in'
    });

  const review = await Model.findById(req.params.id).where(field).equals(req.user.id);
  if (review) {
    return next();
  } else {
    return res.status(403).json({
      message: 'Unauthorized'
    });
  }
};

const isLoggedIn = () => (req, res, next) => {
  if (req.user) {
    return next();
  } else {
    return res.status(401).json({
      message: 'Must be logged in'
    });
  }
};

// allow user to post a review only if they have played the game
const hasPlayed = () => (req, res, next) => {
  if (!req.user)
    return res.status(401).json({
      message: 'Must be logged in'
    });

  const game_id = req.params.id;
  const { gamesPlayed } = req.user;
  if (gamesPlayed.includes(game_id)) {
    return next();
  } else {
    return res.status(403).json({
      message: 'Must play the game before making a review'
    });
  }
};

const isFriend = () => async (req, res, next) => {
  if (!req.user)
    return res.status(401).json({
      message: 'Must be logged in'
    });
  const wish = await Wish.findById(req.body.wish, { owner: 1 });

  if (req.user.friends.includes(wish.owner)) {
    return next();
  } else {
    return res.status(403).json({
      message: 'Must be friend to reserve a wish'
    });
  }
};

module.exports = { checkUserRole, isLoggedIn, hasPlayed, checkOwnership, isFriend };
