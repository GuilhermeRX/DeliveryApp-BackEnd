const categoriesService = require('../services/categoriesService');

const categoriesController = {
  getAll: async (req, res) => {
    const categories = await categoriesService.getAll(req.query.includeProducts);
    res.status(200).json(categories);
  },

  getById: async (req, res) => {
    const { id } = categoriesService.validateParamsId(req.params);
    const category = await categoriesService.getById(id, req.query.includeProducts);
    res.status(200).json(category);
  },

  create: async (req, res) => {
    const object = categoriesService.validateBody(req.body);
    const category = await categoriesService.create(object);
    res.status(201).json(category);
  },

  update: async (req, res) => {
    const { id } = categoriesService.validateParamsId(req.params);
    const object = categoriesService.validateBody(req.body);
    await categoriesService.update(id, object);
    res.status(200).json({ id, ...object });
  },

  delete: async (req, res) => {
    const { id } = categoriesService.validateParamsId(req.params);
    await categoriesService.delete(id);
    res.sendStatus(204);
  },
};

module.exports = categoriesController;