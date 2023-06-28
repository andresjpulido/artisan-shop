"use strict";
import { Request, Response, NextFunction } from "express";
import { Container } from "typedi";
import productTypeService from "../../services/productTypeService";

export default class ProductType {
  static async findAll(req: Request, res: Response, next: NextFunction) {
    const queryObj = req.query;
    let list = [];

    try {
      const instance = Container.get(productTypeService);
      list = await instance.get(queryObj);
    } catch (error) {
      return next(error);
    }
    return res.status(200).json(list);
  }

  static async findOne(req: Request, res: Response, next: NextFunction) {
    let id = req.params.id;
    let item = null;

    try {
      const instance = Container.get(productTypeService);
      const list = await instance.getById(id);
    } catch (error) {
      return next(error);
    }
    return res.status(200).json(item);
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    let Obj = req.body;
    let newEntry = null;

    try {
      const productTypeInstance = Container.get(productTypeService);
      newEntry = await productTypeInstance.create(Obj);
    } catch (error) {
      return next(error);
    }

    return res.status(200).json(newEntry);
  }

  static async deleteCollection(
    req: Request,
    res: Response,
    next: NextFunction
  ) {}

  static async update(req: Request, res: Response, next: NextFunction) {
    let Obj = req.body;
    let updatedRows = 0;

    try {
      const instance = Container.get(productTypeService);
      updatedRows = await instance.update(Obj);
    } catch (error) {
      return next(error);
    }
    return res.status(200).json(updatedRows);
  }
}
