import { Router, Request, Response } from "express";
import middlewares from "../middlewares";
import StatusCtrl from '../../controllers/statusCtrl';
import { Container } from "typedi";
const auth = require('../middlewares/auth')
const route = Router();
console.log("entro a images");

export default (app) => {

    app.get('/status', StatusCtrl.getAll)

};