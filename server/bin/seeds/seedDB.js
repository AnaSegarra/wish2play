require('../../configs/db.config');

const mongoose = require('mongoose');
const Game = require('../../models/Game');
const games = require('./games');

async function seedDB(collecName, data) {
  const count = await collecName.collection.countDocuments({});

  try {
    if (count !== 0) {
      await collecName.collection.drop();
      console.log('emptied database');
    }

    const collection = await collecName.create(data);

    console.log(`Seed database with ${collection}`);
  } catch (error) {
    console.log(`Something went wrong: ${error}`);
  } finally {
    mongoose.disconnect();

    console.log('Disconnected from database');
  }
}

seedDB(Game, games);
