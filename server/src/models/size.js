'use strict'; 

module.exports = (sequelize, DataTypes) => {
 
  const Size = sequelize.define('size', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: DataTypes.STRING, 
    code: DataTypes.STRING, 
    createdAt: 'TIMESTAMP',
    updatedAt: 'TIMESTAMP'    
  }, {
    sequelize,
    //modelName: 'Employee'
    // options
    tableName: 'size'
  });

  Size.associate = function(models) {
     Size.hasMany(models.inventoryModel,{
       foreignKey: 'id'
     })
  };
 
  return Size;
};
 