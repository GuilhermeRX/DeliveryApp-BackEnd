const Product = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, },
    name: DataTypes.STRING,
    value: DataTypes.DOUBLE,
    image: DataTypes.STRING,
  }, {
    tableName: 'products',
    underscored: true,
  })

  Product.association = (models) => {
    Product.hasOne(models.Category,
      { foreignKey: 'categoryId', as: 'category' })

    Product.hasOne(models.ProductRequest,
      { foreignKey: 'product_id', as: 'productsRequest' })
  }

  return Product;
}

module.exports = Product;