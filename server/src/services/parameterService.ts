import { Service, Inject } from "typedi";
import model from "../models";

@Service()
export default class parameterService {
  constructor() {}

  public async get(queryObj) {
    const { parameter } = model;

    return await parameter.findAll({
      where: queryObj,
      include: [],
      order: [["id"]],
    });
  }

  public async getOne(id: any) {
    const { parameter } = model;

    return parameter.findOne({
      where: {
        id: id,
      },
      include: [],
      order: [["id"]],
    });
  }
}
