'use strict';

module.exports = (sequelize, DataTypes) => {

  const Order = sequelize.define('order', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    id_customer: DataTypes.INTEGER,
    id_orderStatus: DataTypes.INTEGER,
    createdAt: 'TIMESTAMP',
    updatedAt: 'TIMESTAMP',
    deliveryDate: 'TIMESTAMP',
    description: DataTypes.STRING
  }, {
    sequelize,
    //modelName: 'Employee'
    // options
    tableName: 'order'
  });

  Order.associate = function (models) {
    Order.belongsTo(models.customer, {
      foreignKey: 'id_customer'
    })
    Order.belongsTo(models.status, {
      foreignKey: 'id_orderStatus'
    })
    Order.hasMany(models.product, {
      foreignKey: 'id_order', as: 'products'
    });
  };

  return Order;
};
