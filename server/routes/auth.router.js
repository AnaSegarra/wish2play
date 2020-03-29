const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/User');
const { hashPassword } = require('../lib/hashing');

// POST route - signup
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

// POST route - login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, failureDetails) => {
    if (err) {
      console.log(err);
      return res.json({ status: 500, message: 'Authentication error' });
    }

    if (!user) {
      // response for wrong credentials
      return res.json({ status: 401, message: failureDetails.message });
    }

    req.login(user, err => {
      if (err) {
        return res.status(500).json({ message: 'Session save failed' });
      }

      return res.json({ status: 200, message: 'Logged in successfully', user });
    });
  })(req, res, next);
});

// POST route - logout
router.post('/logout', (req, res, next) => {
  if (req.isAuthenticated()) {
    console.log(`${req.user.username} just logged out`);
    req.logout();
    return res.status(200).json({ message: 'User logged out successfully' });
  }
  return res
    .status(200)
    .json({ message: 'Cannot logout if not authenticated' });
});

// GET route - retrieve logged user
router.get('/current-user', (req, res, next) => {
  if (req.isAuthenticated()) {
    console.log(`${req.user.username} is logged`);
    return res.status(200).json({ user: req.user });
  }

  return res.status(403).json({ message: 'Unauthorized to do that' });
});

module.exports = router;
