const passport = require('passport')
const passportGoogle = require('passport-google-oauth')
const config = require('../config')
const User = require('../../models/user')

const passportConfig = {
  clientID: config.authentication.google.clientId,
  clientSecret: config.authentication.google.clientSecret,
  callbackURL: 'http://localhost:3000/api/authentication/google/redirect'
}

if (passportConfig.clientID) {
  passport.use(new passportGoogle.OAuth2Strategy(passportConfig, function (request, accessToken, refreshToken, profile, done) {
    // Creates user if this user does not already have an account with this googleId
    User.findOrCreate({ name: profile.name.givenName, providerId: profile.id }, function (err, user) {
      return done(err, user)
    })
  }))
}