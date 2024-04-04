"use strict";
import { Request, Response, NextFunction } from "express";
import { Container } from "typedi";
import parameterservice from "../../services/parameterService";

export default class Parameter {
  static async get(req: Request, res: Response, next: NextFunction) {
    const queryObj = req.query;
    let list = [];

    try {
      const userInstance = Container.get(parameterservice);
      list = await userInstance.get(queryObj);
    } catch (error) {
      return next(error);
    }
    return res.status(200).json(list);
  }
}
