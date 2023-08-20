import { Service, Inject } from "typedi";
import { IntegerDataType, Op } from "sequelize";
import model from "../models";

@Service()
export default class depositService {
  public async getAll(queryObj) {
    const { deposit, customer, status } = model;

    return await deposit.findAll({
      where: queryObj,
      include: [],
      order: [["id"]],
    });
  }

  public async getAllAutocomplete(queryObj) {
    const { deposit } = model;
    return await deposit.findAll({
      include: [],
      order: [["id"]],
    });
  }

  public async getById(id: any) {
    const { deposit } = model;

    return deposit.findOne({
      where: {
        id: id,
      },
      include: [],
      order: [["id"]],
    });
  }

  public async getByOrderId(id: any) {
    const { deposit } = model;

    return deposit.findOne({
      where: {
        id_order: id,
      },
      include: [],
      order: [["id"]],
    });
  }

  public async delete(id: any) {
    const { deposit } = model;

    const cus = await deposit.findOne({ where: { id: id } });
    return await cus.destroy();
  }

  public async update(customerObj: any) {
    const { deposit } = model;

    return await deposit.update(customerObj, {
      where: {
        id: customerObj.id,
      },
    });
  }

  public async create(customerObj: any) {
    const { deposit } = model;

    return deposit.create(customerObj, {
      include: [],
    });
  }

  public async deleteCollection(ids) {
    const { deposit } = model;

    return await deposit.destroy({ where: { id: ids } });
  }
}
