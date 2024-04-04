import { Service, Inject } from "typedi";
import model from "../models";
const { Op } = require("sequelize");

@Service()
export default class inventoryService {
  public async create(locationObj) {
    const { inventory } = model;
    return await inventory.create(locationObj);
  }

  public async get(queryObj) {
    const { inventory, size, productType } = model;
    return inventory.findAll({
      include: [size, productType],
      where: queryObj,
      order: [
        [productType, "name", "ASC"],
        [size, "name", "ASC"],
      ],
    });
  }

  public async getAllAutocomplete(queryObj) {
  
    const { inventory } = model;
    return await inventory.findAll({
      where: queryObj,
      include: [],
      order: [["id"]],
    });
  }

  public async getById(id) {
    const { inventory } = model;
    return await inventory.findOne({
      where: {
        id: id,
      },
    });
  }

  public async update(locationObj) {
    const { inventory } = model;
    return await inventory.update(locationObj, {
      where: {
        id: locationObj.id,
      },
    });
  }

  public async delete(id: any) {
    const { inventory } = model;

    const cus = await inventory.findOne({ where: { id: id } });
    return await cus.destroy();
  }

  public async deleteCollection(ids) {
    const { inventory } = model;

    return await inventory.destroy({ where: { id: ids } });
  }
}
