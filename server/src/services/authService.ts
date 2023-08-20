import { Service, Inject } from "typedi";
import { IntegerDataType, Op } from "sequelize";
import model from "../models";
import publickey from "./privatekey";
import service from "../utils/jwt";

@Service()
export default class authService {
  constructor() {}

  public async singIn(queryObj) {
    const { user } = model;

    let username = queryObj.username;
    let password = queryObj.password;

    console.log(publickey);
    const NodeRSA = require("node-rsa");
    const key = new NodeRSA(publickey);
    const encrypted = password;
    const decrypted = key.decrypt(encrypted, "utf8");

    console.log(decrypted);

    let userObj = await user.findOne({
      include: [model.employee],
      where: {
        username: username,
        password: decrypted,
      },
    });

    if (!userObj) return null;

    if (userObj) {
      let lastlogin = new Date();
      user.update(
        { lastlogin },
        {
          where: {
            id: userObj.id,
          },
        }
      );
    }

    let token = service.createToken(userObj.id, username);

    return {
      token: token,
      username: username,
      lastlogin: userObj.lastlogin,
      employee: userObj.employee,
      id: userObj.employee.id,
    };
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
