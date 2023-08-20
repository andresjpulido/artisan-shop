"use strict";
import { Request, Response, NextFunction } from "express";
import orderService from "../../services/orderService";
import { Container } from "typedi";
import uploads from "../middlewares/cloudinary";
const fs = require("fs");

export default class Order {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    const queryObj = req.query;
    const serviceInstance = Container.get(orderService);
    let list = [];

    try {
      if (queryObj.autocomplete === "true") {
        list = await serviceInstance.getAllAutocomplete(queryObj);
      } else {
        list = await serviceInstance.getAll(queryObj);
      }
    } catch (error) {
      return next(error);
    }
    return res.status(200).send(list);
  }

  static async getOpened(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    let list = [];
    const serviceInstance = Container.get(orderService);
    try {
      list = await serviceInstance.getOne(id);
    } catch (error) {
      return next(error);
    }

    return res.status(200).send(list);
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    const serviceInstance = Container.get(orderService);
    let newEntry = null;
    try {
      newEntry = await serviceInstance.create(req.body);
    } catch (error) {
      return next(error);
    }
    return res.status(200).json(newEntry);
  }

  static async put(req: Request, res: Response, next: NextFunction) {
    let orderObj = req.body;
    let updatedRows = 0;
    let urls = [];

    try {
      const userInstance = Container.get(orderService);
      updatedRows = await userInstance.update(orderObj);
       /*
      const uploader = async (path: String) => {
        return await uploads(path, "images");
      };

      const files: any = req.files;
      if (files)
        for (const file of files) {
          const { path } = file;
          let newPath = await uploader(path);
          console.log(newPath);
          urls.push(newPath);
          fs.unlinkSync(path);
        }
 */
    } catch (error) {
      return next(error);
    }
    return res.status(200).json(updatedRows);
  }

  static async getOrder(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    let order = {};
    const serviceInstance = Container.get(orderService);
    try {
      order = await serviceInstance.getOne(id);
    } catch (error) {
      return next(error);
    }

    return res.status(200).send(order);
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    let deletedRows = 0;
    try {
      const serviceInstance = Container.get(orderService);
      deletedRows = await serviceInstance.delete(id);
    } catch (error) {
      return next(error);
    }
    return res.json(deletedRows);
  }
}