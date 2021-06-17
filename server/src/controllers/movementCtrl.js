'use strict'
 
import model from '../models/index'
var Sequelize = require("sequelize");

const { movementModel, size, productType, operation } = model;

class Movement {
/* 
TODO agregar la transaccion para ingresar primero el movimiento y despues hacer la actualizacion en el inventario 
*/
  static new(req, res) {

    console.log("req.body::" , req.body)
    const { amount, idSize, idProductType, username, idOperation } = req.body
    const { userId } = req.params
 
    movementModel.sequelize
  .query('CALL movement (:requested_amount, :idSize, :idProductType, :idOperation, :username)', 
        {replacements: { requested_amount: amount, idSize: idSize, idProductType: idProductType, 
          idOperation:idOperation, username:username}})
  .then(movement => res.status(200).send(movement))
  .catch(function (err) {
    console.log(" se petaquio esta joda", err)
    return res.status(500).send({
      success: 'false',
      code: "CODE",
      message: 'Error' + err
    })
  })  
  }


  static report(req, res) {

    console.log("req.body::" , req.body)
    let { date1, date2 } = req.params
    const { userId } = req.params
 
    var dateStr = date1.split("-");
    date1 = dateStr[0]+"/"+dateStr[1]+"/"+dateStr[2];
    dateStr = date2.split("-");
    date2 = dateStr[0]+"/"+dateStr[1]+"/"+dateStr[2];
console.log(date1, date2)
    movementModel.sequelize
  .query('select ot.name as namePiece, s.name as "sizepiece",  sum(mov.amount) as totalPieces from movement mov  inner join "productType" ot on mov."id_productType" = ot."id"  inner join "size" s on mov.id_size = s."id"  where mov."createdAt" >= :date1 and mov."createdAt" <= :date2  group by ot.name, s.name  order by ot.name,s.name', 
          {replacements: { date1: date1, date2: date2}, type:movementModel.sequelize.QueryTypes.SELECT})
  .then(p => {
    console.log("p " , p)
    res.status(200).send(p)})
  .catch(function (err) {
    console.log("Error:", err)
    return res.status(500).send({
      success: 'false',
      code: "CODE",
      message: 'Error' + err
    })
  })
}
  


/*
TODO Agregar metodo para obtener el historial de todos los movimientos generados en un periodo en particular
*/
  static findAll(req, res){
    return movementModel.findAll(
      {
        include:[size, productType, operation],
        order: [
          [productType, 'name', 'ASC'],
          [size, 'name', 'ASC']
        ]
      },
      ).then(movement => res.status(200).send(movement))
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


  static findBetween(req, res){
    console.log("req.body::" , req.params)
    let { date1, date2 } = req.params
    const { userId } = req.params
 
    var dateStr = date1.split("-");
    date1 = dateStr[0]+"/"+dateStr[1]+"/"+dateStr[2];
    var d1 = new Date(dateStr[0],dateStr[1],dateStr[2])
    let yesterday = 1000 * 60 * 60 * 24 *1 ;
    let day = d1.getTime() - yesterday;
    let newDay = new Date(day)
    //date1 = newDay.getFullYear()+"/"+newDay.getMonth()+"/"+newDay.getDate();

    dateStr = date2.split("-");
    date2 = dateStr[0]+"/"+dateStr[1]+"/"+dateStr[2];



var d2 = new Date(dateStr[0],dateStr[1],dateStr[2])

    return movementModel.findAll(
      {
        include:[size, productType, operation],
        order: [
          [productType, 'name', 'ASC'],
          [size, 'name', 'ASC']
        ],
        where: {
            
          "createdAt": {
            [Sequelize.Op.between]: [date1, date2]
          }  
        }
      },
      ).then(movement => {
         
        res.status(200).send(movement)})
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

export default Movement;