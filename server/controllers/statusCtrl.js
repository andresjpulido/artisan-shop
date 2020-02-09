'use strict'
 
import model from '../db/models/index'

const { status } = model;

class Status {
  
  static getAll(req, res){
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