import { Router, Request, Response } from "express";
import middlewares from "../middlewares";
import OrderCtrl from '../../controllers/orderCtrl'
import { Container } from "typedi";
const auth = require('../middlewares/auth')
const route = Router();
console.log("entro a images");

export default (app) => {

    app.put('/orders', OrderCtrl.put)
    app.post('/orders', OrderCtrl.create)
    app.get('/orders/:id', OrderCtrl.getOrder)
    app.get('/orders', OrderCtrl.getAll)

};
