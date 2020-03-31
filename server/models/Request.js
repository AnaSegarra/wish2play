const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  requestedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
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

module.exports = mongoose.model('Request', requestSchema);
