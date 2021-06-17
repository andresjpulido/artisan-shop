import { Service, Inject } from "typedi";
import { IntegerDataType, Op } from "sequelize";
import model from "../models";

@Service()
export default class rolService {
	constructor() {}

	public async getAll(queryObj) {
		const { rol } = model;

		try {
			return rol.findAll({
                where: queryObj,
				include: [],
				order: [["id"]],
			});
		} catch (e) {
			console.log(e);
			return {};
		}
	}

	public async getOne(id: any) {
		const { rol } = model;

		try {
			return rol.findOne({
				where: {
					id: id,
				},
				include: [],
				order: [["id"]],
			});
		} catch (e) {
			console.log(e);
			return {};
		}
	}

	public async delete(id: any) {
		const { rol } = model;

		try {
			const cus = await rol.findOne({ where: { id: id } });
			await cus.destroy();
		} catch (e) {
			console.log(e);
			return {};
		}
	}

	public async update(rolObj: any) {
		const { rol } = model;

		await rol.update(rolObj, {
			where: {
				id: rolObj.id,
			},
		});
	}

	public async create(rolObj: any) {
		const { rol } = model;

		try {
			return rol.create(rolObj, {
				include: [],
			});
		} catch (e) {
			console.log(e);
			return {};
		}
	}
}
