'use strict'; 
/*
//import Size from './size'
import model from '../models/index'
const { Size } = model;
*/
export default (sequelize, DataTypes) => {
 
  const inventoryModel = sequelize.define('inventoryModel', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    amount: DataTypes.INTEGER,
    description: DataTypes.STRING,
    id_size: DataTypes.INTEGER, 
    id_productType: DataTypes.INTEGER,
    createdAt: 'TIMESTAMP',
    updatedAt: 'TIMESTAMP'    
  }, {
    sequelize,
    //modelName: 'Employee'
    // options
    tableName: 'inventory'
  });

  inventoryModel.associate = function(models) {
    inventoryModel.belongsTo(models.size,{
      foreignKey: 'id_size' 
    }),
    inventoryModel.belongsTo(models.productType,{
      foreignKey: 'id_productType' 
    })   
  };

  console.log("invocake Inventory model")
 

  return inventoryModel;
};
 