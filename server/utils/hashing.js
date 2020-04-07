const bcrypt = require('bcryptjs');

const salt = 10;
const hashPassword = pass => (pass ? bcrypt.hashSync(pass, salt) : '');
const checkPassword = bcrypt.compareSync;

module.exports = { hashPassword, checkPassword };
