'use strict'; 

module.exports = (sequelize, DataTypes) => {
 
  const Location = sequelize.define('location', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: DataTypes.STRING,
    description: DataTypes.STRING,    
    createdAt: 'TIMESTAMP',
    updatedAt: 'TIMESTAMP'     
  }, {
    sequelize,  
    tableName: 'location'
  });

  Location.associate = function(models) { 

  };  
 
  return Location;
};
 