import { Router } from "express";
import UserCtrl from "../controllers/admin/userCtrl";

import auth from "../middlewares/auth";

import privatekey from "../../services/privatekey";

export default (app: Router) => {
  app.post("/users", UserCtrl.create);
  app.put("/users/:id", auth, UserCtrl.modify);
  app.delete("/users/:id", auth, UserCtrl.delete);
  app.delete("/users", UserCtrl.deleteCollection);
  app.get("/users", UserCtrl.getAll);
  app.get("/users/:id", UserCtrl.findById);
  app.put("/users/:id/password", UserCtrl.changePassword);
};
