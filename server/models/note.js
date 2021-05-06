'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Note extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Note.belongsTo(models.User, {
        foreignKey: "UserId",
        onDelete: "CASCADE"
      });

      Note.hasMany(models.Card, {
        foreignKey: "NoteId"
      });
    }
  };
  Note.init({
    Title: DataTypes.STRING,
    Text: DataTypes.TEXT,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Note',
  });
  return Note;
};