const usersModel = require('../models/usersModel');

const usersService = {
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