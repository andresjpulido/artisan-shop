'use strict'; 

module.exports = (sequelize, DataTypes) => {
 
  const Rol = sequelize.define('rol', {
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
    tableName: 'rol'
  });

  Rol.associate = function(models) {
  };
   
  return Rol;
};
 