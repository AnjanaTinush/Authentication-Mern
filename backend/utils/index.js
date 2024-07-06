require('dotenv').config();
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const key = 'hvsdfavsdvhvjhvjhvhvjhve'; // must be 24bytes string // aes256 32byte string
const iv = crypto.randomBytes(16);
const algorithm = 'aes192';
const encoding = 'hex';

// Generate Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

module.exports = {
  generateToken,
};
