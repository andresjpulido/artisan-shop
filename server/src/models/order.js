"use strict";

//const { sequelize } = require("sequelize");  

module.exports = (sequelize, DataTypes) => {
  const order = sequelize.define(
    "order",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      id_customer: DataTypes.INTEGER,
      id_orderStatus: DataTypes.INTEGER,
      createdAt: "TIMESTAMP",
      updatedAt: "TIMESTAMP",
      deliveryDate: "TIMESTAMP",
      description: DataTypes.STRING,
    },
    {
      sequelize,
      //modelName: 'Employee'
      // options
      tableName: "order",
    }
  );

  order.associate = function (models) {
    order.belongsTo(models.customer, {
      foreignKey: "id_customer",
    });
    order.belongsTo(models.status, {
      foreignKey: "id_orderStatus",
    });
    order.hasMany(models.product, {
      foreignKey: "id_order",
      as: "products",
    });
  };

  return order;
};
