const RequestStatus = (sequelize, DataTypes) => {
  const RequestStatus = sequelize.define('request_status', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
  })

  return RequestStatus;
}

module.exports = RequestStatus;