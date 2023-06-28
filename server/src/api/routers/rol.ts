import { Router } from "express"; 
import RolCtrl from "../controllers/admin/rolCtrl";
import auth from "../middlewares/auth"; 

export default (app:Router) => {
	app.post("/users", RolCtrl.create);
	app.put("/users/:id", auth, RolCtrl.modify);
	app.delete("/users/:id", auth, RolCtrl.delete); 
	app.get("/users", RolCtrl.find);
	app.get("/users/:id", RolCtrl.findById);  
};
