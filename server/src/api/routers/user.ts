import { Router, Request, Response } from "express";
import middlewares from "../middlewares";
import UserCtrl from "../../controllers/admin/userCtrl";
import { Container } from "typedi";
const auth = require("../middlewares/auth");
const route = Router();
import userService from "../../services/userService";

export default (app) => {
	app.get("/users", async (req: Request, res: Response, next) => {
		let query = req.query;
		const userInstance = Container.get(userService);
		try {
			const list = await userInstance.getAll(query);
			return res.status(200).json(list);
		} catch (e) {
			console.log(e);
			return res.status(500).send({ message: e.description });
		}
	});

	app.get("/users/:id", async (req: Request, res: Response, next) => {
		let id = req.params.id;
		const userInstance = Container.get(userService);
		const list = await userInstance.getOne(id);
		return res.json(list);
	});

	app.post("/users", async (req: Request, res: Response, next) => {
		let userObj = req.body;
		const userInstance = Container.get(userService);
		const list = await userInstance.create(userObj);
		return res.json(list);
	});

	app.delete("/users/:id", async (req: Request, res: Response, next) => {
		let id = req.params.id;
		const userInstance = Container.get(userService);
		const list = await userInstance.delete(id);
		return res.json(list);
	});

	app.put("/users", async (req: Request, res: Response, next) => {
		let userObj = req.body;
		const userInstance = Container.get(userService);
		const list = await userInstance.update(userObj);
		return res.json(list);
	});
};