'use strict'
 
import model from '../db/models/index'

const { order, customer } = model;

class Order {
  
  static getAll(req, res){
    return order.findAll(
      { 
        include:[
          customer
        ],
        order: [
          [ 'id' ]          
        ]
      },
      ).then(order => res.status(200).send(order));
  }

  static getOpened(req, res){
    const { Op } = require("sequelize");
    return order.findAll(
      { 
        where: {
          [Op.or]: [
            { id_orderStatus: 1 },
            { id_orderStatus: 3 }
        ]},
        include:[
          customer
        ],
        order: [
          [ 'id' ]          
        ]
      },
      ).then(order => res.status(200).send(order));
    }

}

export default Order;