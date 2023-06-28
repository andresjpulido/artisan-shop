"use strict";
import { Request, Response, NextFunction } from "express";
import { Container } from "typedi";
import customerService from "../../services/customerService";

export default class Customer {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    const queryObj = req.query;
    let list = [];

    try {
      const serviceInstance = Container.get(customerService);

      if (queryObj.autocomplete === "true")
        list = await serviceInstance.getAllAutocomplete(queryObj);
      else list = await serviceInstance.getAll(queryObj);
    } catch (error) {
      return next(error);
    }
    return res.status(200).json(list);
  }

  static async getOne(req: Request, res: Response, next: NextFunction) {
    const serviceInstance = Container.get(customerService);
    const id = req.params.id;
    let item = null;
    try {
      item = await serviceInstance.getOne(id);
    } catch (error) {
      return next(error);
    }
    return res.status(200).json(item);
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    const serviceInstance = Container.get(customerService);
    const list = await serviceInstance.create(req.body);
    return res.json(list);
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    let updatedRows = 0;
    try {
      const serviceInstance = Container.get(customerService);
      updatedRows = await serviceInstance.update(req.body);
    } catch (error) {
      return next(error);
    }
    return res.status(200).json(updatedRows);
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    let deletedRows = 0;
    try {
      const serviceInstance = Container.get(customerService);
      const id = req.params.id;
      deletedRows = await serviceInstance.delete(id);
    } catch (error) {
      return next(error);
    }
    return res.status(200).json(deletedRows);
  }
}
