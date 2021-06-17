'use strict';
const { Console } = require('console');
 
var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
var basename = path.basename(__filename);
var db = {};

var sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    dialect: process.env.DB_DIALECT,
    host: process.env.DB_HOST,
    timezone: '+13:00',
    useUTC: true,
    port: process.env.DB_PORT
  }
);
 


 

console.log("antes de la autenticacion")

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  })
  .finally(() => {
    console.log("Connection closed")
    //    sequelize.close();
  });


console.log("paso la autenticacion")

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    console.log("procesando " + file)
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  console.log("loading " + modelName + " model.")
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;