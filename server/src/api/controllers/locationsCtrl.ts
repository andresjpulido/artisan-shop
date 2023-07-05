"use strict";
import { Request, Response, NextFunction } from "express";
import { Container } from "typedi";
import service from "../../services/locationService";

export default class Locations {
  static async findById(req: Request, res: Response, next: NextFunction) {
    let item = null;
    try {
      const instance = Container.get(service);
      const id = req.params.id;
      item = await instance.getById(id);
    } catch (error) {
      return next(error);
    }

    return res.status(200).json(item);
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    let newEntry = req.body;
    try {
      const instance = Container.get(service);
      newEntry = await instance.create(newEntry);
    } catch (error) {
      return next(error);
    }

    return res.status(200).json(newEntry);
  }

  static async findAll(req: Request, res: Response, next: NextFunction) {
    const queryObj = req.query;
    let list = [];

    try {
      const instance = Container.get(service);

      if (queryObj.autocomplete === "true")
        list = await instance.getAllAutocomplete(queryObj);
      else list = await instance.get(queryObj);
    } catch (error) {
      return next(error);
    }

    return res.status(200).json(list);
  }

  static async modify(req: Request, res: Response, next: NextFunction) {
    let updatedRows = 0;

    try {
      const instance = Container.get(service);
      updatedRows = await instance.update(req.body);
    } catch (error) {
      return next(error);
    }

    return res.status(200).json(updatedRows);
  }

  static async remove(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    let deletedRows = 0;
    try {
      const instance = Container.get(service);
      deletedRows = await instance.delete(id);
    } catch (error) {
      return next(error);
    }

    return res.status(200).json(deletedRows);
  }

  static async deleteCollection(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const ids = req.body.ids;
    let deletedRows = 0;

    const instance = Container.get(service);

    deletedRows = await instance.deleteCollection(ids);
    return res.status(200).send(deletedRows);
  }
}
