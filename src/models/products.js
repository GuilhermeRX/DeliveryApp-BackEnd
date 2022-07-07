const Product = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, },
    name: DataTypes.STRING,
    value: DataTypes.INTEGER,
    image: DataTypes.STRING,
    categoryId: { type: DataTypes.INTEGER, foreignKey: true }
  }, {
    tableName: 'products',
    underscored: true,
  })

  Product.association = (models) => {
    Product.hasOne(models.categories,
      { foreignKey: 'category_id', as: 'category' })

    Product.hasOne(models['product_request'],
      { foreignKey: 'product_id', as: 'productsRequest' })
  }

  return Product;
}

module.exports = Product;