"use strict";
import { Request, Response, NextFunction } from "express";
import { Container } from "typedi";
import userService from "../../../services/userService";

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
