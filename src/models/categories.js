const Category = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
  }, {
    tableName: 'categories',
    underscored: true,
  })

  Category.associate = (models) => {
    Category.hasMany(models.Product,
      { foreignKey: 'category_id', as: 'products_category' })
  }
  return Category;
}

module.exports = Category;