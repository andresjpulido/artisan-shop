'use strict'
import { Request, Response, NextFunction } from "express";
//import model from '../models/index' 

//const { user } = model;

class Group{
    
    static async create(req: Request, res: Response, next: NextFunction) {

        const { first_name, last_name, movil, address } = req.body
        const { userId } = req.params

        return res.status(200).send("OK")
    }
 
    static modify(req, res) {
         
    }
      
}

export default Group;