'use strict'; 

export default (sequelize, DataTypes) => {
 
  const movementModel = sequelize.define('movementModel', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    amount: DataTypes.INTEGER,
    description: DataTypes.STRING,
    id_size: DataTypes.INTEGER, 
    id_productType: DataTypes.INTEGER,
    id_operation: DataTypes.INTEGER,
    createdAt: 'TIMESTAMP',
    updatedAt: 'TIMESTAMP',
    username: DataTypes.STRING,
  }, {
    sequelize,
    //modelName: 'Employee'
    // options
    tableName: 'movement'
  });

  movementModel.associate = function(models) {
    movementModel.belongsTo(models.size,{
      foreignKey: 'id_size' 
    }),
    movementModel.belongsTo(models.productType,{
      foreignKey: 'id_productType' 
    }),  
    movementModel.belongsTo(models.operation,{
        foreignKey: 'id_operation'
    }) 

  };

  console.log("invocake movementModel model")
 

  return movementModel;
};
 