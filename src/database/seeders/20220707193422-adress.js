'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('adresses',
      [
        {
          cep: '27286210',
          city: 'Volta Redonda',
          district: 'São Luiz',
          road: 'Dom Antônio Cabral',
          number: 469,
          user_id: 1,
          created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
          updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        {
          cep: '27286323',
          city: 'Volta Redonda',
          district: 'Candelaria',
          road: 'Rua do Jacó',
          number: 541,
          user_id: 2,
          created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
          updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        {
          cep: '27282510',
          city: 'Volta Redonda',
          district: 'Dom Bosco',
          road: 'Rua do Mer Fan',
          number: 147,
          user_id: 3,
          created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
          updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
      ], {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('adresses', null, {})
  }
};
