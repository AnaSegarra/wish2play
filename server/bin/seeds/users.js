const { hashPassword } = require('../../lib/hashing');

const users = [
  {
    _id: '5e83dafc292cfa5d539c4548',
    username: 'ana_s',
    password: hashPassword('1234'),
    image:
      'https://res.cloudinary.com/diimdgeux/image/upload/v1585647706/wish2play/users/20170912_175740_mw6acg.jpg',
    email: 'asegarraber@gmail.com',
    name: 'Ana S.'
  },
  {
    _id: '5e87025d236f7605918a976b',
    username: 'gema_s',
    password: hashPassword('1234'),
    name: 'Gema 🌸'
  }
];

module.exports = users;
