import React, { useState, useEffect } from 'react' // Imported useEffect via Named Import (similar syntax to destructuring)
import Note from './components/Note'

import axios from 'axios' // Imported axios so we can request for the notes from our server

const App = (props) => {
  const [notes, setNotes] = useState([]) // Updated to not use the state passed into the component as we'll be fetching it from the server
  const [noteField, setNoteField] = useState(
  	'Enter a new note here...'
  )
  const [showAll, setShowAll] = useState(true)

  const toggleFlagged = id => {
    const noteURL = `http://localhost:3001/notes/${id}`
    const referencedNote = notes.find(note => note.id === id)
    const updatedNote = { ...referencedNote, flagged: !referencedNote.flagged }

    axios.put(noteURL, updatedNote).then(response => {
      setNotes(notes.map(note => note.id === id ? response.data : note)) // Explained
      console.log(`Changed ${id}'s flagged property`)
    })
  }

  const effectHook = () => { // Effect Hook
    console.log('Reached Effect')
    axios
      .get('http://localhost:3001/notes')
      .then(response => {
        console.log('The promise has been fulfilled :)')
        setNotes(response.data)
      })
  }

  useEffect(effectHook, [])
  console.log('Rendered', notes.length, 'notes')
  
  const filteredNotes = showAll ? notes : notes.filter(note => note.flagged)

  const addNote = (event) => {
    event.preventDefault()
    const newNoteObject = {
      content: noteField,
      date: new Date(),
      flagged: Math.random() > 0.5,
    }
  
    axios
      .post('http://localhost:3001/notes', newNoteObject)
      .then(response => {
        console.log('Received Response', response)
        setNotes(notes.concat(response.data))
      })
    setNoteField('Enter a new note here...')
  }

  const handleInputChange = (event) => {
    console.log('Input form changed', event.target.value)
    setNoteField(event.target.value)
  }
  
  const noteList = () => filteredNotes.map(note => 
  	<Note
      key={note.id}
      note={note}
      toggleFlagged={() => toggleFlagged(note.id)}
    />
  )

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          Show {showAll ? 'Flagged' : 'All' } 
        </button>
      </div>
      <ul>
        {noteList()}
      </ul>
      <form onSubmit={addNote}>
      	<input 
          value={noteField} 
          onChange={handleInputChange} />
        <button type="submit">Add Note</button>
      </form>
    </div>
  )
}

export default App;
