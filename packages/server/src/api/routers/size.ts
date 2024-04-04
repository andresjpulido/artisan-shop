"use strict";
import { Router } from "express";
import SizeCtrl from "../controllers/sizeCtrl";

export default (app: Router) => {
  app.get("/sizes", SizeCtrl.get);
};