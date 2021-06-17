'use strict'; 

module.exports = (sequelize, DataTypes) => {
 
  const Payslip = sequelize.define('payslip', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    employeeid: DataTypes.INTEGER,
    description: DataTypes.STRING,
    period: DataTypes.STRING,
    total: DataTypes.INTEGER,
    taxes: DataTypes.DOUBLE,
    hours: DataTypes.INTEGER,
    basicIncome: DataTypes.DOUBLE,
    creation_date: DataTypes.DATE, 
    createdAt: 'TIMESTAMP',
    updatedAt: 'TIMESTAMP'    
  }, {
    //sequelize,
    //modelName: 'Employee'
    // options
    tableName: 'payslip'
  });

  Payslip.associate = function(models) {
    Payslip.belongsTo(models.employee,{
      foreignKey: 'employeeid' 
    })
  };
 
  return Payslip;
};
 