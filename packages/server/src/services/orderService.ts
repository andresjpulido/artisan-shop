import { Service, Inject } from "typedi";
import { IntegerDataType, Op } from "sequelize";
import model from "../models";

@Service()
export default class orderService {
  public async getAll(queryObj) {
    const { order, customer, status } = model;

    return await order.findAll({
      where: queryObj,
      include: [customer, status],
      order: [["id"]],
    });
  }

  public async getAllAutocomplete(queryObj) {
    const { order, customer, status } = model;

    return await order.findAll({
      include: [customer],
      order: [["id"]],
    });
  }

  public async getOne(id: any) {
    const { order, customer} = model;

    return order.findOne({
      where: {
        id: id,
      },
      include: [customer],
      order: [["id"]],
    });
  }

  public async delete(id: any) {
    const { order } = model;

    const cus = await order.findOne({ where: { id: id } });
    return await cus.destroy();
  }

  public async update(updateObj: any) {
    const { order } = model;

    return await order.update(updateObj, {
      where: {
        id: updateObj.id,
      },
    });
  }

  public async create(orderObj: any) {
    const { order, product } = model;

    return order.create(orderObj, {
      include: ["products"],
    });
  }
}
