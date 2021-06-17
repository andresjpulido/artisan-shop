import * as express from 'express';
import * as bodyParser from 'body-parser';
import routes from '../api';
const cors = require('cors');
import config from '../config';


export default async ({ app }: { app: express.Application }) => {

  app.get('/status', (req, res) => { res.status(200).end(); });
  app.head('/status', (req, res) => { res.status(200).end(); });
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

  /// catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = new Error('Not Found');
    err['status'] = 404;
    next(err);
  });


  // Devuelve la aplicación express
  return app;
}