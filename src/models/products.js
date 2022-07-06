const Products = (sequelize, DataTypes) => {
  const Products = sequelize.define('products', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, },
    name: DataTypes.STRING,
    value: DataTypes.INTEGER,
    image: DataTypes.STRING
  }, {
    underscored: true,
  })

  Products.association = (models) => {
    Products.belongsTo(models.categories,
      { foreignKey: 'category_id', as: 'category' })
  }

  return Products;
}

module.exports = Products;