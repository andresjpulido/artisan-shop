'use strict';

    var fs        = require('fs');
    var path      = require('path');
    var Sequelize = require('sequelize');
    var basename  = path.basename(__filename);      
    var db        = {};  

console.log(process.env.DB_DATABASE, 
  process.env.DB_USERNAME, 
  process.env.DB_PASSWORD,process.env.DB_DIALECT, process.env.DB_HOST )

    var sequelize = new Sequelize(
      process.env.DB_DATABASE, 
      process.env.DB_USERNAME, 
      process.env.DB_PASSWORD,
      {
        dialect: process.env.DB_DIALECT, 
        host: process.env.DB_HOST,
        timezone: '+13:00',
        useUTC: true
      }
    );
    
    fs
      .readdirSync(__dirname)
      .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
      })
      .forEach(file => {
        var model = sequelize['import'](path.join(__dirname, file));
        db[model.name] = model;
    });

    Object.keys(db).forEach(modelName => {
      console.log("cargando " + modelName)
      if (db[modelName].associate) {
        db[modelName].associate(db);
      }
    });

    db.sequelize = sequelize;
    db.Sequelize = Sequelize;


    sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });



    module.exports = db;



 