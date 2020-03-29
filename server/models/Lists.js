const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;
const schema = new mongoose.Schema({
  type: { type: String, enum: ['wishlist', 'gamesPlayed'] },
  games: { type: ObjectId, ref: 'game' },
  owner: { type: ObjectId, ref: 'user' },
  status: { type: String, enum: ['public', 'private'] },
  secure_url: String
});

module.exports = mongoose.model('list', schema);
