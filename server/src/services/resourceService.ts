import { Service, Inject } from "typedi";
import { IntegerDataType, Op } from "sequelize";
import model from "../models";

@Service()
export default class resourceService {
	constructor() {}

	public async getAll(queryObj) {
		const { resource } = model;

		try {
			return resource.findAll({
                where: queryObj,
				include: [],
				order: [["id"]],
			});
		} catch (e) {
			console.log(e);
			return {};
		}
	}

	 
}
