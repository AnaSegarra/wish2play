const express = require('express');
const router = express.Router();
const passport = require('passport');
const uploader = require('../configs/cloudinary.config');
const User = require('../models/User');
const { hashPassword } = require('../utils/hashing');
const { isValidPassword, isValidUsername, isEmptyField } = require('../lib/validatorMW');
const { isLoggedIn } = require('../lib/authMW');

// GET route - retrieve logged user
router.get('/current-user', isLoggedIn(), (req, res, next) => res.json({ user: req.user }));

// POST route - signup
router.post(
  '/signup',
  isEmptyField('username', 'password'),
  isValidUsername(),
  isValidPassword(),
  async (req, res, next) => {
    const { username, password } = req.body;

    try {
      // check if username already exists in db - status 400 if username is taken
      const registeredUser = await User.findOne({ username });
      if (registeredUser)
        return res.status(400).json({ message: `Username '${username}' is already taken` });

      // otherwise create new user
      const newUser = await User.create({
        username,
        password: hashPassword(password)
      });

      // login after signup
      req.login(newUser, error => {
        if (!error) {
          // status 201 for new user created and logged successfully
          return res.status(201).json({
            user: newUser
          });
        } else {
          console.log(`Error on loging after signup: ${error}`);
          return res.status(500).json({
            message: 'Internal server error during signup'
          });
        }
      });
    } catch (error) {
      // status 500 for internal server error
      console.log('Signup failed', error.errors);
      return res.status(500).json({ message: 'Internal server error during signup' });
    }
  }
);

// POST route - login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, failureDetails) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: 'Authentication error' });
    }

    // response for wrong credentials or missing field
    if (!user) return res.status(401).json({ message: failureDetails.message });

    if (req.isAuthenticated()) return res.status(400).json({ message: 'User is already logged' });

    req.login(user, err => {
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
    return res.status(200).json({ message: 'Log out successfully' });
  }

  return res.json({ message: 'Cannot logout if not authenticated' });
});

// PUT route - edit user's profile
router.put('/edit', isLoggedIn(), isValidUsername(), async (req, res, next) => {
  const { id } = req.user;
  try {
    // prevents users from making themselves admin
    if (req.body.isAdmin) {
      delete req.body.isAdmin;
    }
    const userUpdated = await User.findByIdAndUpdate(id, req.body, { new: true });
    return res.json({ message: 'User successfully updated', user: userUpdated });
  } catch (error) {
    if (error.name === 'MongoError') {
      return res.status(400).json({ message: `Username ${req.body.username} is already taken` });
    } else {
      return res.status(500).json({ error });
    }
  }
});

// PUT route - update user's avatar
router.put('/upload', uploader.single('image'), async (req, res, next) => {
  const { file } = req;
  if (!file) {
    return res.status(400).json({ message: 'No file uploaded!' });
  }
  console.log('user image uploaded', file);
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        image: file.url
      },
      { new: true }
    );
    return res.status(200).json({
      message: 'File successfully uploaded',
      user: updatedUser
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Image upload failed'
    });
  }
});

module.exports = router;
