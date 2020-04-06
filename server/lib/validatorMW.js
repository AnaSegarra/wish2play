const isValidPassword = () => (req, res, next) => {
  const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,8}$/;
  const { password } = req.body;
  if (password && password.match(passwordPattern)) {
    return next();
  } else {
    return res.status(400).json({
      message:
        'A password must have at least four characters including a number, a lowercase letter and a uppercase letter'
    });
  }
};

module.exports = { isValidPassword };
