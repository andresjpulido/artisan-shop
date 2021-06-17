import { Router, Request, Response } from "express";
import middlewares from "../middlewares";
import UserCtrl from '../../controllers/admin/userCtrl'
import { Container } from "typedi";
const auth = require('../middlewares/auth')
const route = Router(); 

export default (app) => {

    app.post('/signup', UserCtrl.signUp)
    app.post('/signIn', UserCtrl.signIn)
    
    app.post('/user', auth, UserCtrl.create)
    app.get('/version',UserCtrl.version )
    app.post('/private', auth, UserCtrl.private)
};
