import React, { useState } from 'react'
import Note from './components/Note'

const App = (props) => {
  const [notes, setNotes] = useState(props.notes)
  const [noteField, setNoteField] = useState(
  	'Enter a new note here...'
  )
  const [showAll, setShowAll] = useState(true)
  
  const filteredNotes = showAll ? notes : notes.filter(note => note.flagged)

  const addNote = (event) => {
    event.preventDefault() // Prevents the page from being refreshed when we click the submit button
    console.log('Note form submitted', event.target)
    
    const newNoteObject = {
      id: notes.length + 1, // May cause issues with duplicate ids if this array were to ever have elements deleted from it
      content: noteField,
      date: new Date().toISOString(),
      flagged: Math.random() > 0.75,
    }
    
    setNotes(notes.concat(newNoteObject))
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
    />
  )

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}> {/* "Flips" the `showAll` state */}
          Show {showAll ? 'Flagged' : 'All' } {/* Changes button text depending on state */}
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
