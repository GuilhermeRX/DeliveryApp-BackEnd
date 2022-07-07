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
  }, {
    tableName: 'adresses',
    underscored: true,
  })

  Adress.associate = (models) => {
    Adress.belongsTo(models.User,
      { foreignKey: 'userId', as: 'user' })
  }
  return Adress;
}

module.exports = Adress;