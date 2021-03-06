const usersService = require('../services/usersService');

const usersController = {
  getAll: async (req, res) => {
    const { search, includeAddresses } = req.query;

    if (search) {
      const searchUser = await usersService.search(search, includeAddresses);
      return res.status(200).json(searchUser);
    }

    const users = await usersService.getAll(includeAddresses);
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
    const user = await usersService.create(object);
    res.status(201).json(user);
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