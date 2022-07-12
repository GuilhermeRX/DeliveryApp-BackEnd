const RequestStatus = (sequelize, DataTypes) => {
  const RequestStatus = sequelize.define('RequestStatus', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
  }, {
    tableName: 'request_status',
    underscored: true,
  })

  RequestStatus.associate = (models) => {
    RequestStatus.hasMany(models.Request,
      { foreignKey: 'statusId', as: 'requests' })
  }
  return RequestStatus;
}

module.exports = RequestStatus;