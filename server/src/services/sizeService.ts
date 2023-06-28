import { Service, Inject } from "typedi";
import { IntegerDataType, Op } from "sequelize";
import model from "../models";

@Service()
export default class sizeService {
  public async get(queryObj) {

    const { size } = model;

    return await size.findAll({
      where: queryObj,
      include: [],
      order: [["id"]],
    }); 

  }
  
}
