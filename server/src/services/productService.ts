import { Service, Inject } from "typedi";
import model from "../models";
import db from "../models/index";
import { zfill } from "../utils/util";
const { Op } = require("sequelize");

@Service()
export default class productService {
	public async create(productObj) {
		 
		const { product, productType, size } = model;
		//traer codigos size typeproduct
		const productTypeObj = await productType.findOne({
			where: { id: productObj.id_productType },
		});
		const sizeObj = await size.findOne({ where: { id: productObj.id_size } });
		const lastObj = await product.findOne({
			limit: 1,
			order: [["createdAt", "DESC"]],
			where: {
				id_size: productObj.id_size,
				id_productType: productObj.id_productType,
			},
		});

		//revisar el ultimo
		if (lastObj) {
			console.log("El ultimo codigo para fue " + lastObj.code);
			let codeNumber = parseInt(lastObj.code.substring(6, 12), 10);
			codeNumber = codeNumber + 1;
			let codeString = zfill(codeNumber, 6);
			productObj.code = productTypeObj.code + sizeObj.code + codeString;
		} else {
			console.log(
				"El primer codigo es " + productTypeObj.code + sizeObj.code + "000001"
			);
			productObj.code = productTypeObj.code + sizeObj.code + "000001";
		}

		return await product.create(productObj);
	}

	public async inventory(queryObj) {
		const { QueryTypes } = require("sequelize");

		let sql = `select count(1) as amount, pt.name as product, s.name as size, l.name as location 
from product p inner join size s on p.id_size = s.id 
inner join "productType" pt on p."id_productType" = pt.id 
inner join location l on p.id_location = l.id `;

		if (queryObj.location || queryObj.id_productType || queryObj.id_size)
			sql += `where `;

		if (queryObj.location) {
			sql += `l.id = `;
			sql += queryObj.location;
		}

		sql += ` group by pt.name, s.name, l.name`;

		const records = await db.sequelize.query(sql, {
			type: QueryTypes.SELECT,
		});
		return records;
		//console.log(JSON.stringify(records[0], null, 2));
	}

	public async getAll(queryObj) {
		console.log("queryObj", queryObj);
		const { product, productType, size, location } = model;
		return await product.findAll({
			where: queryObj,
			include: [productType, size, location],
			order: [["id"]],
		});
	}

	public async getAllAutocomplete(queryObj) {
		console.log("queryObj", queryObj);
		const { product } = model;
		return await product.findAll({
			where: {
				[Op.or]: [
					{
						firstName: {
							[Op.iLike]: "%" + queryObj.firstName + "%",
						},
					},
					{
						lastName: {
							[Op.iLike]: "%" + queryObj.lastName + "%",
						},
					},
				],
			},
			include: [],
			order: [["id"]],
		});
	}

	public async getOne(id) {
		const { product } = model;
		return await product.findOne({
			where: {
				id: id,
			},
		});
	}

	public async update(productObj) {
		const { product } = model;
		await product.update(productObj, {
			where: {
				id: productObj.id,
			},
		});
	}

	public async delete(id: any) {
		const { product } = model;

		try {
			const cus = await product.findOne({ where: { id: id } });
			await cus.destroy();
		} catch (e) {
			console.log(e);
			return {};
		}
	}

	public async deleteCollection(ids) {
		const { product } = model;
		try {
			await product.destroy({ where: { id: ids } });
		} catch (e) {
			console.log(e);
			return {};
		}
	}
}
