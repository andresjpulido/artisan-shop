import { Router } from "express";
import middlewares from "../middlewares";
import OperationCtrl from '../controllers/operationCtrl'
import { Container } from "typedi";
const auth = require('../middlewares/auth')
const route = Router(); 

export default (app:Router) => {

    app.get('/operations', OperationCtrl.findAll)

};