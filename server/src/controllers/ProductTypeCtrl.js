'use strict'

import model from '../models/index'

const { productType } = model;

class ProductType {

  static findAll(req, res) {
    return productType.findAll(
      {
        order: [
          ['name']
        ]
      },
    ).then(productType => res.status(200).send(productType));
  }


  static findOne(req, res) {
    return productType.findOne({
      where: {
        id: req.params.id,
      }
    },
    ).then(productType => res.status(200).send(productType));
  }


  static create(req, res) {

    const { name } = req.body

    if (name == null || name === "") {
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



  static async deleteCollection(req, res) {
    const ids = req.body.ids;
    const { productType } = model;

    try {
      await productType.destroy({ where: { id: ids } });
      return res.status(200).send();

    } catch (e) {
      console.log(e);
      return {};
    }

  }


  static async update(req, res) {
    let productypeObj = req.body; 

    try {

      await productType.update(productypeObj, {
        where: {
          id: productypeObj.id
        }
      })

      return res.status(200).send();

    } catch (e) {
      console.log(e);
      return {};
    }
  }

}

export default ProductType;