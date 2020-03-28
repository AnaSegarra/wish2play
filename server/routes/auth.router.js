const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { hashPassword } = require('../lib/hashing');

router.post('/signup', async (req, res, next) => {
  const { username, password, email } = req.body;

  // status 400 if no username or password were entered
  if (!username || !password) {
    console.log('Credentials are necessary');
    return res.status(400).json({ message: 'Credentials are necessary' });
  }

  try {
    // check if username already exists in ddbb
    const registeredUser = await User.findOne({ username });
    if (!registeredUser) {
      const newUser = await User.create({
        username,
        password: hashPassword(password),
        email
      });

      console.log('User created:', newUser);

      // status 201 for new resource created successfully
      return res
        .status(201)
        .json({ message: 'User registered successfully', user: newUser });
    } else {
      // status 400 if username is taken
      console.log(`Username '${username}' is already taken`);
      return res
        .status(400)
        .json({ message: `Username '${username}' is already taken` });
    }
  } catch (error) {
    // status 500 for internal server error
    console.log('Signup failed', error);
    return res
      .status(500)
      .json({ message: 'Internal server error during signup' });
  }
});

module.exports = router;
