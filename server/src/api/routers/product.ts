import { Router, Request, Response } from "express";
import middlewares from "../middlewares";
import productService from '../../services/productService';
import { Container } from "typedi";
const auth = require('../middlewares/auth')
const route = Router();

export default (app) => {

    app.get('/products', async (req, res, next) => {
        const queryObj = req.query
        const serviceInstance = Container.get(productService);
        let list =[];
        if(queryObj.autocomplete === "true")
            list = await serviceInstance.getAllAutocomplete(queryObj);
		else
            list = await serviceInstance.getAll(queryObj);
 		return res.json(list);
    })
    app.get('/inventoryproducts', async (req, res, next) => {
        const queryObj = req.query
        const serviceInstance = Container.get(productService);
        let list = await serviceInstance.inventory(queryObj);
 		return res.json(list);
    })
    app.get('/products/:id', async (req, res, next) => {
        const serviceInstance = Container.get(productService);
        const id = req.params.id;
		const product = await serviceInstance.getOne(id);
 		return res.json(product);
    })
    app.put('/products', async (req, res, next) => {
        const serviceInstance = Container.get(productService);
		await serviceInstance.update(req.body);
 		return res.status(200).send();
    })
    app.post('/products', async (req, res, next) => {
        const serviceInstance = Container.get(productService);
		const list = await serviceInstance.create(req.body);
 		return res.json(list);
    })
    app.delete('/products/:id', async (req, res, next) => {
        const serviceInstance = Container.get(productService);
        const id = req.params.id;
		const list = await serviceInstance.delete(id);
 		return res.json(list);
    })
    app.delete('/products', async (req, res, next) => {
        const serviceInstance = Container.get(productService);
        const ids = req.body.ids;
		await serviceInstance.deleteCollection(ids);
        return res.status(200).send();
    })

};
