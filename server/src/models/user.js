'use strict'; 

module.exports = (sequelize, DataTypes) => {
 
  const User = sequelize.define('user', {
      id: { 
          type: DataTypes.INTEGER, 
          primaryKey: true, 
          autoIncrement: true
      },     
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      lastlogin: 'TIMESTAMP', 
      createdAt: 'TIMESTAMP',
      updatedAt: 'TIMESTAMP'    
  }, {
    sequelize,    
    tableName: 'user'
  });

  User.associate = function(models) {
    User.belongsTo(models.employee,{
      foreignKey: 'id_employee' 
    })
  };
   
  return User;
};
 