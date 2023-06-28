import * as express from 'express';
import * as bodyParser from 'body-parser';
import routes from '../api';
const cors = require('cors');
import config from '../config';
import swaggerUI from 'swagger-ui-express';
import fs from 'fs';

let swaggerFile = `${process.cwd()}/public/swagger.json`
console.log("swaggerFile" , swaggerFile)
let swaggerData = fs.readFileSync(swaggerFile, 'utf-8');
let swaggerJSON = JSON.parse(swaggerData); 
let swaggerCSS: any = fs.readFileSync((`${process.cwd()}/public/swagger.css`), 'utf8');


const errorHandler = require("../api/middlewares/errorHandler");

export default async ({ app }: { app: express.Application }) => {

  app.use(express.static("public"));

  app.get('/status', (req, res) => { res.status(200).end(); });
  app.head('/status', (req, res) => { res.status(200).end(); });
  
  app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerJSON, null, null, swaggerCSS));
  app.enable('trust proxy');

  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(express.json({
    inflate: true,
    limit: '100kb',
    reviver: null,
    strict: true,
    type: 'application/json',
    verify: undefined
  }))
  
  
  // ...Más middlewares
  app.use(config.api.prefix, routes());

 
 
  app.use(errorHandler); 
  return app;
  
}