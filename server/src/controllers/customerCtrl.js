'use strict'

import status from '../api/routers/status';
import model from '../models/index'

const { customer } = model;

class Customer {

    static getAll(req, res) {
        return customer.findAll(
            {
                include: [
                    customer
                ],
                order: [
                    ['id']
                ]
            },
        ).then(customer => res.status(200).send(customer));
    }

    static getOne(req, res) {
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
            .then(response => res.status(201).send(response))
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


    static update(req, res) {
        return res.status(200).send(req.body);
    }

    static delete(req, res) {
        return res.status(200).send(req.body);
    }

    static get(req, res) {

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

export default Customer;