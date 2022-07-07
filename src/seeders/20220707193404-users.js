module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users',
      [
        {
          fullname: 'Luiz Guilherme',
          email: 'guilhermerx18@gmail.com',
          password: '123456',
          image: 'www.minhaimagem.com',
          createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
          updatedAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        {
          fullname: 'Victoria Ferreira',
          email: 'victoria@gmail.com',
          password: '1234567',
          image: 'www.minhaimagem.com',
          created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
          updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        {
          fullname: 'Fernanda Avelino',
          email: 'fernanda@gmail.com',
          password: '12345678',
          image: 'www.minhaimagem.com',
          created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
          updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
      ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {})
  },
};
