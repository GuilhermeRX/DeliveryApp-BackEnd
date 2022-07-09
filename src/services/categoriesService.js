const { Category, Product } = require('../database/models');

const categoriesService = {
  getAll: async (includeProducts) => {
    if (includeProducts) {
      const categories = await Category.findAll(
        {
          attributes: { exclude: ['createdAt', 'updatedAt'] },
          include: {
            model: Product,
            as: 'products',
            attributes: { exclude: ['createdAt', 'updatedAt', 'categoryId'] },
          },
        },
      );
      return categories;
    }
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