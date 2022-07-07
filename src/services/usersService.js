const Joi = require('joi');
const runSchema = require('../schema/validate');
const { User, Adress } = require('../models');

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

  getById: async (id) => {
    const user = await User.findByPk(id);
    const adress = await Adress.findAll({ where: { userId: id } });
    return { user, adress };
  },

  checkIfExistsId: async (id) => {
    const exists = await User.findByPk(id);
    if (!exists) throw new Error('Usuário não encontrado!');
    return true;
  },
};

module.exports = usersService;