'use strict'

import model from '../models/index'

const { operation } = model;

class Operation {
  	  
  static findAll(req, res) { 
    return operation.findAll().then(operation => res.status(200).send(operation));
  }
 
}

export default Operation;