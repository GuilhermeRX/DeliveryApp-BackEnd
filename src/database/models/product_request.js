const ProductRequest = (sequelize, DataTypes) => {
  const ProductRequest = sequelize.define('ProductRequest', {
    quantity: DataTypes.INTEGER,
  }, {
    tableName: 'product_request',
    underscored: true,
  })

  ProductRequest.associate = (models) => {
    models.Product.belongsToMany(models.Request, {
      as: 'requests',
      through: ProductRequest,
      foreignKey: 'productId',
      otherKey: 'requestId',
    })

    models.Request.belongsToMany(models.Product, {
      as: 'products',
      through: ProductRequest,
      foreignKey: 'requestId',
      otherKey: 'productId'
    })

  }
  return ProductRequest;
}

module.exports = ProductRequest;