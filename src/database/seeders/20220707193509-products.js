'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('products',
      [
        {
          name: 'Pastel',
          value: 2.5,
          image: 'www.minhaimagem.com',
          category_id: 1,
          created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
          updated_at: Sequelize.literal('CURRENT_TIMESTAMP')
        },
        {
          name: 'CocaCola 300ml',
          value: 6,
          image: 'www.minhaimagemlata.com',
          category_id: 2,
          created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
          updated_at: Sequelize.literal('CURRENT_TIMESTAMP')
        },
        {
          name: 'Sprite',
          value: 5.5,
          image: 'www.minhaimagemlata.com',
          category_id: 2,
          created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
          updated_at: Sequelize.literal('CURRENT_TIMESTAMP')
        },
      ], {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('products', null, {})
  }
};
