import { Router } from "express";
import middlewares from "../middlewares";
import ParameterCtrl from '../controllers/parameterCtrl';
import auth from "../middlewares/auth"

export default (app:Router) => {

    app.get('/parameters', ParameterCtrl.get)

};