const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema(
  {
    requestedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    content: {
      name: String,
      description: String,
      image: String,
      releaseYear: Number,
      platforms: [String],
      linkToBuy: String,
      genres: [String],
      ESRB: { type: String, enum: ['E', 'E 10+', 'T', 'M', 'A', 'RP'], default: 'RP' },
      company: String
    },
    status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Request', requestSchema);
