const authRouter = require('express').Router()
const passport = require('passport')
const token = require('../utils/authentication/token')
require('../utils/authentication/jwt')
require('../utils/authentication/google')
// require('../utils/authentication/facebook')

function generateUserJWTAndRedirect(req, res) {
  const accessJWT = token.generateAccessJWT(req.user.id)

  res
    .status(200)
    .redirect(`http://localhost:3001/login?token=${accessJWT}`)
}

authRouter.get('/google/start',
  passport.authenticate('google', { session: false, scope: ['openid', 'profile', 'email'] }))
authRouter.get('/google/redirect',
  passport.authenticate('google', { session: false }),
  generateUserJWTAndRedirect)

module.exports = authRouter