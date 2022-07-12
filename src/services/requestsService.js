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

  checkIfExists: async (id) => {
    const request = await Request.findByPk(id);
    if (!request) throw new Error('Request not exists');
    return true;
  },

  refactorAll: (array, boolean) => {
    const newArray = array.map((request) => {
      const newProducts = request.products.map((items) => ({
        id: items.id,
        name: items.name,
        value: items.value,
        quantity: items.ProductRequest.quantity,
      }));
      const newObj = {
        request: request.id,
        name: request.user.fullname,
        email: request.user.email,
        status: request.status.name,
        products: boolean && newProducts,
      };
      return newObj;
    });
    return newArray;
  },

  getAll: async () => {
    const requests = await Request.findAll({
      attributes: ['id'],
      include:
        [
          { model: User, as: 'user', attributes: ['fullname', 'email'] },
          { model: RequestStatus, as: 'status', attributes: ['name'] },
        ],
    });

    return requestsService.refactorAll(requests);
  },

  getById: async (id) => {
    const request = await Request.findAll({
      where: { id },
      attributes: ['id'],
      include:
        [
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
    return requestsService.refactorAll(request, true);
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