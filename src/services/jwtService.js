require('dotenv/config');
const jwt = require('jsonwebtoken');

const jwtService = {
  create: (email) => {
    const token = jwt.sign({ data: email }, process.env.JWT_SECRET, {
      expiresIn: '7d',
      algorithm: 'HS256',
    });
    return token;
  },

  validateToken: (token) => {
    try {
      const { data } = jwt.verify(token, process.env.JWT_SECRET);
      return data;
    } catch (_err) {
      const e = new Error('Expired or invalid token');
      e.code = 401;
      throw e;
    }
  },
};

module.exports = jwtService;