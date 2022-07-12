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

  Product.associate = (models) => {
    Product.belongsTo(models.Category,
      { foreignKey: 'categoryId', as: 'category' })
  }

  return Product;
}

module.exports = Product;