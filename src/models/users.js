const Users = (sequelize, DataTypes) => {
  const Users = sequelize.define('users', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    fullname: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
    adress_id: DataTypes
  }, {
    underscored: true,
  })

  Users.associate = (models) => {
    Users.hasMany(models.adress,
      { foreignKey: 'adress_id', as: 'adress' })
  }


  return Users;
}

module.exports = Users;