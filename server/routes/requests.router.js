const express = require('express');
const router = express.Router();
const Request = require('../models/Request');
const Game = require('../models/Game');

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

// POST route - add a request
router.post('/', async (req, res, next) => {
  const {
    name,
    description,
    image,
    releaseYear,
    platforms,
    linkToBuy,
    genres,
    ESRB,
    company
  } = req.body;

  try {
    // status 400 if there's already a pending request for that game
    const requestRegistered = await Request.findOne({ 'content.name': name, status: 'Pending' });
    if (requestRegistered) {
      console.log('Request already being processed', requestRegistered);
      return res.status(400).json({ message: `A request for ${name} is already being processed` });
    }

    // status 400 if the game was already request and approved or is already in the db
    const requestApproved = await Request.findOne({ 'content.name': name, status: 'Approved' });
    const gameInDb = await Game.findOne({ name });
    if (requestApproved || gameInDb) {
      console.log('Game already in db', requestRegistered, gameInDb);
      return res.status(400).json({ message: `${name} is already in the games list!` });
    }

    const newRequest = await Request.create({
      requestedBy: req.user.id,
      content: {
        name,
        description,
        image,
        releaseYear,
        platforms,
        linkToBuy,
        genres,
        ESRB,
        company
      }
    });
    console.log('Request made', newRequest);
    return res.status(201).json({ message: 'Request successfully made', request: newRequest });
  } catch (error) {
    console.log('Error creating a request', error);
    return res.status(500).json({ message: 'Internal server error making a request' });
  }
});

router.put('/:id', async (req, res, next) => {
  const { id } = req.params;
  const { status } = req.body;

  console.log('status', status, 'id', id);

  try {
    const request = await Request.findByIdAndUpdate(id, { status }, { new: true });

    if (!request) {
      console.log(`Couldn't find a request with an id of ${id}`);
      return res.status(404).json({ message: 'Request not found' });
    }

    console.log('Update request status', request);
    return res.status(200).json({ message: 'Request status successfully updated', request });
  } catch (error) {
    console.log('Error updating request status', error);
    return res.status(500).json({ message: 'Internal server error updating request status' });
  }
});

module.exports = router;
