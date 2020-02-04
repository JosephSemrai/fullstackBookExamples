const passport = require('passport')
const passportJwt = require('passport-jwt')
const config = require('../config')
const User = require('../../models/user')

// var cookieExtractor = function (req) {
//   var token = req.get('Authorization')
//   console.log(token)
//   return token;
// };

const jwtOptions = {
  // Reads JWT from the HTTP Authorization header with the 'bearer' scheme
  jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
  // Secret used to sign the JWT
  secretOrKey: config.authentication.token.secret,
  // Issuer stored in JWT
  issuer: config.authentication.token.issuer,
  // Audience stored in JWT
  audience: config.authentication.token.audience
}


passport.use(new passportJwt.Strategy(jwtOptions, async (payload, done) => {
  // TODO: Perform checks to see if the token has not expired
  console.log("HIT HERE")
  console.log(payload.sub)
  const user = await User.findById(payload.sub)
  console.log(user)
  if (user) {
    return done(null, user, payload)
  }
  return done(null, false, { message: 'User not found.' })
}))