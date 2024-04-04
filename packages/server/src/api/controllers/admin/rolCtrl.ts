"use strict";
import { Request, Response, NextFunction } from "express";
import { Container } from "typedi";
import rolService from "../../../services/rolService";

const jwtutil = require("../../../utils/jwt");

export default class RolCtrl {
  static async create(req: Request, res: Response, next: NextFunction) {
    let rolObj = req.body;
    let newEntry = null;

    try {
      const rolInstance = Container.get(rolService);
      newEntry = await rolInstance.create(rolObj);
    } catch (error) {
      return next(error);
    }

    return res.status(200).json(newEntry);
  }

  static async modify(req: Request, res: Response, next: NextFunction) {
    let rolObj = req.body;

    let updatedRows = 0;
    try {
      //TODO verifiy Id
      const rolInstance = Container.get(rolService);
      updatedRows = await rolInstance.updateById(rolObj.id);
    } catch (error) {
      return next(error);
    }
    return res.status(200).json(updatedRows);
  }

  static async find(req: Request, res: Response, next: NextFunction) {
    let query = req.query;
    let list = [];

    try {
      const rolInstance = Container.get(rolService);
      list = await rolInstance.getAll(query);
    } catch (error) {
      return next(error);
    }
    return res.status(200).json(list);
  }

  static async findById(req: Request, res: Response, next: NextFunction) {
    let id = req.params.id;
    let item = null;
    try {
      const rolInstance = Container.get(rolService);
      item = await rolInstance.getOne(id);
    } catch (error) {
      return next(error);
    }
    return res.status(200).json(item);
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    let id = req.params.id;
    let deletedRows = 0;
    try {
      const rolInstance = Container.get(rolService);
      deletedRows = await rolInstance.delete(id);
    } catch (error) {
      return next(error);
    }
    return res.status(200).json(deletedRows);
  }
}
