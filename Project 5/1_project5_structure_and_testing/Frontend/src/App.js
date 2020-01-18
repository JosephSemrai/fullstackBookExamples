import React, { useState, useEffect } from 'react' // Imported useEffect via Named Import (similar syntax to destructuring)
import Note from './components/Note'
import Notification from './components/Notification'
import Separator from './components/Separator'

import axios from 'axios' // Imported axios so we can request for the notes from our server

import noteService from './services/notes'

const App = (props) => {
  const [notes, setNotes] = useState([]) // Updated to not use the state passed into the component as we'll be fetching it from the server
  const [noteField, setNoteField] = useState(
  	'Enter a new note here...'
  )
  const [showAll, setShowAll] = useState(true)
  const [notificationMessage, setNotificationMessage] = useState()

  const toggleFlagged = id => {
    const referencedNote = notes.find(n => n.id === id)
    const updatedNote = { ...referencedNote, flagged: !referencedNote.flagged }

    noteService
    	.update(id, updatedNote)
    		.then(responseNote => {
     	setNotes(notes.map(note => note.id === id ? updatedNote : note))
    })
  }

  const effectHook = () => {
    noteService
      .getAll()
        .then(initialNotes => {
        setNotes(initialNotes)
      })
      .catch(error => {
        setNotificationMessage(`${error}: Something went wrong while trying to retrieve data from the server.`)
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
      
      <Notification message={notificationMessage} />
      
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
      
      <Separator />
      
    </div>
  )
}

export default App;
