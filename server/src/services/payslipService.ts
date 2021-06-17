import { Service, Inject } from "typedi";
import model from "../models";

@Service()
export default class payslipService {
	public async getAll(queryObj) {
		const { payslip } = model;

		try {
			return payslip.findAll({
				where: queryObj,
				include: [],
				order: [["id"]],
			});
		} catch (e) {
			console.log(e);
			return {};
		}
	}

	static getAllHoursByEmployeeId(req, res) {
		const { payslip } = model;

		return payslip.findAll({
			where: {
				employeeid: req.params.userid,
			},
		});
	}

	public async getOne(id: any) {
		const { payslip, employee } = model;

		try {
			return payslip.findOne({
				where: {
					id: id,
				},
				include: [employee],
				order: [["id"]],
			});
		} catch (e) {
			console.log(e);
			return {};
		}
	}

	public async delete(id: any) {
		const { payslip } = model;

		try {
			const cus = await payslip.findOne({ where: { id: id } });
			await cus.destroy();
		} catch (e) {
			console.log(e);
			return {};
		}
	}

	public async update(customerObj: any) {
		const { payslip } = model;
		console.log(customerObj);
		await payslip.update(customerObj, {
			where: {
				id: customerObj.id,
			},
		});
	}

	public async create(customerObj: any) {
		const { payslip } = model;

		console.log(customerObj);

		try {
			return payslip.create(customerObj, {
				include: [],
			});
		} catch (e) {
			console.log(e);
			return {};
		}
	}
}
