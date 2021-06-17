
'use strict'

import model from '../models/index'

const { parameter } = model;

class Parameter {
  	  
  static findAll(req, res) {     
    return parameter.findAll().then(param => res.status(200).send(param));
  }
 
}

export default Parameter;