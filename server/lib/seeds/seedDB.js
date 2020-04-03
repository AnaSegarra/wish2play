require('../../configs/db.config');
const { dropIfExists, withDbConnection } = require('../dbConnection');

const Game = require('../../models/Game');
const games = require('./games');
const User = require('../../models/User');
const users = require('./users');
const Review = require('../../models/Review');
const reviews = require('./reviews');

withDbConnection(async () => {
  await dropIfExists(Game);
  const gamesAdded = await Game.create(games);
  console.log(`${gamesAdded.length} games created with unique ids:`);
  gamesAdded.forEach((game) => console.log(game._id));

  await dropIfExists(User);
  const usersAdded = await User.create(users);
  console.log(`${usersAdded.length} users created with unique ids:`);
  usersAdded.forEach((user) => console.log(user._id));

  await dropIfExists(Review);
  const reviewsAdded = await Review.create(reviews);
  console.log(`${reviewsAdded.length} reviews created with unique ids:`);
  reviewsAdded.forEach((review) => console.log(review._id));
});
