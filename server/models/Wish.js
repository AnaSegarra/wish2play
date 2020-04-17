const mongoose = require('mongoose');

const wishSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: { type: String, enum: ['Free', 'Reserved', 'Fulfilled'], default: 'Free' },
  game: { type: mongoose.Schema.Types.ObjectId, ref: 'Game' },
  isPublic: { type: Boolean, default: false },
});

module.exports = mongoose.model('Wish', wishSchema);
