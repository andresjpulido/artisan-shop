import { Service, Inject } from "typedi";
import { IntegerDataType, Op } from "sequelize";
import model from "../models";
import {addDays} from '../utils/util';

const { QueryTypes } = require("sequelize");

@Service()
export default class customerService {
	constructor() {}

	public async production(startDate, lastDate) {
		const { movementModel } = model;
//TODO add 1 day to lastDate param

		lastDate = addDays(lastDate, 1)

		try {
			return movementModel.sequelize.query(
				'SELECT firstdayofweek(m."createdAt"), lastdayofweek(m."createdAt"), pt.name, amount FROM movement m  inner join "productType" pt on pt.id = m."id_productType" WHERE id_operation = :id_operation and m."createdAt" between :startDate and :lastDate ',
				{
					replacements: { id_operation: 1, startDate, lastDate },
					type: QueryTypes.SELECT,
				}
			);
		} catch (e) {
			console.log(e);
			return {};
		}
	}
}
