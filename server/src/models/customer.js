'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

  class Customer extends Model {
    static associate(models) {
      Customer.associate = function (models) {
        
      };
    }
  };


  Customer.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    createdAt: 'TIMESTAMP',
    updatedAt: 'TIMESTAMP',
    email: DataTypes.STRING,
    phoneNumber: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'customer',
    tableName: 'customer'
  });
  return Customer;

};
