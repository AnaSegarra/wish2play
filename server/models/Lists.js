const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
  type: { type: String, enum: ['wishlist', 'gamesPlayed'] },
  games: { type: mongoose.Schema.Types.ObjectId, ref: 'Game' },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: { type: String, enum: ['public', 'private'] },
  secure_url: String
});

module.exports = mongoose.model('List', listSchema);
