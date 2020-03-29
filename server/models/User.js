const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;

const schema = new mongoose.Schema(
  {
    username: { type: String, unique: true, index: true, required: true },
    password: { type: String, required: true },
    image: String,
    email: String,
    name: String,
    isAdmin: { type: Boolean, default: false },
    gameLists: [{ type: ObjectId, ref: 'list' }],
    friends: [{ type: ObjectId, ref: 'user' }],
    notifications: [String],
    requests: [{ type: ObjectId, ref: 'request' }]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('user', schema);
