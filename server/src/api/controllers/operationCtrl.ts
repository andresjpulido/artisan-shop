'use strict'
import { Request, Response, NextFunction } from "express";
import model from '../../models/index'

const { operation } = model;

class Operation {
  	  
  static findAll(req: Request, res: Response, next: NextFunction) { 
    return operation.findAll().then(operation => res.status(200).send(operation));
  }
 
}

export default Operation;