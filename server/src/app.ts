import config from './config';
const loaders = require('./loaders');
const express = require('express');

async function startServer() {

  const app = express();

  await loaders.default({ expressApp: app });

 console.log("config.port" + config.port)
 
  app.listen(config.port, err => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(`Your server is ready ! in port ` + process.env.PORT);
  });
}

startServer();