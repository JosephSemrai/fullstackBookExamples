const logger = require('./logger')

const logRequest = (req, res, next) => {
    logger.info('Method:  ', req.method)
    logger.info('Path:    ', req.path)
    logger.info('Body:    ', req.body)
    logger.info('--------')
    next()
}

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'Endpoint does not exist (Unknown Endpoint)' })
}

const errorHandler = (err, req, res, next) => {
    logger.error(err.message)

    if (err.name === 'CastError' && err.kind === 'ObjectId') {
        return res.status(400).send({ error: 'Incorrect format for id parameter' })
    } else if (err.name === 'ValidationError') {
        return res.status(400).json({ error: err.message })
    }

    next(err)
}

module.exports = {
    logRequest,
    unknownEndpoint,
    errorHandler
}