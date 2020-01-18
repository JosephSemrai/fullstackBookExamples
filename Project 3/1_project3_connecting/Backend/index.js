const http = require('http')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')


const app = express()
app.use(cors())
app.use(bodyParser.json())

let notes = [
  {
      id: 1,
      content: 'First Note',
      date: '2019-09-30T17:32:41.199Z',
      flagged: true
  },
  {
      id: 2,
      content: 'Second Note!',
      date: '2019-08-30T12:13:24.091Z',
      flagged: false
  },
  {
      id: 3,
      content: 'This is our third note.',
      date: '2019-08-30T12:20:14.998Z',
      flagged: true
  }
]

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
  res.json(notes)
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