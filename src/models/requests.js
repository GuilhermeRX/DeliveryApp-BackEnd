const Request = (sequelize, DataTypes) => {
  const Request = sequelize.define('Request', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  }, {
    tableName: 'requests',
    underscored: true
  })

  Request.association = (models) => {
    Request.hasOne(models['product_request'],
      { foreignKey: 'request_id', as: 'productsRequest' })

    Request.belongsToMany(models.users, {
      foreignKey: 'user_id',
      as: 'user'
    })

    Request.belongsToMany(models['request_status'], {
      foreignKey: 'status_id',
      as: 'status'
    })
  }

  return Request;
}

module.exports = Request;