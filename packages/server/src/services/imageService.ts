import { Service, Inject } from "typedi";
import { IntegerDataType, Op } from "sequelize";
import model from "../models";
import { addDays } from "../utils/util";

const { QueryTypes } = require("sequelize");
const cloudinary = require('cloudinary')

@Service()
export default class imageService {
	constructor() {}

	public async update(imageObj: any) {
		const { image } = model;

		console.log(imageObj)
        try {
			await image.update(imageObj, {
			where: {
			  id: imageObj.id
			}, logging: console.log
		  });
		} catch (e) {
			console.log(e);
			return {
				id: imageObj.id,
				url: imageObj.url
			};
		}
    }

	public async getImage(id) {
		const { image } = model;
		try {
			return image.findOne({
				where: {
					id: id,
				},
			});
		} catch (e) {
			console.log(e);
			return {};
		}
	}

	public async createImage(id, fileData) {
		const { image } = model;

        const orderObj = {
            id_product: id,
            fileData: fileData 
        };

		try {
			return image.create(orderObj);
		} catch (e) {
			console.log(e);
			return {};
		}
	}

}
