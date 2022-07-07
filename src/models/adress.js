const Adress = (sequelize, DataTypes) => {
  const Adress = sequelize.define('adress', {
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
    user_id: { type: DataTypes.INTEGER, foreignKey: true }
  }, {
    underscored: true,
  })

  Adress.associate = (models) => {
    Adress.belongsTo(models.users,
      { foreignKey: 'user_id', as: 'user' })
  }
  return Adress;
}

module.exports = Adress;