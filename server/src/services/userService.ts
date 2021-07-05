import { Service, Inject } from "typedi";
import { IntegerDataType, Op } from "sequelize";
import model from "../models";

@Service()
export default class userService {
	constructor() {}

	public async getAll(queryObj) {
		const { user } = model;

		try {
			return user.findAll({
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
		const { user } = model;

		try {
			return user.findOne({
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
		const { user } = model;

		try {
			const cus = await user.findOne({ where: { id: id } });
			await cus.destroy();
		} catch (e) {
			console.log(e);
			return {};
		}
	}

	public async update(userObj: any) {
		const { user } = model;

		await user.update(userObj, {
			where: {
				id: userObj.id,
			},
		});
	}

	public async updatePassword(userObj: any) {
		const { user } = model;

		decrypted
		
		await user.update(userObj, {
			where: {
				id: userObj.id,
			},
		});
	}

	public async create(userObj: any) {
		const { user } = model;

		try {
			return user.create(userObj, {
				include: [],
			});
		} catch (e) {
			console.log(e);
			return {};
		}
	}
}
