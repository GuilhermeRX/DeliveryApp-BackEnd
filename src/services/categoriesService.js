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
    const categories = await Category.findAll(
      { attributes: { exclude: ['createdAt', 'updatedAt'] } },
    );
    return categories;
  },

  getById: async (id, includeProducts) => {
    if (includeProducts) {
      const categories = await Category.findByPk(id,
        {
          attributes: { exclude: ['createdAt', 'updatedAt'] },
          include: {
            model: Product,
            as: 'products',
            attributes: { exclude: ['createdAt', 'updatedAt', 'categoryId'] },
          },
        });
      return categories;
    }
    const categories = await Category.findByPk(id, { attributes: { exclude: ['createdAt', 'updatedAt'] } });
    return categories;
  },

  create: async () => {

  },

  update: async () => {

  },

  delete: async () => {

  },
};

module.exports = categoriesService;