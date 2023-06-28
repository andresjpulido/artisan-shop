import { Service, Inject } from "typedi";
import { IntegerDataType, Op } from "sequelize";
import model from "../models";

@Service()
export default class rolService {
  constructor() {}

  public async getAll(queryObj) {
    const { rol } = model;

    return rol.findAll({
      where: queryObj,
      include: [],
      order: [["id"]],
    });
  }

  public async getOne(id: any) {
    const { rol } = model;

    return rol.findOne({
      where: {
        id: id,
      },
      include: [],
      order: [["id"]],
    });
  }

  public async delete(id: any) {
    const { rol } = model;

    const entry = await rol.findOne({ where: { id: id } });
    return await entry.destroy();
  }

  public async updateById(rolObj: any) {
    const { rol } = model;

    let where = {
      id: rolObj.id,
    };

    return await rol.update(rolObj, { where });
  }

  public async create(rolObj: any) {
    const { rol } = model;

    return rol.create(rolObj, {
      include: [],
    });
  }
}
