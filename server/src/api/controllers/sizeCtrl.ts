"use strict";
import { Request, Response, NextFunction } from "express";
import { Container } from "typedi";
import sizeService from "../../services/sizeService";

export default class Size {
  static async get(req: Request, res: Response, next: NextFunction) {
    
    const queryObj = req.query;
    const serviceInstance = Container.get(sizeService);
    let list = [];

    try {
      list = await serviceInstance.get(queryObj);
    } catch (error) {
      return next(error);
    }
 
    return res.status(200).json(list);
  }
}
