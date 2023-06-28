import { Router } from "express";
 
import HoursCtrl from '../controllers/hourCtrl';
import { Container } from "typedi";
import hourService from '../../services/hourService';
import auth from "../middlewares/auth"

export default (app:Router) => {

    //app.get('/hours', auth, HoursCtrl.getHours)
    //app.get('/hours', HoursCtrl.getHours)
    //app.get('/hour/:id', auth, HoursCtrl.getHoursById)
    app.get('/hours/:id', HoursCtrl.getHoursById)
    //app.get('/hours/:username/:isPaid', auth, HoursCtrl.getHoursByUserId)
    app.get('/hours/:username/:isPaid', HoursCtrl.getHoursByUserId)
    //app.post('/hours',  HoursCtrl.create) 
    //app.delete('/hours/:id', HoursCtrl.delete)
    app.delete('/hours', HoursCtrl.deleteCollection)


    app.get('/hours', async (req, res, next) => {
        let query = req.query;
        const serviceInstance = Container.get(hourService);
		const list = await serviceInstance.getAll(query);
 		return res.json(list);
    })
    app.get('/hours/:id', async (req, res, next) => {
        const serviceInstance = Container.get(hourService);
        const id = req.params.id;
		const list = await serviceInstance.getOne(id);
 		return res.json(list);
    })
    app.put('/hours', async (req, res, next) => {
        const serviceInstance = Container.get(hourService);
		const list = await serviceInstance.update(req.body);
 		return res.json(list);
    })
    app.post('/hours', async (req, res, next) => {
        const serviceInstance = Container.get(hourService);
		const list = await serviceInstance.create(req.body);
 		return res.json(list);
    })
    app.delete('/hours/:id', async (req, res, next) => {
        const serviceInstance = Container.get(hourService);
        const id = req.params.id;
		const list = await serviceInstance.delete(id);
 		return res.json(list);
    })
    app.delete('/hours', async (req, res, next) => {
        const serviceInstance = Container.get(hourService);
        const ids = req.body.ids;
		const username = req.body.username;
		const list = await serviceInstance.deleteCollection(ids, username);
 		return res.json(list);
    })

};
