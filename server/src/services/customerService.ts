import { Service, Inject } from "typedi";
import { IntegerDataType, Op } from "sequelize";
import model from "../models";

@Service()
export default class customerService {
  constructor() {}

  public async getAll(queryObj) {
    const { customer } = model;

    return customer.findAll({
      where: queryObj,
      include: [],
      order: [["id"]],
    });
  }

  public async getAllAutocomplete(queryObj) {
    const { customer } = model;
    return await customer.findAll({
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

  public async getOne(id: any) {
    const { customer } = model;

    return customer.findOne({
      where: {
        id: id,
      },
      include: [],
      order: [["id"]],
    });
  }

  public async delete(id: any) {
    const { customer } = model;

    const cus = await customer.findOne({ where: { id: id } });
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
    const { customer } = model;

    return customer.create(customerObj, {
      include: [],
    });
  }
}
