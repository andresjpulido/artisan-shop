import { Router } from "express"; 
import StatusCtrl from '../controllers/statusCtrl';
import { Container } from "typedi";
import auth from "../middlewares/auth";

export default (app:Router) => {

    app.get('/status', StatusCtrl.getAll)

};