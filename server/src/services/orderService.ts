import { Service, Inject } from "typedi";
import { IntegerDataType, Op } from "sequelize";
import model from "../models";

@Service()
export default class orderService {
  public async getAll(queryObj) {
 
    const { order } = model;

    return await order.findAll({
      where: queryObj,
      include: [],
      order: [["id"]],
    });
  }

  public async getAllAutocomplete(queryObj) {
    const { order } = model;
    return await order.findAll({
      include: [],
      order: [["id"]],
    });
  }

  public async getOne(id: any) {
    const { order } = model;

    return order.findOne({
      where: {
        id: id,
      },
      include: [],
      order: [["id"]],
    });
  }

  public async delete(id: any) {
    const { order } = model;

    const cus = await order.findOne({ where: { id: id } });
    return await cus.destroy();
  }

  public async update(customerObj: any) {
    const { customer } = model;

    return await customer.update(customerObj, {
      where: {
        id: customerObj.id,
      },
    });
  }

  public async create(customerObj: any) {
    const { order } = model;

    return order.create(customerObj, {
      include: [],
    });
  }
}
