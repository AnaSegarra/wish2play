const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    image: String,
    releaseYear: Number,
    platforms: [String],
    linkToBuy: [String],
    genres: [String],
    PEGI: { type: Number, enum: [3, 7, 12, 16, 18] },
    company: String,
    rating: { type: Number, default: 0 },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'review' }]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('game', gameSchema);
