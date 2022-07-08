const Category = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
  }, {
    tableName: 'categories',
    underscored: true,
  })

  Category.associate = (models) => {
    Category.hasOne(models.Product,
      { foreignKey: 'categoryId', as: 'products' })
  }

  return Category;
}

module.exports = Category;