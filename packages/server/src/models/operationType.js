'use strict'; 

module.exports = (sequelize, DataTypes) => {
 
  const operationType = sequelize.define('operationType', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},   
    name: DataTypes.STRING,    
    createdAt: 'TIMESTAMP',
    updatedAt: 'TIMESTAMP'     
  }, {
    sequelize,
    //modelName: 'Employee'
    // options
    tableName: 'operationType'
  });

  operationType.associate = function(models) { 
    // associations can be defined here
  };  

  return operationType;
};
 