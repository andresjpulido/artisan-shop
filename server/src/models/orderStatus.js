'use strict'; 

module.exports = (sequelize, DataTypes) => {
 
  const Status = sequelize.define('status', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    //modelName: 'Employee'
    // options
    tableName: 'orderStatus'
  });

  Status.associate = function(models) {
    // associations can be defined here
  };
 
  return Status;
};
 