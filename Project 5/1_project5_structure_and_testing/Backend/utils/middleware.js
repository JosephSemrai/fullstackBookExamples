const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'Endpoint does not exist (Unknown Endpoint)' })
}

const errorHandler = (err, req, res, next) => {
    console.error(err.message)

    if (err.name === 'CastError' && err.kind === 'ObjectId') {
        return res.status(400).send({ error: 'Incorrect format for id parameter' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}

module.exports = {
    unknownEndpoint,
    errorHandler
}