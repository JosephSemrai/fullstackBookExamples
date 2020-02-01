require('dotenv').config()
const convict = require('convict')

const config = convict({
  port: {
    doc: 'Port that Express listens on',
    format: 'port',
    default: 3000,
    env: 'PORT'
  },
  database: {
    doc: 'MongoDB URI for database connection',
    format: String,
    default: '',
    env: 'MONGODB_URI'
  },
  authentication: {
    google: {
      clientId: {
        doc: 'Google Auth Client ID',
        default: '',
        env: 'GOOGLE_CLIENTID'
      },
      clientSecret: {
        doc: 'Google Auth Client Secret',
        default: '',
        env: 'GOOGLE_CLIENTSECRET'
      }
    },
    facebook: {
      clientId: {
        doc: 'Facebook Auth client ID',
        default: '',
        env: 'FACEBOOK_CLIENTID'
      },
      clientSecret: {
        doc: 'Facebook Auth client secret',
        default: '',
        env: 'FACEBOOK_CLIENTSECRET'
      }
    },
  },
  token: {
    secret: {
      doc: 'Secret key for JWT (signer)',
      default: 'jDGWbgiUDHGIWOGE&G8DUGVHUI',
      env: 'SECRET'
    },
    issuer: {
      doc: 'JWT Issuer',
      default: 'Test App'
    },
    audience: {
      doc: 'JWT Audience',
      default: 'Test App'
    }
  }
})

// Perform validation
config.validate({ allowed: 'strict' })

module.exports = config.getProperties()