const isValidPassword = () => (req, res, next) => {
  const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,8}$/;
  const { password } = req.body;
  if (password.match(passwordPattern)) {
    return next();
  } else {
    return res.status(400).json({
      message:
        'A password must have between four and eight characters including a number, a lowercase letter and a uppercase letter'
    });
  }
};

const isValidUsername = () => (req, res, next) => {
  const { username } = req.body;
  // check for username's length or whitespaces presence
  if (!/\s/.test(username) && username.length < 18) {
    return next();
  } else {
    return res.status(400).json({
      message: "Usernames shouldn't be longer than 18 characters or contain whitespaces"
    });
  }
};

const isEmptyField = (...fields) => (req, res, next) => {
  const isEveryField = fields.every(field => req.body[field]);
  const itemFields = fields.join(', ').replace(/, ([^,]*)$/, ' and $1');
  if (isEveryField) {
    return next();
  } else {
    return res.status(400).json({
      message: `${itemFields} ${fields.length > 1 ? 'are' : 'is'} necessary`
    });
  }
};

module.exports = { isValidPassword, isValidUsername, isEmptyField };
