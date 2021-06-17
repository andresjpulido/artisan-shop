import { Service, Inject } from "typedi";
import model from "../models";

@Service()
export default class employeeService {
	public async create(employeeObj) {
		const { employee } = model;
		return await employee.create(employeeObj);
	}

	public async getAll(queryObj) {
		console.log("queryObj", queryObj);
		const { employee } = model;
		return await employee.findAll({
			where: queryObj,
			include: [],
			order: [["id"]],
		});
	}

	public async getOne(id) {
		const { employee } = model;
		return await employee.findOne({
			where: {
				id: id,
			},
		});
	}

	public async update(employeeObj) {
		const { employee } = model;
		await employee.update(employeeObj, {
			where: {
				id: employeeObj.id,
			},
		});
	}

	public async delete(id: any) {
		const { employee } = model;

		try {
			const cus = await employee.findOne({ where: { id: id } });
			await cus.destroy();
		} catch (e) {
			console.log(e);
			return {};
		}
	}

	public async deleteCollection(ids) {
		const { employee } = model;
		try {
			await employee.destroy({ where: { id: ids } });
		} catch (e) {
			console.log(e);
			return {};
		}
	}
}
