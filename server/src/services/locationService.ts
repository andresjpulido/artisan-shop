import { Service, Inject } from "typedi";
import model from "../models";
const { Op } = require("sequelize");

@Service()
export default class locationService {
	public async create(locationObj) {
		const { location } = model;
		return await location.create(locationObj);
	}

	public async getAll(queryObj) {
		console.log("queryObj", queryObj);
		const { location } = model;
		return await location.findAll({
			where: queryObj,
			include: [],
			order: [["id"]],
		});
	}

	public async getAllAutocomplete(queryObj) {
		console.log("queryObj", queryObj);
		const { location } = model;
		return await location.findAll({
			where: queryObj,
			include: [],
			order: [["id"]],
		});
	}

	public async getOne(id) {
		const { location } = model;
		return await location.findOne({
			where: {
				id: id,
			},
		});
	}

	public async update(locationObj) {
		const { location } = model;
		await location.update(locationObj, {
			where: {
				id: locationObj.id,
			},
		});
	}

	public async delete(id: any) {
		const { location } = model;

		try {
			const cus = await location.findOne({ where: { id: id } });
			await cus.destroy();
		} catch (e) {
			console.log(e);
			return {};
		}
	}

	public async deleteCollection(ids) {
		const { location } = model;
		try {
			await location.destroy({ where: { id: ids } });
		} catch (e) {
			console.log(e);
			return {};
		}
	}
}
