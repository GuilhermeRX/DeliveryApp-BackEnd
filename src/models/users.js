const User = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    fullname: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  }, {
    tableName: 'users',
    underscored: true,
  })

  User.associate = (models) => {
    User.hasOne(models.Adress,
      { foreignKey: 'user_id', as: 'adress' })

    User.hasOne(models.Request,
      { foreignKey: 'user_id', as: 'request' })
  }
  return User;
}

module.exports = User;