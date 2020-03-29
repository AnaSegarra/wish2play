const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;
const schema = new mongoose.Schema(
  {
    author: { type: ObjectId, ref: 'user' },
    content: String,
    game: { type: ObjectId, ref: 'game' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('review', schema);
