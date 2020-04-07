const express = require('express');
const router = express.Router();

//routes middlewares
const auth = require('./auth.router');
router.use('/auth', auth);

const games = require('./games.router');
router.use('/games', games);

const requests = require('./requests.router');
router.use('/requests', requests);

const users = require('./users.router');
router.use('/users', users);

const wishes = require('./wishes.router');
router.use('/wishes', wishes);

module.exports = router;
