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
    Products.hasMany(models.categories,
      { foreignKey: 'category_id', as: 'category' })
  }

  return Products;
}

module.exports = Products;