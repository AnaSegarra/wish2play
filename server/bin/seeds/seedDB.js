require('../../configs/db.config');

const mongoose = require('mongoose');
const Game = require('../../models/Game');
const games = require('./games');
const User = require('../../models/User');
const users = require('./users');
const Review = require('../../models/Review');
const reviews = require('./reviews');
const Request = require('../../models/Request');
const requests = require('./requests');

Game.deleteMany()
  .then(() => {
    return Game.insertMany(games);
  })
  .then(gamesAdded => {
    console.log(`${gamesAdded.length} games created with unique ids:`);
    gamesAdded.forEach(game => console.log(game._id));
  })
  .then(() => {
    mongoose.disconnect();
  })
  .catch(err => {
    mongoose.disconnect();
    throw err;
  });

User.deleteMany()
  .then(() => {
    return User.insertMany(users);
  })
  .then(usersAdded => {
    console.log(`${usersAdded.length} users created with unique ids:`);
    usersAdded.forEach(user => console.log(user._id));
  })
  .then(() => {
    mongoose.disconnect();
  })
  .catch(err => {
    mongoose.disconnect();
    throw err;
  });

Review.deleteMany()
  .then(() => {
    return Review.insertMany(reviews);
  })
  .then(reviewsAdded => {
    console.log(`${reviewsAdded.length} reviews created with unique ids:`);
    reviewsAdded.forEach(review => console.log(review._id));
  })
  .then(() => {
    mongoose.disconnect();
  })
  .catch(err => {
    mongoose.disconnect();
    throw err;
  });

Request.deleteMany()
  .then(() => {
    return Request.insertMany(requests);
  })
  .then(requestsAdded => {
    console.log(`${requestsAdded.length} requests created with unique ids:`);
    requestsAdded.forEach(request => console.log(request._id));
  })
  .then(() => {
    mongoose.disconnect();
  })
  .catch(err => {
    mongoose.disconnect();
    throw err;
  });
