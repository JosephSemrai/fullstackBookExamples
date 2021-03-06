require('dotenv').config()
const http = require('http')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const Note = require('./models/note')


const app = express()
app.use(express.static('build'))
app.use(cors())
app.use(bodyParser.json())


app.post('/api/notes', (req, res) => {
  const body = req.body

  if (!body.content) {
    return res.status(400).json({ 
      error: 'No content specified in note body' 
    })
  }

  const newNote = new Note({
    content: body.content,
    flagged: body.flagged || false,
    date: new Date(),
  })

  newNote.save().then(savedNote => {
    res.json(savedNote.toJSON())
  })
})

app.get('/api', (req, res) => {
  res.send('<h1>Welcome to our Notes Application Backend!</h1>')
})

app.get('/api/notes', (req, res) => {
  Note.find({}).then(notes => {
    res.json(notes.map(note => note.toJSON()))
  })
})

app.delete('/api/notes/:id', (req, res, next) => {
  Note.findByIdAndRemove(req.params.id)
    .then((result) => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

app.get('/api/notes/:id', (req, res, next) => {
  Note.findById(req.params.id)
    .then(note => {
    	if (note) {
        res.json(note.toJSON())
      } else {
        res.status(404).end() // Condition fail
      }
  	})
  	.catch(error => next(error))
})

app.put('/api/notes/:id', (req, res, next) => {
  const body = req.body

  const note = {
    content: body.content,
    flagged: body.flagged,
  }

  Note.findByIdAndUpdate(req.params.id, note, { new: true })
    .then(updatedNote => {
      res.json(updatedNote.toJSON())
    })
    .catch(error => next(error))
})

// END ROUTING METHODS

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'Endpoint does not exist (Unknown Endpoint)' })
}

app.use(unknownEndpoint)

const errorHandler = (err, req, res, next) => {
  console.error(err.message)

  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    return res.status(400).send({ error: 'Incorrect format for id parameter' })
  } 

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Express: Server running on port ${PORT}`)
})