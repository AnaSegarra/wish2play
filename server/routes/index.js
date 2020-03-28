const express = require('express');
const router = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  return res.json({ message: 'Welcome to wish2play' });
});

module.exports = router;
