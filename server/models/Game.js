const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    image: String,
    releaseYear: Number,
    platform: String,
    buyLink: [String],
    genres: [String],
    PEGI: { type: Number, enum: [3, 7, 12, 16, 18] },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'review' }]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('game', gameSchema);
