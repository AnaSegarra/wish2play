const express = require('express');
const router = express.Router();

//routes middlewares
const auth = require('./auth.router');
router.use('/auth', auth);

const games = require('./games.router');
router.use('/games', games);

//main router
router.get('/', (req, res, next) => {
  return res.json({ message: 'Welcome to wish2play' });
});

module.exports = router;
