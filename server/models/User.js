const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;

const userSchema = new mongoose.Schema(
  {
    username: { type: String, unique: true, index: true, required: true },
    password: { type: String, required: true },
    image: String,
    name: String,
    isAdmin: { type: Boolean, default: false },
    gamesPlayed: [{ type: ObjectId, ref: 'Game' }],
    wishlist: {
      status: { type: String, enum: ['Public', 'Private'], default: 'Private' },
      wishes: [{ type: ObjectId, ref: 'Wish' }],
      secure_url: String
    },
    friends: [{ type: ObjectId, ref: 'User' }],
    reservedWishes: [{ type: ObjectId, ref: 'Wish' }]
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        delete ret.createdAt;
        delete ret.updatedAt;
        delete ret.__v;
        return ret;
      }
    }
  }
);

module.exports = mongoose.model('User', userSchema);
