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

module.exports = { checkUserRole, isLoggedIn };
