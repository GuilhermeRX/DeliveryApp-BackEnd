const Adress = (sequelize, DataTypes) => {
  const Adress = sequelize.define('adress', {
    cep: DataTypes.STRING,
    city: DataTypes.STRING,
    district: DataTypes.STRING,
    road: DataTypes.STRING,
    number: DataTypes.INTEGER,
  })
  return Adress;
}

module.exports = Adress;