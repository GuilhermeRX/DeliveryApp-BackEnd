const Joi = require('joi');
const { User } = require('../database/models');
const jwtService = require('./jwtService');

const loginService = {
  validateBody: (params) => {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });
    const { error, value } = schema.validate(params);

    if (error) {
      error.message = 'Some required fields are missing';
      error.code = 400;
      throw error;
    }
    return value;
  },

  createToken: async (object) => {
    const { email, password } = object;
    const user = await User.findOne({ where: { email } });

    if (!user || user.password !== password) {
      const e = new Error('Invalid fields');
      e.code = 400;
      throw e;
    }

    const token = jwtService.create(email, user.id);
    return token;
  },

  validateToken: (token) => {
    if (!token) {
      const e = new Error('Token not found');
      e.code = 401;
      throw e;
    }

    const user = jwtService.validateToken(token);

    return user;
  },
};

module.exports = loginService;