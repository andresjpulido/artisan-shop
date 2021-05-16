'use strict'; 
 
export default (sequelize, DataTypes) => {
 
  const customer = sequelize.define('customer', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    firstName: DataTypes.STRING, 
    lastName: DataTypes.STRING,
    createdAt: 'TIMESTAMP',
    updatedAt: 'TIMESTAMP'    
  }, {
    sequelize,
    //modelName: 'Employee'
    // options
    tableName: 'customer'
  });

  customer.associate = function(models) {
    
  };
 
  return customer;
};
 