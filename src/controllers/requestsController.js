const requestsService = require('../services/requestsService');

const requestsController = {
  getAll: async (req, res) => {
    const requests = await requestsService.getAll();
    res.status(200).json(requests);
  },

  getById: async (req, res) => {
    const { id } = requestsService.validateParamsId(req.params);
    await requestsService.checkIfExists(id);
    const request = await requestsService.getById(id);
    res.status(200).json(request);
  },

  create: async (req, res) => {
    const object = requestsService.validateBody(req.body);
    const request = await requestsService.create(object);
    res.status(201).json(request);
  },

  update: async (req, res) => {
    const { id } = requestsService.validateParamsId(req.params);
    await requestsService.checkIfExists(id);
    await requestsService.update(req.body, id);
    res.status(200).json({ id, ...req.body });
  },

  delete: async (req, res) => {
    const { id } = requestsService.validateParamsId(req.params);
    await requestsService.checkIfExists(id);
    await requestsService.delete(id);
    res.sendStatus(204);
  },
};

module.exports = requestsController;