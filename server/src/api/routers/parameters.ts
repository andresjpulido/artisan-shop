import { Router, Request, Response } from "express";
import middlewares from "../middlewares";
import ParameterCtrl from '../../controllers/parameterCtrl'
import { Container } from "typedi";
const auth = require('../middlewares/auth')
const route = Router();
console.log("entro a images");

export default (app) => {

    app.get('/parameters', ParameterCtrl.findAll)

};