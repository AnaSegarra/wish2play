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
    PEGI: { type: Number, enum: [3, 7, 12, 16, 18] }
  },
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'] }
});

module.exports = mongoose.model('request', schema);
