const Products = (sequelize, DataTypes) => {
  const Products = sequelize.define('products', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, },
    name: DataTypes.STRING,
    value: DataTypes.INTEGER,
    image: DataTypes.STRING,
    category_id: { type: DataTypes.INTEGER, foreignKey: true }
  }, {
    underscored: true,
  })

  Products.association = (models) => {
    Products.hasOne(models.categories,
      { foreignKey: 'category_id', as: 'category' })

    Products.hasOne(models['product_request'],
      { foreignKey: 'product_id', as: 'productsRequest' })
  }

  return Products;
}

module.exports = Products;