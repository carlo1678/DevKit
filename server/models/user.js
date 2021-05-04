'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Note, {
        foreignKey: "UserId"
      });
    }
  };
  User.init({
    UserName: DataTypes.STRING,
    Password: DataTypes.STRING,
    FirstName: DataTypes.STRING,
    LastName: DataTypes.STRING,
    DOB: DataTypes.DATEONLY,
    Address: DataTypes.STRING,
    Email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};