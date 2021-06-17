'use strict'
 
import model from '../models/index'

const { inventoryModel, size, productType } = model;

class Inventory {
/* 
TODO agregar la transaccion para ingresar primero el movimiento y despues hacer la actualizacion en el inventario 
*/
  static createEntry(req, res) {

    console.log("req.body::" , req.body)
    const { amount, idSize, idProductType } = req.body
    const { userId } = req.params

    const inventoryModelObj = {
      amount: amount, 
      id_size: idSize, 
      id_productType: idProductType
    };
     
    return inventoryModel
      .create(inventoryModelObj)
      .then(inv => res.status(201).send({
        message: `inventory ${inv.id} has been created successfully `,
        inv
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
  }

/*
TODO Agregar metodo para obtener el historial de todos los movimientos generados en un periodo en particular
*/
  static findAll(req, res){
    return inventoryModel.findAll(
      {
        include:[size, productType],
        order: [
          [productType, 'name', 'ASC'],
          [size, 'name', 'ASC']
        ]
      },
      ).then(inventory => res.status(200).send(inventory))
      .catch(function (err) {
        console.log(" se petaquio esta joda", err)
        return res.status(500).send({
          success: 'false',
          code: "CODE",
          message: 'Error' + err
        })
      }
      )
  }

}

export default Inventory;