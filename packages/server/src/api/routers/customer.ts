import { Router } from "express";
import CustomerCtrl from "../controllers/customerCtrl";
import auth from "../middlewares/auth"

export default (app:Router) => {
  app.post("/customers", CustomerCtrl.create);
  app.put("/customers", CustomerCtrl.update);
  app.delete("/customers/:id", CustomerCtrl.delete);
  app.get("/customers/:id", CustomerCtrl.getOne);
  app.get("/customers", CustomerCtrl.getAll);
};
