import { Router } from "express"; 
import AuthCtrl from '../controllers/admin/authCtrl'  
import auth from "../middlewares/auth"

export default (app:Router) => {

    app.post('/signup', AuthCtrl.signUp)
    app.post('/signIn', AuthCtrl.signIn)  
    app.get('/version',AuthCtrl.version )
    app.post('/private', auth, AuthCtrl.private)
    
};
