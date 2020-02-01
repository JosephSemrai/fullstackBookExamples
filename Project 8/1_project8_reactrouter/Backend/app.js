const config = require('./utils/config')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')
const logger = require('./utils/logger')
const passport = require('passport')

const notesRouter = require('./controllers/notes')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

logger.info('Connecting to:', config.database)

mongoose.connect(config.database, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})
  .then(() => {
    logger.info('Connected to MongoDB')
  })
  .catch((error) => {
    logger.error('Error connecting to MongoDB:', error.message)
  })

// Middleware
app.use(cors())
app.use(express.static('build'))
app.use(bodyParser.json())
app.use(passport.initialize())
app.use(middleware.logRequest)

// Routers
app.use('/api/notes', notesRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

// After router middleware
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app