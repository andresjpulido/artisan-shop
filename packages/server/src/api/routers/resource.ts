import { Router } from "express"; 
import { Container } from "typedi";
import auth from "../middlewares/auth";
import resourceService from "../../services/resourceService";

export default (app:Router) => {

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
