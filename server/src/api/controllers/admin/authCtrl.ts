"use strict";
import { Request, Response, NextFunction } from "express";
import { Container } from "typedi";
import userService from "../../../services/userService";
import authService from "../../../services/authService";
import { isNull } from "lodash";

const service = require("../../services");

export default class Auth {
  static private(req: Request, res: Response, next: NextFunction) {
    console.log(req.body.user);
    return res.status(200).send({ usuario: req.body.user });
  }

  static version(req: Request, res: Response, next: NextFunction) {
    console.log("showing version ... OK");
    return res.status(200).send({ version: "0.1" });
  }

  static async signIn(req: Request, res: Response, next: NextFunction) {
    /*
        (function pausecomp(millis) {
          var date = new Date();
          var curDate = null;
          do { curDate = new Date(); }
          while (curDate - date < 3000);
        })()*/

    let userObj = req.body;
    let token = null;

    try {
      const authInstance = Container.get(authService);
      const user = await authInstance.singIn(userObj);

      if (user == null) return res.status(404).send({});

      return res.status(201).send(user);
    } catch (error) {
      return next(error);
    }
  }

  static async signUp(req: Request, res: Response, next: NextFunction) {
    let userObj = req.body;
    let token = null;

    try {
      const userInstance = Container.get(userService);
      const newUser = await userInstance.create(userObj);

      if (newUser.id) token = service.createToken(newUser);

      return res.status(201).send({ token });
    } catch (error) {
      return next(error);
    }
  }
}
