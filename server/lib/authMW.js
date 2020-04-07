const Review = require('../models/Review');

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

const checkOwnership = () => async (req, res, next) => {
  if (!req.user)
    return res.status(401).json({
      message: 'Must be logged in'
    });

  const review = await Review.findById(req.params.review_id).where('author').equals(req.user.id);
  if (review) {
    return next();
  } else {
    return res.status(403).json({
      message: 'Cannot modify a review from another user'
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

module.exports = { checkUserRole, isLoggedIn, hasPlayed, checkOwnership };
