'use strict'
import { Request, Response, NextFunction } from "express";
import model from '../../models/index'

const { status } = model;

class Status {
  
  static getAll(req: Request, res: Response, next: NextFunction) {
    return status.findAll(
      { 
        order: [
          ['id']
        ]
      },
      ).then(status => res.status(200).send(status));
  }

}

export default Status;