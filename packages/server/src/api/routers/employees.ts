import { Router } from "express";
import EmployeesCtrl from "../controllers/employeeCtrl";
import auth from "../middlewares/auth";

export default (app: Router) => {
  app.post("/employees", EmployeesCtrl.create);
  app.put("/employees/:id", auth, EmployeesCtrl.modify);
  app.delete("/employees/:id", auth, EmployeesCtrl.remove);
  app.delete("/employees", EmployeesCtrl.deleteCollection);
  app.get("/employees", EmployeesCtrl.findAll);
  app.get("/employees/:id", EmployeesCtrl.findOne);
};
