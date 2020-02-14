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

  static create(req, res) { 

    const { name } = req.body
 
    if(name == null || name === ""){
      return res.status(500).send({
        success: 'false',
        code: "CODE",
        message: 'The input data does not contain mandatory attributes'  
      })
    }

    const { userId } = req.params

    const producttypeObj = {
      name
    };
     
    return productType
      .create(producttypeObj)
      .then(product => res.status(201).send({
        message: `procuct type ${product.name} has been created successfully `,
        product
      }))
      .catch(function (err) {
        console.log(" Error backEnd", err)
        return res.status(500).send({
          success: 'false',
          code: "CODE",
          message: 'Error' + err
        })
      }
      )
  }

}

export default ProductType;