const config = require('./utils/config')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const notesRouter = require('./controllers/notes')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')
const logger = require('./utils/logger')

logger.info('Connecting to:', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
    .then(() => {
        logger.info('Connected to MongoDB')
    }
    .catch((error) => {
        logger.error('Error connecting to MongoDB:', error.message)
    })
    
// Middleware
app.use(cors())
app.use(express.static('build'))
app.use(bodyParser.json())
app.use(middleware.logRequest)

// Routers
app.use('/api/notes', notesRouter)

// After router middleware
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app