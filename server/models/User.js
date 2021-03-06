const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      index: true,
      required: true,
      maxlength: 18
    },
    password: { type: String, required: true },
    image: String,
    name: String,
    biography: { type: String, maxlength: 200 },
    isAdmin: { type: Boolean, default: false },
    gamesPlayed: [{ type: ObjectId, ref: 'Game' }],
    wishlist: [{ type: ObjectId, ref: 'Wish' }],
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
