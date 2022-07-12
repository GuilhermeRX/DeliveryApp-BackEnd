'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('product_request',
      [
        {
          product_id: 1,
          request_id: 1,
          quantity: 2,
          created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
          updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        {
          product_id: 2,
          request_id: 1,
          quantity: 4,
          created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
          updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        {
          product_id: 3,
          request_id: 1,
          quantity: 1,
          created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
          updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        {
          product_id: 2,
          request_id: 2,
          quantity: 1,
          created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
          updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        {
          product_id: 3,
          request_id: 3,
          quantity: 3,
          created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
          updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
      ], {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('product_request', null, {})
  }
};
