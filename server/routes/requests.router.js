const express = require('express');
const router = express.Router();
const Request = require('../models/Request');

// GET route - retrieve requests from db
router.get('/', async (req, res, next) => {
  try {
    const requests = await Request.find();

    // retrieve every request from db if admin
    if (req.user.isAdmin) {
      return res
        .status(200)
        .json({ message: 'Requests fetched successfully', results: requests.length, requests });
    }

    // retrieve only user's requests otherwise
    const userRequests = await Request.find({ requestedBy: req.user.id });
    return res.status(200).json({
      message: `User's requests fetched successfully`,
      results: userRequests.length,
      userRequests
    });
  } catch (error) {
    console.log('Error retrieving requests', error);
    return res
      .status(500)
      .json({ message: 'Internal server error fetching requests from database' });
  }
});

module.exports = router;
