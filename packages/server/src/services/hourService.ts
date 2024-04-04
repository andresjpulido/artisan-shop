import { Service, Inject } from "typedi";
import model from "../models";

@Service()
export default class customerService {
  public async create(hourObj) {
    const { hour } = model;
    return hour.create(hourObj);
  }

  public async get(queryObj) {
    const { hour } = model;
    return hour.findAll({
      where: queryObj,
      include: [],
      order: [["id"]],
    });
  }

  public async getAllAutocomplete(queryObj) {
    const { hour } = model;
    return await hour.findAll({
      include: [],
      order: [["id"]],
    });
  }

  public async getAllbyPayslipId(payslipid) {
    const { hour, employee } = model;
    return hour.findAll({
      where: { payslipid: payslipid },
      include: [employee],
    });
  }

  public async getById(id) {
    const { hour } = model;
    return hour.findOne({
      where: {
        id: id,
      },
    });
  }

  public async getHoursByUserUsername(username) {
    const { hour } = model;
    return await hour.sequelize.query(
      'select h.* from hour h inner join employee e on h.id_emp = e.id inner join "user" u on e.id = u.id_employee where u.username = ? ',
      {
        replacements: [username],
        type: hour.sequelize.QueryTypes.SELECT,
      }
    );
  }

  public async delete(id) {
    const { hour } = model;
    return await hour.findOne({ where: { id: id } });
  }

  public async deleteCollection(ids) {
    const { hour } = model;

    try {
      return await hour.destroy({ where: { id: ids } });
    } catch (e) {
      console.log(e);
      return {};
    }
  }

  public async update(hourObj: any) {
    const { hour } = model;
    console.log(hourObj);
    await hour.update(hourObj, {
      where: {
        id: hourObj.id,
      },
    });
  }
}
