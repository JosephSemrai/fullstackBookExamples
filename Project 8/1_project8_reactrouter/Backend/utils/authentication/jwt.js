const passport = require('passport')
const passportJwt = require('passport-jwt')
const config = require('../config')
const User = require('../../models/user')

const jwtOptions = {
  // Reads JWT from th http Authorization header with the 'bearer' scheme
  jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
  // Secret used to sign the JWT
  secretOrKey: config.get('authentication.token.secret'),
  // Issuer stored in JWT
  issuer: config.get('authentication.token.issuer'),
  // Audience stored in JWT
  audience: config.get('authentication.token.audience')
}

passport.use(new passportJwt.Strategy(jwtOptions, async (payload, done) => {
  // TODO: Perform checks to see if the token has not expired
  const user = await User.findOne({ id: payload.sub })
  if (user) {
    return done(null, user, payload)
  }
  return done()
}))