import { Router, Request, Response } from "express";
import middlewares from "../middlewares";
import ProductTypeCtrl from '../../controllers/ProductTypeCtrl';
import { Container } from "typedi";
const auth = require('../middlewares/auth')
const route = Router();
console.log("entro a images");

export default (app) => {

    app.get('/productTypes', ProductTypeCtrl.findAll)
    app.get('/productTypes/:id', ProductTypeCtrl.findOne)
    app.post('/productTypes', ProductTypeCtrl.create)
    app.delete('/productTypes', ProductTypeCtrl.deleteCollection)
    app.put('/productTypes', ProductTypeCtrl.update)
};