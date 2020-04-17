const mongoose = require('mongoose');
const { MongoError } = require('mongodb');

exports.dropIfExists = async (Model) => {
  try {
    console.log('Collection emptied');
    await Model.collection.drop();
  } catch (e) {
    if (e instanceof MongoError) {
      console.log(`Cannot drop collection ${Model.collection.name}, because does not exist in DB`);
    } else {
      throw e;
    }
  }
};

exports.withDbConnection = async (fn, disconnectEnd = true) => {
  try {
    await fn();
  } catch (error) {
    console.log('ERROR');
    console.log(error);
  } finally {
    // Disconnect from database
    if (disconnectEnd) {
      await mongoose.disconnect();
      console.log('disconnected');
    }
  }
};
