const Joi = require('joi');
const runSchema = require('../schema/validate');

const usersService = {
  validateParamsId: runSchema(Joi.object({
    id: Joi.number().required().positive().integer(),
  })),

  getAll: async () => {
    const users = await usersModel.getAll();
    return users;
  },

  getById: async (id) => {
    const user = await usersModel.getById(id);
    return user;
  },

  checkIfExistsId: async (id) => {
    const exists = await usersModel.checkIfExistsId(id);
    if (!exists) throw new Error('Usuário não encontrado!');
    return true;
  },
};

module.exports = usersService;