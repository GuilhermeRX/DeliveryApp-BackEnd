const ProductRequest = (sequelize, DataTypes) => {
  const ProductRequest = sequelize.define('ProductRequest', {
    quantity: DataTypes.INTEGER,
  }, {
    tableName: 'product_request',
    underscored: true,
  })

  ProductRequest.associate = (models) => {
    models.Product.belongsToMany(models.Request, {
      as: 'request',
      through: ProductRequest,
      foreignKey: 'product_id',
      otherKey: 'request_id',
    })

    models.Request.belongsToMany(models.Product, {
      as: 'product',
      through: ProductRequest,
      foreignKey: 'request_id',
      otherKey: 'product_id'
    })
  }
  return ProductRequest;
}

module.exports = ProductRequest;