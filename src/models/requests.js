const Request = (sequelize, DataTypes) => {
  const Request = sequelize.define('requests', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  })

  Request.association = (models) => {
    Request.belongsTo(models.users, {
      foreignKey: 'user_id',
      as: 'user'
    })
  }

  Request.association = (models) => {
    Request.belongsTo(models['request_status'], {
      foreignKey: 'status_id',
      as: 'status'
    })
  }

  return Request;
}

module.exports = Request;