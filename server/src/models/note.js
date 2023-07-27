"use strict";

module.exports = (sequelize, DataTypes) => {
  const Note = sequelize.define(
    "note",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      content: DataTypes.STRING,
      isprivate: DataTypes.BOOLEAN,
      createdAt: "TIMESTAMP",
      updatedAt: "TIMESTAMP",
    },
    {
      sequelize,
      //modelName: 'Employee'
      // options
      tableName: "note",
    }
  );

  Note.associate = function (models) {
    Note.hasMany(models.order, {
      foreignKey: "id",
    })
  };

  return Note;
};
