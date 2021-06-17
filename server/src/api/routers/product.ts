import { Router, Request, Response } from "express";
import middlewares from "../middlewares";
import productCtrl from '../../controllers/productCtrl'
import { Container } from "typedi";
const auth = require('../middlewares/auth')
const route = Router();
console.log("entro a images");

export default (app) => {

    app.put('/products', productCtrl.create)
    

};
