import { Router, Request, Response } from "express";
import middlewares from "../middlewares";
import MovementCtrl from '../../controllers/movementCtrl';
import { Container } from "typedi";
const auth = require('../middlewares/auth')
const route = Router();
console.log("entro a images");

export default (app) => {
    app.get('/movements', MovementCtrl.findAll)
    app.post('/movement', MovementCtrl.new)
    app.get('/movement/report/:date1/:date2', MovementCtrl.report)
    app.get('/movements/:date1/:date2', MovementCtrl.findBetween)
};