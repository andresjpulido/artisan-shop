'use strict'
 
import model from '../db/models/index'

const {  size } = model;

class Size {
  
  static findAll(req, res){
    return size.findAll(
      { 
        order: [
          ['id']
        ]
      },
      ).then(size => res.status(200).send(size));
  }

}

export default Size;