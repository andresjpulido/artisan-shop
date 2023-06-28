import { Router } from "express";
import middlewares from "../middlewares";
import ParameterCtrl from '../controllers/parameterCtrl'
import { Container } from "typedi";
const auth = require('../middlewares/auth')
const route = Router(); 

export default (app:Router) => {

    app.get('/parameters', ParameterCtrl.findAll)

};