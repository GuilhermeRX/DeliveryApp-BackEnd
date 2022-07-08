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
    res.status(201).json({ id: insertId, ...req.body });
  },

  update: async (req, res) => {
    const { id } = usersService.validateParamsId(req.params);
    const object = usersService.validateBody(req.body);

    await usersService.checkIfExistsId(id);
    await usersService.update(id, object);

    res.status(200).json({ id, ...object });
  },

  delete: async (req, res) => {
    const { id } = usersService.validateParamsId(req.params);
    await usersService.checkIfExistsId(id);
    await usersService.delete(id);
    res.sendStatus(204);
  },
};

module.exports = usersController;