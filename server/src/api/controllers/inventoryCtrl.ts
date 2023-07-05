"use strict";
import { Request, Response, NextFunction } from "express";
import { Container } from "typedi";
import service from "../../services/locationService";

export default class Inventory {
  /* 
TODO agregar la transaccion para ingresar primero el movimiento y despues hacer la actualizacion en el inventario 
*/
  static async createEntry(req: Request, res: Response, next: NextFunction) {
    let newEntry = req.body;
    try {
      const instance = Container.get(service);
      newEntry = await instance.create(newEntry);
    } catch (error) {
      return next(error);
    }

    return res.status(200).json(newEntry);
  }

  /*
TODO Agregar metodo para obtener el historial de todos los movimientos generados en un periodo en particular
*/
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
}
