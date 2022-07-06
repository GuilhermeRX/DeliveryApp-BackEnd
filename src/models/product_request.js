const ProductRequest = (sequelize, DataTypes) => {
  const ProductRequest = sequelize.define('product_request', {
    quantity: DataTypes.INTEGER,
  }, {
    underscored: true,
  })

  ProductRequest.associate = (models) => {
    models.product.belongsToMany(models.request, {
      as: 'requests',
      through: ProductRequest,
      foreignKey: 'product_id',
      otherKey: 'request_id',
    })

    models.request.belongsToMany(models.product, {
      as: 'products',
      through: ProductRequest,
      foreignKey: 'request_id',
      otherKey: 'product_id'
    })
  }
  return ProductRequest;
}

module.exports = ProductRequest;