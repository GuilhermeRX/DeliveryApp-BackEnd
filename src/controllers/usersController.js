const usersService = require('../services/usersService');

const usersController = {
  getAll: async (req, res) => {
    const users = await usersService.getAll();
    res.status(200).json(users);
  },

  getById: async (req, res) => {
    const { id } = req.params;
    await usersService.checkIfExistsId(id);
    const user = await usersService.getById(id);
    res.status(200).json(user);
  },

  checkIfExistsId: async (req, res) => {
    const { id } = req.params;
    const exists = await usersService.checkIfExistsId(id);
    res.status(200).json(exists);
  },
};

module.exports = usersController;