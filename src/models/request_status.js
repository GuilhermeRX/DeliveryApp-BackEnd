const RequestStatus = (sequelize, DataTypes) => {
  const RequestStatus = sequelize.define('RequestStatus', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
  }, {
    tableName: 'request_status',
    underscored: true,
  })

  RequestStatus.association = (models) => {
    RequestStatus.hasOne(models.requests,
      { foreignKey: 'status_id', as: 'request' })
  }
  return RequestStatus;
}

module.exports = RequestStatus;