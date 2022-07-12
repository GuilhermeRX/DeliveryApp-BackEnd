const Request = (sequelize, DataTypes) => {
  const Request = sequelize.define('Request', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  }, {
    tableName: 'requests',
    underscored: true
  });

  Request.associate = (models) => {
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