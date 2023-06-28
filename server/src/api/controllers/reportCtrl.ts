'use strict'
import { Request, Response, NextFunction } from "express";
import model from '../../models/index'


var Sequelize = require("sequelize");
const { QueryTypes } = require('sequelize');
const { movementModel, size, productType, operation } = model;

class Reports {

    static production(req: Request, res: Response, next: NextFunction) {
        //return res.status(200).send(data)  ;

        const startDate = req.query.startDate
        const lastDate = req.query.lastDate

        movementModel.sequelize.query(
            'SELECT firstdayofweek(m."createdAt"), lastdayofweek(m."createdAt"), pt.name, amount FROM movement m  inner join "productType" pt on pt.id = m."id_productType" WHERE id_operation = :id_operation and m."createdAt" between :startDate and :lastDate ',
            {
              replacements: { id_operation: 1 , startDate, lastDate},
              type: QueryTypes.SELECT
            }

          ).then(movement => res.status(200).send(movement))
    }

}

export default Reports;