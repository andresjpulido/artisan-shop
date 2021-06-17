'use strict'

import status from '../api/routers/status';
import model from '../models/index'


const { product,  image } = model;

class Product {

static create(req, res) {

    console.log("req.body::",req.body )

    const productObj = {
      description: req.body.description,
      images: req.body.image
    };

    return product
      .create(productObj, {
        include: [image]
    })
      .then(product => res.status(201).send({
        message: `productObj ${product.id} has been created successfully `,
        product
      }))
      .catch(function (err) {
        console.log(" se petaquio esta joda", err)
        return res.status(500).send({
          success: 'false',
          code: "CODE",
          message: 'Error' + err
        })
      }
      )



    //return res.status(200).send(req.body);
  }



  static getProductById(req, res){

}

static updateProductById(req, res){

}

static deleteProductById(req, res){

}

static getProducts(req, res){

}
}

export default Product;