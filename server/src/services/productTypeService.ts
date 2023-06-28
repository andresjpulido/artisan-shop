import { Service, Inject } from "typedi";
import model from "../models";

const { Op } = require("sequelize");

@Service()
export default class productService {
  public async create(productObj) {
    const { productType } = model;

    return productType.create(productObj, {
      include: [],
    });
  }

  public async get(queryObj) {
    const { productType } = model;

    return await productType.findAll({
      where: queryObj,
      include: [],
      order: [["id"]],
    });
  }

  public async getAllAutocomplete(queryObj) {
    const { productType } = model;
    return await productType.findAll({
      include: [],
      order: [["id"]],
    });
  }

  public async getById(id: any) {
    const { productType } = model;

    return productType.findOne({
      where: {
        id: id,
      },
      include: [],
      order: [["id"]],
    });
  }

  public async delete(id: any) {
    const { productType } = model;

    const cus = await productType.findOne({ where: { id: id } });
    return await cus.destroy();
  }

  public async update(customerObj: any) {
    const { productType } = model;

    return await productType.update(customerObj, {
      where: {
        id: customerObj.id,
      },
    });
  }
}
