"use strict";

module.exports = (sequelize, DataTypes) => {
  const Note = sequelize.define(
    "note",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      content: DataTypes.STRING,
      isprivate: DataTypes.BOOLEAN,
      id_order: DataTypes.INTEGER,
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
    Note.belongsTo(models.order, {
      foreignKey: "id_order",
    }); 
  };

  return Note;
};
