const passport = require('passport')
const passportFacebook = require('passport-facebook')
const config = require('../config')
const User = require('../../models/user')

const passportConfig = {
  clientID: config.authentication.facebook.clientId,
  clientSecret: config.authentication.facebook.clientSecret,
  callbackURL: 'http://localhost:3000/api/authentication/facebook/redirect'
}

if (passportConfig.clientID) {
  passport.use(new passportFacebook.Strategy(passportConfig, function (request, accessToken, refreshToken, profile, done) {
    // Creates user if this user does not already have an account with this facebookId
    User.findOrCreate({ name: profile.displayName, providerId: profile.id }, function (err, user) {
      return done(err, user)
    })
  }))
}