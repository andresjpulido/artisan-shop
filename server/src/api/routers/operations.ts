import { Router, Request, Response } from "express";
import middlewares from "../middlewares";
import OperationCtrl from '../../controllers/operationCtrl'
import { Container } from "typedi";
const auth = require('../middlewares/auth')
const route = Router();
console.log("entro a images");

export default (app) => {

    app.get('/operations', OperationCtrl.findAll)

};