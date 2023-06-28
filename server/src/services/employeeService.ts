import { Service, Inject } from "typedi";
import model from "../models";
const { Op } = require("sequelize");

@Service()
export default class employeeService {
  public async create(employeeObj) {
    const { employee } = model;
    return await employee.create(employeeObj);
  }

  public async getAll(queryObj) {
    const { employee } = model;
    return await employee.findAll({
      where: queryObj,
      include: [],
      order: [["id"]],
    });
  }

  public async getAllAutocomplete(queryObj) {
    const { employee } = model;
    return await employee.findAll({
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
    const { employee } = model;
    return await employee.findOne({
      where: {
        id: id,
      },
    });
  }

  public async update(employeeObj) {
    const { employee } = model;
    return await employee.update(employeeObj, {
      where: {
        id: employeeObj.id,
      },
    });
  }

  public async delete(id: any) {
    const { employee } = model;

    const cus = await employee.findOne({ where: { id: id } });
    return await cus.destroy();
  }

  public async deleteCollection(ids) {
    const { employee } = model;

    return await employee.destroy({ where: { id: ids } });
  }
}
