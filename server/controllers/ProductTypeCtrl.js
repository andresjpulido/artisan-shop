'use strict'
 
import model from '../db/models/index'

const { productType } = model;

class ProductType {
  
  static findAll(req, res){
    return productType.findAll(
      { 
        order: [
          ['id']
        ]
      },
      ).then(productType => res.status(200).send(productType));
  }

}

export default ProductType;