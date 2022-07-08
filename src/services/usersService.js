const Joi = require('joi');
const Sequelize = require('sequelize');
const { Op } = require('sequelize');
const runSchema = require('../schema/validate');
const { User, Adress } = require('../database/models');

const config = require('../database/config/config');

const sequelize = new Sequelize(config.development);

const usersService = {
  validateParamsId: runSchema(Joi.object({
    id: Joi.number().required().positive().integer(),
  })),

  validateBody: runSchema(Joi.object({
    fullname: Joi.string().required().min(3).max(40),
    email: Joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password: Joi.string().required().min(3),
    image: Joi.string().required().min(3).max(150),
    adress: Joi.object({
      cep: Joi.string().required().min(3).max(8),
      city: Joi.string().required().min(2).max(50),
      district: Joi.string().required().min(3).max(50),
      road: Joi.string().required().min(3).max(80),
      number: Joi.number().required().min(1),
    }),
  })),

  checkIfExistsId: async (id) => {
    const exists = await User.findByPk(id);
    if (!exists) throw new Error('Usuário não encontrado!');
    return true;
  },

  getAll: async (includeAddresses) => {
    if (includeAddresses) {
      const users = await User.findAll({
        include: { model: Adress, as: 'adress' },
      });
      return users;
    }

    const users = await User.findAll();
    return users;
  },

  getById: async (id, includeAddresses) => {
    if (includeAddresses) {
      const user = await User.findAll({
        include: {
          model: Adress,
          as: 'adress',
          where: {
            userId: id,
          },
        },
      });
      return user[0];
    }
    const user = await User.findByPk(id);
    return user;
  },

  create: async (object) => {
    const { fullname, email, password, image, adress } = object;
    const { cep, city, district, road, number } = adress;
    const result = await sequelize.transaction(async (t) => {
      const user = await User
        .create({ fullname, email, password, image }, { transaction: t });

      await Adress
        .create({ cep, city, district, road, number, userId: user.id }, { transaction: t });

      return user.id;
    });
    return result;
  },

  update: async (id, object) => {
    const { fullname, email, password, image, adress } = object;
    const newUser = { fullname, email, password, image };

    await sequelize.transaction(async (t) => {
      await User
        .update({ ...newUser }, { where: { id } }, { transaction: t });

      await Adress
        .update({ ...adress }, { where: { userId: id } }, { transaction: t });
    });
  },

  delete: async (id) => {
    await User.destroy({ where: { id } });
  },

  search: async (search, includeAddresses) => {
    if (includeAddresses) {
      const user = User.findAll(
        {
          include: { model: Adress, as: 'adress' },
          where: { fullname: { [Op.substring]: search } },
        },
      );
      return user;
    }
    const user = User.findAll({ where: { fullname: { [Op.substring]: search } } });
    return user;
  },
};

module.exports = usersService;