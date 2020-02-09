'use strict';

    var fs        = require('fs');
    var path      = require('path');
    var Sequelize = require('sequelize');
    var basename  = path.basename(__filename);
     
    var config    = require('./../../config/config.json');
    var db        = {};
 
console.log("process.env.DB_USERNAME ::" + process.env.DB_USERNAME)
console.log("db_password ::" + process.env.db_password)
 

    var sequelize = new Sequelize(config.db.database, config.db.username, config.db.password,{
      "dialect":config.db.dialect, 
      "host":config.db.host 
    });
    
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



 