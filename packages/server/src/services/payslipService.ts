import { Service, Inject } from "typedi";
import model from "../models";

@Service()
export default class payslipService {
  public async get(queryObj) {
    const { payslip } = model;

    return payslip.findAll({
      where: queryObj,
      include: [],
      order: [["id"]],
    });
  }

  public async getAllHoursByEmployeeId(id: Number) {
    const { payslip } = model;

    return payslip.findAll({
      where: {
        employeeid: id,
      },
    });
  }

  public async getById(id: Number) {
    const { payslip, employee } = model;

    return payslip.findOne({
      where: {
        id: id,
      },
      include: [employee],
      order: [["id"]],
    });
  }

  public async delete(id: any) {
    const { payslip } = model;

    const cus = await payslip.findOne({ where: { id: id } });
    await cus.destroy();
  }

  public async update(customerObj: any) {
    const { payslip } = model;

    return await payslip.update(customerObj, {
      where: {
        id: customerObj.id,
      },
    });
  }

  public async create(customerObj: any) {
    const { payslip } = model;

    return payslip.create(customerObj, {
      include: [],
    });
  }
}
