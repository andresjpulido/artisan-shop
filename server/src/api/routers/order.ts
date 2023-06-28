import { Router } from "express";
 
import OrderCtrl from '../controllers/orderCtrl'
const auth = require('../middlewares/auth')
const errorHandler = require("../middlewares/errorHandler");
 

export default (app:Router) => {

    app.put('/orders', OrderCtrl.put)
    app.post('/orders', OrderCtrl.create)
    app.get('/orders/:id', OrderCtrl.getOrder)
    app.get('/orders',  OrderCtrl.getAll)

};
