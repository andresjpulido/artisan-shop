import { Service, Inject } from "typedi";
import { IntegerDataType, Op } from "sequelize";
import model from "../models";
import privatekey from "../api/controllers/admin/privatekey";

@Service()
export default class userService {
  constructor() {}

  public async getAll(queryObj) {
    const { user } = model;

    try {
      return user.findAll({
        where: queryObj,
        include: [],
        order: [["id"]],
      });
    } catch (e) {
      console.log(e);
      return {};
    }
  }

  public async getOne(id: any) {
    const { user } = model;

    try {
      return user.findOne({
        where: {
          id: id,
        },
        include: [],
        order: [["id"]],
      });
    } catch (e) {
      console.log(e);
      return {};
    }
  }

  public async delete(id: any) {
    const { user } = model;

    const cus = await user.findOne({ where: { id: id } });
    return await cus.destroy();
  }

  public async update(userObj: any) {
    const { user } = model;

    return await user.update(userObj, {
      where: {
        id: userObj.id,
      },
    });
  }

  public async updatePassword(id, password) {
    const { user } = model;
    let userObj = { id: id, password: password };
    const NodeRSA = require("node-rsa");
    const key = new NodeRSA(privatekey);
    const encrypted = password;
    const decrypted = key.decrypt(encrypted, "utf8");

    //TODO check first if the user exits

    return await user.update(userObj, {
      where: {
        id: userObj.id,
      },
    });
  }

  public async create(userObj: any) {
    const { user } = model;

    return user.create(userObj, {
      include: [],
    });
  }
}
