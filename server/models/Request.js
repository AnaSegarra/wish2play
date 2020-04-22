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
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        delete ret.createdAt;
        delete ret.updatedAt;
        delete ret.__v;
        return ret;
      }
    }
  }
);

module.exports = mongoose.model('Request', requestSchema);
