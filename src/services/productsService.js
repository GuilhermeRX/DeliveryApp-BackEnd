const Joi = require('joi');
const { Product } = require('../database/models');
const runSchema = require('../schema/validate');
const { Category } = require('../database/models');

const productsService = {
  validateParamsId: runSchema(Joi.object({
    id: Joi.number().required().positive().integer(),
  })),

  validateBody: runSchema(Joi.object({
    name: Joi.string().required().min(1),
    value: Joi.number().required().precision(2).positive(),
    image: Joi.string().required().min(3),
    categoryId: Joi.number().required().integer().min(1),
  })),

  checkIfExistsId: async (id) => {
    const exists = Product.findByPk(id);
    if (!exists) throw new Error('Produto não encontrado!');
    return true;
  },

  getAll: async () => {
    const products = await Product.findAll({ include: { model: Category, as: 'category' } });
    return products;
  },

  getById: async (id) => {
    const product = await Product.findByPk(id);
    return product.id;
  },

  create: async (object) => {
    const productId = await Product.create({ ...object });
    return productId;
  },

  update: async (id, object) => {
    await Product.update({ ...object }, { where: { id } });
  },

  delete: async (id) => {
    await Product.destroy({ where: { id } });
  },

};

module.exports = productsService;