const notesRouter = require('express').Router()
const Note = require('../models/note')

notesRouter.post('/', (req, res) => {
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
        .catch(error => next(error))
})


notesRouter.get('/', (req, res) => {
    Note.find({}).then(notes => {
        res.json(notes.map(note => note.toJSON()))
    })
})

notesRouter.delete('/:id', (req, res, next) => {
    Note.findByIdAndRemove(req.params.id)
        .then((res) => {
            res.status(204).end()
        })
        .catch(error => next(error))
})

notesRouter.get('/:id', (req, res, next) => {
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

notesRouter.put('/:id', (req, res, next) => {
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

module.exports = notesRouter