import { Router } from "express";
import InventoryCtrl from '../controllers/inventoryCtrl'; 
import auth from "../middlewares/auth";

export default (app:Router) => { 
    app.post('/inventory', InventoryCtrl.createEntry)
    app.put("/inventory", InventoryCtrl.toString);
    app.delete("/inventory/:id", InventoryCtrl.toString);
    app.get("/inventory/:id", InventoryCtrl.toString);
    app.get('/inventory', InventoryCtrl.findAll)
 
};