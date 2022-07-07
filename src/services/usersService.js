const Joi = require('joi');
const runSchema = require('../schema/validate');
const { User, Adress } = require('../database/models');

const usersService = {
  validateParamsId: runSchema(Joi.object({
    id: Joi.number().required().positive().integer(),
  })),

  getAll: async (includeAddresses) => {
    if (includeAddresses) {
      const users = await User.findAll({
        include: { model: Adress, as: 'adress' },
      });
      return users;
    }

    const users = await User.findAll();
    return users;
  },

  getById: async (id, includeAddresses) => {
    if (includeAddresses) {
      const user = await User.findAll({
        include: {
          model: Adress,
          as: 'adress',
          where: {
            userId: id,
          },
        },
      });
      return user[0];
    }
    const user = await User.findByPk(id);
    return user;
  },

  checkIfExistsId: async (id) => {
    const exists = await User.findByPk(id);
    if (!exists) throw new Error('Usuário não encontrado!');
    return true;
  },
};

module.exports = usersService;