const Request = (sequelize, DataTypes) => {
  const Request = sequelize.define('Request', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  }, {
    tableName: 'requests',
    underscored: true
  })

  Request.association = (models) => {
    Request.hasOne(models.ProductRequest,
      { foreignKey: 'request_id', as: 'productsRequest' })

    Request.belongsToMany(models.User, {
      foreignKey: 'user_id',
      as: 'user'
    })

    Request.belongsToMany(models.RequestStatus, {
      foreignKey: 'status_id',
      as: 'status'
    })
  }

  return Request;
}

module.exports = Request;