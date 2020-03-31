const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;

const userSchema = new mongoose.Schema(
  {
    username: { type: String, unique: true, index: true, required: true },
    password: { type: String, required: true },
    image: String,
    email: String,
    name: String,
    isAdmin: { type: Boolean, default: false },
    gameLists: [{ type: ObjectId, ref: 'List' }],
    friends: [{ type: ObjectId, ref: 'User' }],
    notifications: [String],
    requests: [{ type: ObjectId, ref: 'Request' }]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('User', userSchema);
