import { Router } from "express"; 
import MovementCtrl from '../controllers/movementCtrl';
import auth from "../middlewares/auth";

export default (app:Router) => {
    app.get('/movements', MovementCtrl.findAll)
    app.post('/movement', MovementCtrl.new)
    app.get('/movement/report/:date1/:date2', MovementCtrl.report)
    app.get('/movements/:date1/:date2', MovementCtrl.findBetween)
};