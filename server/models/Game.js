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
    ESRB: { type: String, enum: ['E', 'E 10+', 'T', 'M', 'A', 'RP'] },
    company: String,
    rating: { type: Number, default: 0 },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Game', gameSchema);
