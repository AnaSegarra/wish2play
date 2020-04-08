require('../../configs/db.config');
const { dropIfExists, withDbConnection } = require('../dbConnection');

const Game = require('../../models/Game');
const games = require('./games');
const User = require('../../models/User');
const users = require('./users');
const Review = require('../../models/Review');
const reviews = require('./reviews');

withDbConnection(async () => {
  await dropIfExists(User);
  const usersAdded = await User.create(users);
  console.log(`${usersAdded.length} users created with unique ids:`);
  usersAdded.forEach(user => console.log(user._id));

  await dropIfExists(Review);
  const reviewsAdded = await Review.create(reviews);
  console.log(`${reviewsAdded.length} reviews created with unique ids:`);
  reviewsAdded.forEach(review => console.log(review._id));

  await dropIfExists(Game);
  const gamesAdded = await Game.create(games);
  console.log(`${gamesAdded.length} games created with unique ids:`);
  gamesAdded.forEach(game => console.log(game._id));

  let i = 0;
  for (game of gamesAdded) {
    let randomUser = usersAdded[Math.floor(Math.random() * usersAdded.length)];
    let review = reviewsAdded[i];
    randomUser.gamesPlayed.push(game._id);
    if (review) {
      game.reviews.push(review._id);
      game.totalRating = review.rating;
      review.author = randomUser.id;
      i++;
      await review.save();
    }
    await randomUser.save();
    await game.save();
  }
});
