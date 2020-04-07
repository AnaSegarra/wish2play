const Review = require('../models/Review');

const checkUserRole = () => (req, res, next) => {
  if (req.user.isAdmin) {
    return next();
  } else {
    return res.status(403).json({
      message: 'Only an admin can do that'
    });
  }
};

const checkOwnership = () => async (req, res, next) => {
  console.log('el id de la review', req.params.review_id);
  const review = await Review.findById(req.params.review_id).where('author').equals(req.user.id);
  console.log('y la review', review);
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

// allows user to post a review only if they have played it
const hasPlayed = () => (req, res, next) => {
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
