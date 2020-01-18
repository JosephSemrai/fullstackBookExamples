const http = require('http')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')


const app = express()
app.use(cors())
app.use(bodyParser.json())

const mongoose = require('mongoose')

const url =
  'mongodb+srv://exampleuser:examplepassword@cluster0-nfeqs.mongodb.net/note-app?retryWrites=true&w=majority'

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  flagged: Boolean,
})

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString() // Just in case, we convert the _id field of our object to a string as it is in fact an object (even though it is displayed like a string)
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Note = mongoose.model('Note', noteSchema)

const generateNoteId = () => { // Helper function to generate ID #s
  const maxId = notes.length > 0
    ? Math.max(...notes.map(note => note.id))
    : 0
  return maxId + 1
}

app.post('/api/notes', (req, res) => {
  const body = req.body

  if (!body.content) {
    return res.status(400).json({ 
      error: 'No content specified in note body' 
    })
  }

  const newNote = {
    content: body.content,
    flagged: body.flagged || false,
    date: new Date(),
    id: generateNoteId(),
  }

  notes = notes.concat(newNote)

  res.json(newNote)
})

app.get('/api', (req, res) => {
  res.send('<h1>Welcome to our Notes Application Backend!</h1>')
})

app.get('/api/notes', (req, res) => {
  Note.find({}).then(notes => {
    res.json(notes.map(note => note.toJSON()))
  })
})

app.delete('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  notes = notes.filter(note => note.id !== id) // Filters out the specified note from `notes`

  res.status(204).end()
})

app.get('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id) // Takes in the parameter from the URL and casts it to a number
  const note = notes.find(note => note.id === id) // Finds the note that matches the parameter
  res.json(note)
})



const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Express: Server running on port ${PORT}`)
})