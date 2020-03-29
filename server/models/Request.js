const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  requestedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  content: {
    name: String,
    description: String,
    image: String,
    releaseYear: Number,
    platform: String,
    buyLink: [String],
    genres: [String],
    ESRB: { type: String, enum: ['E', 'E 10+', 'T', 'M', 'A', 'RP'] }
  },
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'] }
});

module.exports = mongoose.model('request', schema);
