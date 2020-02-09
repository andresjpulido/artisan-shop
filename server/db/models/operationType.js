'use strict'; 

export default (sequelize, DataTypes) => {
 
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

  console.log("invocacion del modelo operationType")

  return operationType;
};
 