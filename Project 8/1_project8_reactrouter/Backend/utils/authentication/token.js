const jwt = require('jsonwebtoken')
const config = require('../config')

// Generate an Access Token for the given User ID
function generateAccessJWT(userId) {
  // How long will the token be valid for
  const expiresIn = '1 hour'
  // Which service issued the token
  const issuer = config.get('authentication.token.issuer')
  // Which service is the token intended for
  const audience = config.get('authentication.token.audience')
  // The signing key for signing the token
  const secret = config.get('authentication.token.secret')

  const token = jwt.sign({}, secret, {
    expiresIn: expiresIn,
    audience: audience,
    issuer: issuer,
    subject: userId.toString()
  })

  return token
}

module.exports = {
  generateAccessJWT
}