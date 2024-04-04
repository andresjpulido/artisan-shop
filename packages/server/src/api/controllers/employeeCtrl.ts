"use strict";
import { Request, Response, NextFunction } from "express";
import { Container } from "typedi";
import employeeService from "../../services/employeeService";

export default class Employees {
  static async findOne(req: Request, res: Response, next: NextFunction) {
    let newEntry = null;
    try {
      const serviceInstance = Container.get(employeeService);
      const id = req.params.id;
      newEntry = await serviceInstance.getOne(id);
    } catch (error) {
      return next(error);
    }

    return res.status(200).json(newEntry);
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    let newEntry = null;
    const {
      firstName,
      lastName,
      movil,
      address,
      typeDocument,
      document,
      birthDate,
      ird,
      email,
      position,
      bankName,
      accountNumber,
    } = req.body;
    const { userId } = req.params;

    const employeeObj = {
      firstName: firstName,
      lastName: lastName,
      movil: movil,
      address: address,
      typeDocument: typeDocument,
      document: document,
      birthDate: birthDate,
      ird: ird,
      email: email,
      position: position,
      bankName: bankName,
      accountNumber: accountNumber,
    };
    try {
      const serviceInstance = Container.get(employeeService);
      newEntry = await serviceInstance.create(employeeObj);
    } catch (error) {
      return next(error);
    }

    return res.status(200).json(newEntry);
  }

  static async findAll(req: Request, res: Response, next: NextFunction) {
    const queryObj = req.query;
    let list = [];

    try {
      const serviceInstance = Container.get(employeeService);

      if (queryObj.autocomplete === "true")
        list = await serviceInstance.getAllAutocomplete(queryObj);
      else list = await serviceInstance.getAll(queryObj);
    } catch (error) {
      return next(error);
    }

    return res.status(200).json(list);
  }

  static async modify(req: Request, res: Response, next: NextFunction) {
    let updatedRows = 0;
    try {
      const serviceInstance = Container.get(employeeService);
      updatedRows = await serviceInstance.update(req.body);
    } catch (error) {
      return next(error);
    }

    return res.status(200).json(updatedRows);
  }

  static async remove(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    let deletedRows = 0;
    try {
      const serviceInstance = Container.get(employeeService);
      deletedRows = await serviceInstance.delete(id);
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

    const serviceInstance = Container.get(employeeService);

    deletedRows = await serviceInstance.deleteCollection(ids);
    return res.status(200).send(deletedRows);
  }
}
