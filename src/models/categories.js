const Categories = (sequelize, DataTypes) => {
  const Categories = sequelize.define('categories', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
  }, {
    underscored: true,
  })

  Categories.associate = (models) => {
    Categories.hasMany(model.products,
      { foreignKey: 'category_id', as: 'products_category' })
  }
  return Categories;
}

module.exports = Categories;