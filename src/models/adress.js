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
  }, {
    underscored: true,
  })
  return Adress;
}

module.exports = Adress;