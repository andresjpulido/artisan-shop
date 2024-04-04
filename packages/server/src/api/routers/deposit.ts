import { Router } from "express";

import DepositCtrl from "../controllers/depositCtrl";
import { Container } from "typedi"; 
import auth from "../middlewares/auth"; 

export default (app: Router) => {
   
  app.get("/deposits/:id", DepositCtrl.getDepositById); 
  app.get("/deposits", DepositCtrl.getDeposits); 
  app.delete("/deposits/:id", DepositCtrl.delete); 
  app.put("/deposits",  DepositCtrl.update);  
  app.post("/deposits", DepositCtrl.create);
    
};
