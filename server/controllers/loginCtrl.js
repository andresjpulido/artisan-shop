'use strict'

const User = require('../db/models/user')
const service = require('../services')

function signUp (req, res) {
  const user = new User({
    username: req.body.username,
    displayName: req.body.displayName,
    password: req.body.password
  })

  user.save((err) => {
    if (err) 
      return res.status(500).send({ message: `Error al crear el usuario: ${err}` })

    return res.status(201).send({ token: service.createToken(user) })
  })
}
/*
function signIn (req, res) {

  User.ok({ email: req.body.email }, (err, user) => {
    if (err) 
      return res.status(500).send({ message: err })

    if (!user) 
      return res.status(404).send({ message: 'No existe el usuario' })

    req.user = user
    res.status(200).send({
      message: 'Te has 
      logueado correctamente',
      token: service.createToken(user)
    })
  })
}*/


function signIn (req, res) {

  User.ok({ username: req.body.username }, (err, user) => {

console.log("ingressando al metdo signin")

    if (err) 
      return res.status(500).send({ message: err })

    if (!user) 
      return res.status(404).send({ message: 'No existe el usuario' })

    console.log("El valor de user " , user)
      
    //req.user = user
    res.status(200).send({
      message: 'Te has logueado correctamente',
      token: service.createToken(user)
    })
  })

} 



module.exports = {
  signUp,
  signIn
}
