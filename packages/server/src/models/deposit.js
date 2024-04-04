"use strict";

module.exports = (sequelize, DataTypes) => {
  const Deposit = sequelize.define(
    "deposit",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      description: DataTypes.STRING,
      amount: DataTypes.DOUBLE,
      id_order: DataTypes.INTEGER,
      createdAt: "TIMESTAMP",
      updatedAt: "TIMESTAMP",
    },
    {
      sequelize,
      //modelName: 'Employee'
      // options
      tableName: "deposit",
    }
  );

  Deposit.associate = function (models) {
    Deposit.belongsTo(models.order, {
      foreignKey: "id_order",
    }); 
  };

  return Deposit;
};
