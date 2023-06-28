import { Router } from "express"; 
import ProductTypeCtrl from '../controllers/ProductTypeCtrl';
import { Container } from "typedi";
import auth from "../middlewares/auth";

export default (app:Router) => {

    app.get('/productTypes', ProductTypeCtrl.findAll)
    app.get('/productTypes/:id', ProductTypeCtrl.findOne)
    app.post('/productTypes', ProductTypeCtrl.create)
    app.delete('/productTypes', ProductTypeCtrl.deleteCollection)
    app.put('/productTypes', ProductTypeCtrl.update)
};