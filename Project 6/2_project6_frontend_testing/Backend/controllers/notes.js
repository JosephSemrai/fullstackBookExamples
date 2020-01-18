const notesRouter = require('express').Router()
const Note = require('../models/note')
const User = require('../models/user')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const getTokenFrom = req => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

notesRouter.get('/', async (req, res) => {
  const notes = await Note
    .find({}).populate('user', { username: 1, name: 1 })

  res.json(notes.map(note => note.toJSON()))
})

notesRouter.post('/', async (req, res, next) => {
  const body = req.body

  const token = getTokenFrom(req)

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      return res.status(401).json({ error: 'missing or invalid token' })
    }

    const user = await User.findById(decodedToken.id)

    const newNote = new Note({
      content: body.content,
      flagged: body.flagged || false,
      date: new Date(),
      user: user._id
    })


    const savedNote = await newNote.save()
    user.notes = user.notes.concat(savedNote._id) // Adds the ID of the note we have just saved to the user's notes
    await user.save()
    res.status(201).json(savedNote.toJSON())
  } catch (exception) {
    next(exception)
  }
})

notesRouter.delete('/:id', async (req, res, next) => {
  try {
    await Note.findByIdAndDelete(req.params.id)
    res.status(204).end()
  } catch (exception) {
    next(exception)
  }
})

notesRouter.get('/:id', async (req, res, next) => {
  try {
    const note = await Note.findById(req.params.id)

    if (note) {
      res.json(note.toJSON())
    } else {
      res.status(404).end()
    }
  } catch (exception) {
    next(exception)
  }
})

notesRouter.put('/:id', (req, res, next) => {
  const body = req.body

  const note = {
    content: body.content,
    flagged: body.flagged,
  }

  Note.findByIdAndUpdate(mongoose.Types.ObjectId(req.params.id), note, { new: true })
    .then(updatedNote => {
      res.json(updatedNote.toJSON())
    })
    .catch(error => next(error))
})

module.exports = notesRouter


