const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema(
  {
    name: { type: String, unique: true, required: true },
    description: { type: String, required: true },
    image: String,
    releaseYear: Number,
    platforms: [String],
    linkToBuy: String,
    genres: [String],
    ESRB: { type: String, enum: ['E', 'E 10+', 'T', 'M', 'A', 'RP'], default: 'RP' },
    company: String,
    totalRating: { type: Number, default: 0 },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }]
  },
  {
    timestamps: true
  }
);

gameSchema.statics.findGames = function (filter, limit, sort, fields) {
  const query = this.find(filter).limit(limit).sort(sort).select(fields);
  return query;
};

module.exports = mongoose.model('Game', gameSchema);
