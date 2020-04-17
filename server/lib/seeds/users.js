const faker = require('faker');
const { hashPassword } = require('../../utils/hashing');
const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,8}$/;

const users = [];

for (let i = 0; i < 10; i++) {
  let username = faker.internet.userName();
  let password = faker.internet.password(7, false);
  if (!password.match(passwordPattern)) {
    password = faker.internet.password(7, false);
  }
  users.push({ username, password: hashPassword(password) });
}

module.exports = users;
