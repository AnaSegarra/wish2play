const isValidPassword = () => (req, res, next) => {
  const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,8}$/;
  const { password } = req.body;
  if (password.match(passwordPattern)) {
    return next();
  } else {
    return res.status(400).json({
      message:
        'A password must have at least four characters including a number, a lowercase letter and a uppercase letter'
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

module.exports = { isValidPassword, isEmptyField };
