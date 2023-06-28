"use strict";
import { Request, Response, NextFunction } from "express";
import { Container } from "typedi";
import userService from "../../../services/userService";

const service = require("../../services");

export default class Users {
  static async create(req: Request, res: Response, next: NextFunction) {
    let userObj = req.body;
    let newEntry = null;

    try {
      const userInstance = Container.get(userService);
      newEntry = await userInstance.create(userObj);
    } catch (error) {
      return next(error);
    }

    return res.status(200).json(newEntry);
  }

  static async modify(req: Request, res: Response, next: NextFunction) {
    let userObj = req.body;
    let updatedRows = 0;

    try {
      const userInstance = Container.get(userService);
      updatedRows = await userInstance.update(userObj);
    } catch (error) {
      return next(error);
    }
    return res.status(200).json(updatedRows);
  }

  static async changePassword(req: Request, res: Response, next: NextFunction) {
    let id = req.params.id;
    let password = req.body.password;
    let updatedRows = 0;

    try {
      const userInstance = Container.get(userService);
      updatedRows = await userInstance.updatePassword(id, password);
    } catch (error) {
      return next(error);
    }

    return res.status(200).send(updatedRows);
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    let id = req.params.id;
    let deletedRows = 0;

    try {
      const userInstance = Container.get(userService);
      deletedRows = await userInstance.delete(id);
    } catch (error) {
      return next(error);
    }
    return res.json(deletedRows);
  }

  static async findById(req: Request, res: Response, next: NextFunction) {
    let id = req.params.id;
    let item = null;

    try {
      const userInstance = Container.get(userService);
      const list = await userInstance.getOne(id);
    } catch (error) {
      return next(error);
    }
    return res.status(200).json(item);
  }

  static async getAll(req: Request, res: Response, next: NextFunction) {
    const queryObj = req.query;
    let list = [];

    try {
      const userInstance = Container.get(userService);
      list = await userInstance.getAll(queryObj);
    } catch (error) {
      return next(error);
    }
    return res.status(200).json(list);
  }

  /*
  static signUp(req, res) {
    const user = new User({
      email: req.body.email,
      displayName: req.body.displayName,
      password: req.body.password,
    });
    user.save((err) => {
      if (err)
        return res
          .status(500)
          .send({ message: `Error al crear el usuario: ${err}` });

      return res.status(201).send({ token: service.createToken(user) });
    });
  }*/

  static signIn(req: Request, res: Response, next: NextFunction) {
    /*
    (function pausecomp(millis) {
      var date = new Date();
      var curDate = null;
      do { curDate = new Date(); }
      while (curDate - date < 3000);
    })()*/

    /*
    const NodeRSA = require("node-rsa");
    const key = new NodeRSA(privatekey);
    const encrypted = req.body.password;
    const decrypted = key.decrypt(encrypted, "utf8");

    user
      .findOne({
        include: [model.employee],
        where: {
          username: req.body.username,
          password: decrypted,
        },
      })
      .then(
        function (result) {
          console.log("userCtrl.signIn.findAll", result);

          if (result === null) {
            return res
              .status(404)
              .send({ message: "User or password no valid" });
          }
          var i = Object.keys(result).length;

          if (i == 0) {
            return res
              .status(404)
              .send({ message: "User or password no valid" });
          } else {
            let lastlogin = result.lastlogin;
            result.lastlogin = new Date();
            result.save();

            return res.status(200).send({
              token: service.createToken(result.username),
              username: result.username,
              lastlogin: lastlogin,
              employee: result.employee,
              id: result.id,
            });
          }
        }

        */

    /*
      user => res.status(200).send({
      message: 'Te has logueado correctamente',
      token: service.createToken(user[0])
    })*/
    /*  
    )
      .catch(function (err) {
        var code = 1;
        if (err.name == "UniqueConstraintError") {
          code = 1;
        }
        console.log(err);
        console.log("user bd:" + user);
        return res.status(500).send({
          success: "false",
          code: code,
          message: "Error",
        });
      });
*/
    console.log("finaliza");
  }

  static async deleteCollection(
    req: Request,
    res: Response,
    next: NextFunction
  ) {}
}
