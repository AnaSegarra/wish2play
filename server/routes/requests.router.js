const express = require('express');
const router = express.Router();
const Request = require('../models/Request');
const Game = require('../models/Game');
const { isLoggedIn, checkUserRole } = require('../lib/authMW');
const { isEmptyField } = require('../lib/validatorMW');

// GET route - retrieve requests from db
router.get('/', isLoggedIn(), async (req, res, next) => {
  try {
    const query = Request.find()
      .populate({ path: 'requestedBy', select: 'username -_id' })
      .sort({ status: 1 });
    // retrieve every request from db if admin
    if (req.user.isAdmin) {
      const requests = await query;
      return res.json({
        message: 'Requests fetched successfully',
        results: requests.length,
        requests
      });
    }

    // retrieve only user's requests otherwise
    const requests = await query
      .where('requestedBy')
      .equals(req.user.id)
      .sort({ createdAt: -1 })
      .limit(6).select('-_id status content.name')

    return res.json({
      message: `User's requests fetched successfully`,
      results: requests.length,
      requests
    });
  } catch (error) {
    console.log('Error retrieving requests', error);
    return res
      .status(500)
      .json({ message: 'Internal server error fetching requests from database' });
  }
});

// POST route - add a request
router.post('/', isLoggedIn(), isEmptyField('name'), async (req, res, next) => {
  try {
    const { name } = req.body;
    // status 400 if there's already a pending request for that game
    const requestRegistered = await Request.findOne({
      'content.name': name,
      status: 'Pending'
    });
    if (requestRegistered)
      return res.status(400).json({ message: `A request for ${name} is already being processed` });

    // status 400 if the game was already requested and approved or is already in the db
    const requestApproved = await Request.findOne({ 'content.name': name, status: 'Approved' });
    const gameInDb = await Game.findOne({ name });
    if (requestApproved || gameInDb)
      return res.status(400).json({ message: `${name} is already in the games list!` });

    // confirm request otherwise
    const newRequest = await Request.create({
      requestedBy: req.user.id,
      content: req.body
    });
    return res.status(201).json({ message: 'Request successfully made', request: newRequest });
  } catch (error) {
    console.log('Error creating a request', error);
    return res.status(500).json({ message: 'Internal server error making a request' });
  }
});

router.put('/:id', checkUserRole(), async (req, res, next) => {
  const { id } = req.params;

  try {
    const request = await Request.findByIdAndUpdate(id, req.body, { new: true }).populate({
      path: 'requestedBy',
      select: 'username -_id'
    });

    if (!request) return res.status(404).json({ message: 'Request not found' });

    return res.json({ message: 'Request status successfully updated', request });
  } catch (error) {
    console.log('Error updating request status', error);
    return res.status(500).json({ message: 'Internal server error updating request status' });
  }
});

module.exports = router;
