'use strict'; 
 
export default (sequelize, DataTypes) => {
 
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

  console.log("invoke operation model")
 
  return operation;
};
 