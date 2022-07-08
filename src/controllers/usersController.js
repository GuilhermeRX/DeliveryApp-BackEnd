const usersService = require('../services/usersService');

const usersController = {
  getAll: async (req, res) => {
    const users = await usersService.getAll(req.query.includeAddresses);
    res.status(200).json(users);
  },

  getById: async (req, res) => {
    const { id } = await usersService.validateParamsId(req.params);
    await usersService.checkIfExistsId(id);
    const user = await usersService.getById(id, req.query.includeAddresses);
    res.status(200).json(user);
  },

  create: async (req, res) => {
    const object = usersService.validateBody(req.body);
    const insertId = await usersService.create(object);
    res.status(201).json({ id: insertId, name: req.body.fullname });
  },
};

module.exports = usersController;