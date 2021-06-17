'use strict'

const jwt = require('jwt-simple')
const moment = require('moment')

function createToken(user) {

  const payload = {
    sub: user.id,
    iat: moment().unix(),
    exp: moment().add(14, 'days').unix()
  }

  return jwt.encode(payload, process.env.SECRET_TOKEN)

}

function decodeToken(token) {
  const decoded = new Promise((resolve, reject) => {
    try {
      const payload = jwt.decode(token, process.env.SECRET_TOKEN)

console.log(payload)

      if (payload.exp <= moment().unix()) {
        reject({
          status: 401,
          message: 'Token have expired'
        })

      }
      resolve(payload.sub)

    } catch (err) {
      console.log(err)
      reject({
        status: 500,
        message: 'Invalid Token'
      })
    }
  })

  return decoded

}

module.exports = {
  createToken,
  decodeToken
}
