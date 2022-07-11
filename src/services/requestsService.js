const Joi = require('joi');
const runSchema = require('../schema/validate');
const { Request } = require('../database/models');

const requestsService = {
  validateParamsId: runSchema(Joi.object({
    id: Joi.number().required().integer().positive(),
  })),

  checkIfExists: async (id) => {
    const request = await Request.findByPk(id);
    if (!request) throw new Error('Request not exists');
    return true;
  },

  getAll: async () => {
    const requests = await Request.findAll();
    return requests;
  },

  getById: async (id) => {
    const request = await Request.findByPk(id);
    return request;
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