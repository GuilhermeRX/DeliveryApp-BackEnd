const productsService = require('../services/productsService');

const productsController = {
  getAll: async (req, res) => {
    const products = await productsService.getAll();
    res.status(200).json(products);
  },

  getById: async (req, res) => {
    const { id } = productsService.validateParamsId(req.params);
    await productsService.checkIfExistsId(id);
    const product = await productsService.getById(id);
    res.status(200).json(product);
  },

  create: async (req, res) => {
    const object = productsService.validateBody(req.body);
    const product = await productsService.create(object);
    res.status(201).json(product);
  },
};

module.exports = productsController;