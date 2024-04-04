'use strict'; 

module.exports = (sequelize, DataTypes) => {
 
  const productType = sequelize.define('productType', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},   
    name: DataTypes.STRING,    
    description: DataTypes.STRING,  
    code: DataTypes.STRING,   
    createdAt: 'TIMESTAMP',
    updatedAt: 'TIMESTAMP'    
  }, {
    sequelize,
    //modelName: 'Employee'
    // options
    tableName: 'productType'
  });

  productType.associate = function(models) { 
    // associations can be defined here
  };  
 
  return productType;
};
 