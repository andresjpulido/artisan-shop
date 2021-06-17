import { Service, Inject } from "typedi";
import { IntegerDataType, Op } from "sequelize";
import model from "../models";

@Service()
export default class customerService {
	constructor() {}

	public async getAll() {
		const { customer } = model;

		try {
			return customer.findAll(
				{
					include: [],
					order: [
						['id']
					]
				},
			)
		} catch (e) {
			console.log(e);
			return {};
		}
	}

	public async getOne(id:any) {
		const { customer } = model;

		try {
			return customer.findOne(
				{
					where: {
						id: id
					},
					include: [],
					order: [
						['id']
					]
				},
			)
		} catch (e) {
			console.log(e);
			return {};
		}
	}

	public async delete(id:any) {
        const { customer } = model;

		try {
			const cus = await customer.findOne({ where: { id: id } });
            await cus.destroy();
 
		} catch (e) {
			console.log(e);
			return {};
		}
    }

	public async update(customerObj: any) {
		const { customer } = model;
		console.log(customerObj)
        await customer.update(customerObj, {
			where: {
			  id: customerObj.id
			}
		  });
    }

	public async create(customerObj: any) {

		const { customer } = model;
        
		console.log(customerObj)

		try {
			return customer
            .create(customerObj, {
                include: []
            })
 
		} catch (e) {
			console.log(e);
			return {};
		}
    }

}
