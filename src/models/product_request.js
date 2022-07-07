const ProductRequest = (sequelize, DataTypes) => {
  const ProductRequest = sequelize.define('product_request', {
    quantity: DataTypes.INTEGER,
  }, {
    underscored: true,
  })

  ProductRequest.associate = (models) => {
    models.products.belongsToMany(models.requests, {
      as: 'request',
      through: ProductRequest,
      foreignKey: 'product_id',
      otherKey: 'request_id',
    })

    models.requests.belongsToMany(models.products, {
      as: 'product',
      through: ProductRequest,
      foreignKey: 'request_id',
      otherKey: 'product_id'
    })
  }
  return ProductRequest;
}

module.exports = ProductRequest;