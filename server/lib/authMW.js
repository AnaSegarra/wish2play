const checkUserRole = () => (req, res, next) => {
  if (req.user.isAdmin) {
    return next();
  } else {
    return res.status(403).json({
      message: 'Only an admin can do that'
    });
  }
};

const isLoggedIn = () => (req, res, next) => {
  if (req.user) {
    return next();
  } else {
    return res.status(401).json({
      message: 'You need to be logged in'
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
      message: 'You need to played the game before making a review'
    });
  }
};

module.exports = { checkUserRole, isLoggedIn, hasPlayed };
