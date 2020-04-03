const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    username: { type: String, unique: true, index: true, required: true },
    password: { type: String, required: true },
    image: String,
    email: String,
    name: String,
    isAdmin: { type: Boolean, default: false },
    gamesPlayed: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Game' }],
    wishlist: [
      {
        status: { type: String, enum: ['Public', 'Private'], default: 'Private' },
        wishes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Wish' }],
        secure_url: String,
      },
    ],
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', userSchema);
