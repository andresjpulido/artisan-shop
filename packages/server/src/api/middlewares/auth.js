'use strict'

const services = require('../../utils/jwt')

function isAuth (req, res, next) {

  if (!req.headers.authorization) {
    return res.status(401).send({ message: 'The request lacks authorization token' })
  }

  const token = req.headers.authorization.split(' ')[1]

  services.decodeToken(token)
    .then(response => {
      req.user = response
      next()
    })
    .catch(response => { 
      return res.status(401).send({ code: 401, message: 'The request has an invalid authorization token' })
       
    })
}

module.exports = isAuth
