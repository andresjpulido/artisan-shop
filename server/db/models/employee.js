'use strict'; 

export default (sequelize, DataTypes) => {
 
  const Employee = sequelize.define('employee', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    movil: DataTypes.STRING,
    address: DataTypes.STRING,
    typeDocument: DataTypes.STRING,
    document: DataTypes.STRING,
    birthDate: DataTypes.DATE,
    email: DataTypes.STRING,
    ird: DataTypes.STRING,
    position: DataTypes.STRING, 
    bankName: DataTypes.STRING,
    accountNumber: DataTypes.STRING,
    createdAt: 'TIMESTAMP',
    updatedAt: 'TIMESTAMP'     
  }, {
    sequelize,
    //modelName: 'Employee'
    // options
    tableName: 'employee'
  });

  Employee.associate = function(models) { 
    Employee.belongsTo(models.user,{
      foreignKey: 'id' 
    })
  };  

  console.log("invocacion del modelo employee")

  return Employee;
};
 