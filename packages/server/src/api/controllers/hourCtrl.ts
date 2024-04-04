"use strict";
import { Request, Response, NextFunction } from "express";
import { Container } from "typedi";
import service from "../../services/hourService";

export default class Hours {
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

  static async getHours(req: Request, res: Response, next: NextFunction) {
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

  static async getHoursById(req: Request, res: Response, next: NextFunction) {
    const instance = Container.get(service);
    const id = req.params.id;
    let item = null;
    try {
      item = await instance.getById(id);
    } catch (error) {
      return next(error);
    }
    return res.status(200).json(item);
  }

  static async getHoursByUserUsername(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    let username = req.params.username;
    const instance = Container.get(service);
    const id = req.params.id;
    let item = null;
    try {
      item = await instance.getHoursByUserUsername(username);
    } catch (error) {
      return next(error);
    }
    return res.status(200).json(item);
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    let deletedRows = 0;
    try {
      const instance = Container.get(service);
      const id = req.params.id;
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
    let deletedRows = 0;
	const ids = req.body.ids;
    try {
      const instance = Container.get(service); 
      deletedRows = await instance.deleteCollection(ids);
    } catch (error) {
      return next(error);
    }
    return res.status(200).json(deletedRows);
  }
}
