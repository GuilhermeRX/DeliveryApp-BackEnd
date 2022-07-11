const Request = (sequelize, DataTypes) => {
  const Request = sequelize.define('Request', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    statusId: { type: DataTypes.INTEGER, foreignKey: true },
    userId: { type: DataTypes.INTEGER, foreignKey: true },
  }, {
    tableName: 'requests',
    underscored: true
  });

  Request.association = (models) => {
    Request.hasOne(models.ProductRequest,
      { foreignKey: 'requestId', as: 'productsRequest' });

    Request.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    });

    Request.belongsTo(models.RequestStatus, {
      foreignKey: 'statusId',
      as: 'status'
    });
  }

  return Request;
}

module.exports = Request;