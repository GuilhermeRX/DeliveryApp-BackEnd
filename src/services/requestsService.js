const Joi = require('joi');
const runSchema = require('../schema/validate');
const { Request, RequestStatus, User, Product } = require('../database/models');

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
    const newArray = array.map((request) => ({
      request: request.id,
      name: request.user.fullname,
      email: request.user.email,
      status: request.status.name,
      products: boolean && request.products,
    }));
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
            through: { attributes: [] },
            attributes: ['id', 'name', 'value'],
          },
          { model: User, as: 'user', attributes: ['fullname', 'email'] },
          { model: RequestStatus, as: 'status', attributes: ['name'] },
        ],
    });
    return requestsService.refactorAll(request, true);
  },

  create: async (object) => {
    const request = await Request.create({ ...object });
    return request;
  },

  update: async (object, id) => {
    await Request.update({ ...object }, { where: { id } });
  },

  delete: async (id) => {
    await Request.destroy({ where: { id } });
  },
};

module.exports = requestsService;