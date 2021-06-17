'use strict'; 
 
module.exports = (sequelize, DataTypes) => {
 
  const parameter = sequelize.define('parameter', {
    code: { type: DataTypes.STRING, primaryKey: true},
    label: DataTypes.STRING, 
    value: DataTypes.STRING, 
    createdAt: 'TIMESTAMP',
    updatedAt: 'TIMESTAMP'    
  }, {
    sequelize,
    //modelName: 'Employee'
    // options
    tableName: 'parameter'
  });

  parameter.associate = function(models) {
     
  };
 
  return parameter;
};
 