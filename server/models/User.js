const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;

const schema = new mongoose.Schema(
  {
    username: { type: String, unique: true, index: true, required: true },
    password: { type: String, required: true },
    image: String,
    email: String,
    isAdmin: { type: Boolean, default: false },
    gameLists: [
      {
        listType: { enum: ['wishlist', 'gamesPlayed'] },
        list: { type: ObjectId, ref: 'list' }
      }
    ],
    friends: [{ type: ObjectId, ref: 'user' }]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('user', schema);
