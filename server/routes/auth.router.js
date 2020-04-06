const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/User');
const { hashPassword } = require('../lib/hashing');

// POST route - signup
router.post('/signup', async (req, res, next) => {
  const { username, password } = req.body;

  // status 400 if no username or password were entered
  if (!username || !password) {
    console.log('Credentials are necessary');
    return res.status(400).json({ message: 'Credentials are necessary' });
  }

  try {
    // check if username already exists in db
    const registeredUser = await User.findOne({ username });
    if (registeredUser) {
      // status 400 if username is taken
      console.log(`Username '${username}' is already taken`);
      return res.status(400).json({ message: `Username '${username}' is already taken` });
    }

    // create new user
    const newUser = await User.create({
      username,
      password: hashPassword(password)
    });

    // login after signup
    req.login(newUser, (error) => {
      if (!error) {
        console.log('Created user and logged', newUser);

        // status 201 for new user created and logged successfully
        return res.status(201).json({
          user: newUser
        });
      } else {
        console.log(`Something went wrong on loging after signup: ${error}`);
        return res.status(500).json({
          message: 'Login after signup failed'
        });
      }
    });
  } catch (error) {
    // status 500 for internal server error
    console.log('Signup failed', error);
    return res.status(500).json({ message: 'Internal server error during signup' });
  }
});

// POST route - login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, failureDetails) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: 'Authentication error' });
    }

    if (!user) {
      // response for wrong credentials
      return res.status(401).json({ message: failureDetails.message });
    }

    if (req.isAuthenticated()) {
      console.log('User tried to login while being logged already');
      return res.status(400).json({ message: 'User is already logged' });
    }

    req.login(user, (err) => {
      if (err) {
        console.log('Error in login', err);
        return res.status(500).json({ message: 'Session save failed' });
      }
      console.log('User logged in ', user);
      return res.json({ user });
    });
  })(req, res, next);
});

// POST route - logout
router.post('/logout', (req, res, next) => {
  if (req.isAuthenticated()) {
    console.log(`${req.user.username} just logged out`);
    req.logout();
    return res.json({ message: 'User logged out successfully' });
  }
  return res.json({ message: 'Cannot logout if not authenticated' });
});

// PUT route - edit user's profile
router.put('/edit', async (req, res, next) => {
  const { id } = req.user;
  const { username, password, email, name } = req.body;
  try {
    const userUpdated = await User.findByIdAndUpdate(
      id,
      { username, password, email, name },
      { new: true }
    );
    console.log('User changed their data', userUpdated);
    return res.status(200).json({ message: 'User successfull updated', user: userUpdated });
  } catch (error) {
    console.log('Error editing user profile', error);
    return res.status(500).json({ message: 'Internal server error during profile edit' });
  }
});

// GET route - retrieve logged user
router.get('/current-user', (req, res, next) => {
  if (req.isAuthenticated()) {
    console.log(`${req.user.username} is logged`);
    return res.json({ user: req.user });
  }

  return res.status(403).json({ message: 'Unauthorized to do that' });
});

module.exports = router;
