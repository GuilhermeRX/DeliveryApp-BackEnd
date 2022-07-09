const categoriesService = require('../services/categoriesService');

const categoriesController = {
  getAll: async (req, res) => {
    const categories = await categoriesService.getAll();
    res.status(200).json(categories);
  },

  getById: async (req, res) => {
    const category = await categoriesService.getById(req.params.id);
    res.status(200).json(category);
  },

  create: async (req, res) => {
    const category = await categoriesService.create(req.body);
    res.status(201).json(category);
  },

  update: async (req, res) => {
    await categoriesService.update(req.body);
    res.status(200).json({ id: req.params.id, ...req.body });
  },

  delete: async (req, res) => {
    await categoriesService.delete(req.params.id);
    res.sendStatus(204);
  },
};

module.exports = categoriesController;