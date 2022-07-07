const Adress = (sequelize, DataTypes) => {
  const Adress = sequelize.define('Adress', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    cep: DataTypes.STRING,
    city: DataTypes.STRING,
    district: DataTypes.STRING,
    road: DataTypes.STRING,
    number: DataTypes.INTEGER,
    userId: { type: DataTypes.INTEGER, foreignKey: true }
  }, {
    tableName: 'adresses',
    underscored: true,
  })

  Adress.associate = (models) => {
    Adress.belongsTo(models.users,
      { foreignKey: 'user_id', as: 'user' })
  }
  return Adress;
}

module.exports = Adress;