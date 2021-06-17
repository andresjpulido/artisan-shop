import { Router, Request, Response } from "express";
import middlewares from "../middlewares";
import SizeCtrl from '../../controllers/sizeCtrl';
import { Container } from "typedi";
const auth = require('../middlewares/auth')
const route = Router();
console.log("entro a images");

export default (app) => {

    app.get('/sizes', SizeCtrl.findAll)

};