import { Router } from "express"; 
import RolCtrl from "../controllers/admin/rolCtrl";
import auth from "../middlewares/auth"; 

export default (app:Router) => {
	app.post("/roles", RolCtrl.create);
	app.put("/roles/:id", auth, RolCtrl.modify);
	app.delete("/roles/:id", auth, RolCtrl.delete); 
	app.get("/roles", auth, RolCtrl.find);
	app.get("/roles/:id", RolCtrl.findById);  
};
