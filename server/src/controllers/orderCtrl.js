'use strict'

import status from '../api/routers/status';
import model from '../models/index'
import productImage from '../models/productImage';
import pais from './test.json'

const { order, customer, status, product, productImage, image } = model;

class Order {

  static getAll(req, res) {
 
    let queryParams = null;

    if (req.query && req.query.status) {
      if (req.query.status === "opened") {

        queryParams = {
          id_orderStatus: 1
        }

      } else {
        queryParams = {
          id_orderStatus: req.query.status
        }
      }
 
    } 

    return order.findAll(
      {
        where: queryParams,
        include: [
          customer,
          status
        ],
        order: [
          ['id']
        ]
      },
    ).then(order => res.status(200).send(order));
  }

  static getOpened(req, res) {
    const { Op } = require("sequelize");
    return order.findAll(
      {
        where: {
          [Op.or]: [
            { id_orderStatus: 1 },
            { id_orderStatus: 3 }
          ]
        },
        include: [
          customer,
          status
        ],
        order: [
          ['id']
        ]
      },
    ).then(order => res.status(200).send(order));
  }

  static create(req, res) {

    console.log("req.body::", req.body)

    const { id_customer, products, deliveryDate, description } = req.body
    const { userId } = req.params

    const orderObj = {
      id_customer: id_customer,
      deliveryDate: deliveryDate,
      description: description,
      products: products
    };

    console.log("orderObj ::> ", [products[0].images[0]]);


    return order
      .create(orderObj, {
        include: [{
          association: 'products',
          include: ['images']
        }]
      })
      .then(response => res.status(200).send(response))
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


  static put(req, res) {
    return res.status(200).send(req.body);
  }

  static getOrder(req, res) {

    const id = req.params.id;

    return order.findOne(
      {
        where: {
          id: id
        },
        include: [
          customer,
          status, { model: product, as: 'products' }, {
            association: 'products',
            include: ['images']
          }
        ],
        order: [
          ['id']
        ]
      },
    ).then(order => res.status(200).send(order));
  }



}

export default Order;