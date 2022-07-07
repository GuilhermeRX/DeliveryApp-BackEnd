const RequestStatus = (sequelize, DataTypes) => {
  const RequestStatus = sequelize.define('request_status', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
  })

  RequestStatus.association = (models) => {
    RequestStatus.hasOne(models.requests,
      { foreignKey: 'status_id', as: 'request' })
  }
  return RequestStatus;
}

module.exports = RequestStatus;