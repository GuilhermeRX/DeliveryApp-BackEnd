const Joi = require('joi');
const Sequelize = require('sequelize');
const runSchema = require('../schema/validate');
const { Request, RequestStatus, User, Product, ProductRequest } = require('../database/models');

const config = require('../database/config/config');

const sequelize = new Sequelize(config.development);

const requestsService = {
  validateParamsId: runSchema(Joi.object({
    id: Joi.number().required().integer().positive(),
  })),

  validateBody: runSchema(Joi.object({
    userId: Joi.number().required().integer(),
    statusId: Joi.number().required().integer(),
    products: Joi.array().items(Joi.object({
      productId: Joi.number().required().integer(),
      requestId: Joi.number().required().integer(),
      quantity: Joi.number().required().integer(),
    })),
  })),

  validateBodyUpdate: runSchema(Joi.object({
    statusId: Joi.number().required().integer(),
  })),

  checkIfExists: async (id) => {
    const request = await Request.findByPk(id);
    if (!request) throw new Error('Request not exists');
    return true;
  },

  refactorProducts: (object) => {
    const newProducts = object.products.map((items) => ({
      id: items.id,
      name: items.name,
      value: items.value,
      quantity: items.ProductRequest.quantity,
    }));
    return newProducts;
  },

  refactorAll: (array) => {
    const newArray = array.map((request) => {
      const newObj = {
        request: request.id,
        name: request.user.fullname,
        email: request.user.email,
        status: request.status.name,
        total: request.toJSON().total,
      };
      return newObj;
    });
    return newArray;
  },

  refactorId: (object, boolean) => {
    const newObj = {
      request: object.id,
      name: object.user.fullname,
      email: object.user.email,
      status: object.status.name,
      total: object.total,
      products: boolean && requestsService.refactorProducts(object),
    };
    return newObj;
  },

  getAll: async () => {
    const requests = await Request.findAll({
      include:
        [
          {
            model: Product,
            as: 'products',
            through: { attributes: [] },
            attributes: [],
          },
          { model: User, as: 'user', attributes: ['id', 'fullname', 'email'] },
          { model: RequestStatus, as: 'status', attributes: ['name'] },
        ],
      attributes: ['id', [sequelize.fn('sum', sequelize.literal('value * quantity')), 'total']],
      group: ['Request.id'],
    });
    return requestsService.refactorAll(requests);
  },

  getTotalId: async (id) => {
    const request = await Request.findByPk(id, {
      include: [
        {
          model: Product,
          as: 'products',
          through: { attributes: [] },
          attributes: [],
        },
      ],
      attributes: ['id', [sequelize.fn('sum', sequelize.literal('value * quantity')), 'total']],
      group: ['id'],
    });

    return request.toJSON();
  },

  getById: async (id) => {
    const request = await Request.findByPk(id, {
      include: [
        {
          model: Product,
          as: 'products',
          through: { attributes: ['quantity'] },
          attributes: ['id', 'name', 'value'],
        },
        { model: User, as: 'user', attributes: ['fullname', 'email'] },
        { model: RequestStatus, as: 'status', attributes: ['name'] },
      ],
    });
    const total = await requestsService.getTotalId(id);
    const newObj = { ...request.toJSON(), total: total.total };
    return requestsService.refactorId(newObj, true);
  },

  create: async (object) => {
    const { userId, statusId, products } = object;

    const result = await sequelize.transaction(async (t) => {
      const request = await Request.create({ userId, statusId }, { transaction: t });
      const newProducts = products.map((obj) => ({
        productId: obj.productId,
        requestId: request.id,
        quantity: obj.quantity,
      }));

      const productsRequest = await ProductRequest.bulkCreate([...newProducts], { transaction: t });
      return { ...request.toJSON(), productsRequest };
    });
    return result;
  },

  update: async (object, id) => {
    await Request.update({ ...object }, { where: { id } });
  },

  delete: async (id) => {
    await Request.destroy({ where: { id } });
  },
};

module.exports = requestsService;