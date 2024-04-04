import { Service, Inject } from "typedi";
import { IntegerDataType, Op } from "sequelize";
import model from "../models";

@Service()
export default class noteService {
  public async getAll(queryObj) {
    const { note, customer, status } = model;

    return await note.findAll({
      where: queryObj,
      include: [],
      order: [["id"]],
    });
  }

  public async getAllAutocomplete(queryObj) {
    const { note } = model;
    return await note.findAll({
      include: [],
      order: [["id"]],
    });
  }

  public async getById(id: any) {
    const { note } = model;

    return note.findOne({
      where: {
        id: id,
      },
      include: [],
      order: [["id"]],
    });
  }

  public async getByOrderId(id: any) {
    const { note } = model;

    return note.findOne({
      where: {
        id_order: id,
      },
      include: [],
      order: [["id"]],
    });
  }

  public async delete(id: any) {
    const { note } = model;

    const cus = await note.findOne({ where: { id: id } });
    return await cus.destroy();
  }

  public async update(customerObj: any) {
    const { note } = model;

    return await note.update(customerObj, {
      where: {
        id: customerObj.id,
      },
    });
  }

  public async create(customerObj: any) {
    const { note } = model;

    return note.create(customerObj, {
      include: [],
    });
  }

  public async deleteCollection(ids) {
    const { note } = model;

    return await note.destroy({ where: { id: ids } });
  }
}
