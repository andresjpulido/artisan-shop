'use strict'; 


module.exports =  (sequelize, DataTypes) => {
 
  const Hour = sequelize.define('hour', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    id_emp: DataTypes.INTEGER,
    activity: DataTypes.STRING,
    isPaid: DataTypes.BOOLEAN,
    start_date: DataTypes.DATE, 
    end_date: DataTypes.DATE, 
    amount: DataTypes.INTEGER,
    hourValue: DataTypes.DOUBLE,
    payslipid: DataTypes.INTEGER,
    createdAt: 'TIMESTAMP',
    updatedAt: 'TIMESTAMP'    
  }, {
    sequelize,
    //modelName: 'Employee'
    // options
    tableName: 'hour'
  });

  Hour.associate = function(models) {
    Hour.belongsTo(models.employee, {
      foreignKey: 'id_emp'
    })
  };
 
  return Hour;
};
 