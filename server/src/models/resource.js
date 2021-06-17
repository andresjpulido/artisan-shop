'use strict'; 

module.exports = (sequelize, DataTypes) => {
 
  const Resource = sequelize.define('resource', {
      id: { 
          type: DataTypes.INTEGER, 
          primaryKey: true, 
          autoIncrement: true
      },     
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      createdAt: 'TIMESTAMP',
      updatedAt: 'TIMESTAMP'    
  }, {
    sequelize,    
    tableName: 'resource'
  });

  Resource.associate = function(models) {

  };
   
  return Resource;
};