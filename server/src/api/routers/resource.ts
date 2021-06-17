import { Router, Request, Response } from "express";
import middlewares from "../middlewares";
import { Container } from "typedi";
const auth = require("../middlewares/auth");
const route = Router();
import resourceService from "../../services/resourceService";

export default (app) => {

	app.get("/resources", async (req: Request, res: Response, next) => {
		let query = req.query;
		const resourceInstance = Container.get(resourceService);
		try {
			const list = await resourceInstance.getAll(query);
			return res.status(200).json(list);
		} catch (e) {
			console.log(e);
			return res.status(500).send({ message: e.description });
		}
	})
	
};
