'use strict'; 
 

module.exports =  (sequelize, DataTypes) => {
 
  const operation = sequelize.define('operation', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: DataTypes.STRING, 
    createdAt: 'TIMESTAMP',
    updatedAt: 'TIMESTAMP'    
  }, {
    sequelize,
    //modelName: 'Employee'
    // options
    tableName: 'operation'
  });

  operation.associate = function(models) {
    operation.hasMany(models.operationType,{
       foreignKey: 'id_operationType'
     })
  };
 
  return operation;
};
 