'use strict'

const services = require('../services')

function isAuth (req, res, next) {

  if (!req.headers.authorization) {
    return res.status(403).send({ message: 'No tienes autorización' })
  }

  const token = req.headers.authorization.split(' ')[1]

  services.decodeToken(token)
    .then(response => {
      req.user = response
      next()
    })
    .catch(response => { 
      return res.status(response.status).send({ code: response.code, message: 'No tienes autorización' })
       
    })
}

module.exports = isAuth
