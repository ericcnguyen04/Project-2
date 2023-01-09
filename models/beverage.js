'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class beverage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.beverage.belongsTo(models.user)
      models.beverage.belongsToMany(models.category, {through: 'beverages_categories'})
    }
  }
  beverage.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    ingredient: DataTypes.TEXT,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'beverage',
  });
  return beverage;
};