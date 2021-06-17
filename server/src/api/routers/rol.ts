import { Router, Request, Response } from "express";
import middlewares from "../middlewares";
import { Container } from "typedi";
import rolService from "../../services/rolService";
const auth = require("../middlewares/auth");
const route = Router();


export default (app) => {

	app.get("/roles", async (req: Request, res: Response, next) => {
		let query = req.query;
		const rolInstance = Container.get(rolService);
		try {
			const list = await rolInstance.getAll(query);
			return res.status(200).json(list);
		} catch (e) {
			console.log(e);
			return res.status(500).send({ message: e.description });
		}
	});

	app.get("/roles/:id", async (req: Request, res: Response, next) => {
		let id = req.params.id;
		const rolInstance = Container.get(rolService);
		const list = await rolInstance.getOne(id);
		return res.json(list);
	});

	app.post("/roles", async (req: Request, res: Response, next) => {
		let rolObj = req.body;
		const rolInstance = Container.get(rolService);
		const list = await rolInstance.create(rolObj);
		return res.json(list);
	});

	app.delete("/roles/:id", async (req: Request, res: Response, next) => {
		let id = req.params.id;
		const rolInstance = Container.get(rolService);
		const list = await rolInstance.delete(id);
		return res.json(list);
	});

	app.put("/roles", async (req: Request, res: Response, next) => {
		let rolObj = req.body;
		const rolInstance = Container.get(rolService);
		const list = await rolInstance.update(rolObj);
		return res.json(list);
	});
};
