const { Category } = require('../database/models');

const categoriesService = {
  getAll: async () => {
    // if (includeProducts) {
    //   const categories = await Category.findAll(
    //     { include: { model: Product, as: 'products' } },
    //   );
    //   return categories;
    // }
    const categories = await Category.findAll();
    return categories;
  },

  getById: async () => {

  },

  create: async () => {

  },

  update: async () => {

  },

  delete: async () => {

  },
};

module.exports = categoriesService;