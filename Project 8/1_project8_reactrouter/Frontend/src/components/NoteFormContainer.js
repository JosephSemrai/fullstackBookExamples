import React, { useState } from 'react'
import noteService from '../services/notes'
import Togglable from './Togglable'
import NoteForm from './NoteForm'

const NoteFormContainer = ({ notes, setNotes }) => {

  const [noteField, setNoteField] = useState(
    'Enter a new note here...'
  )

  const noteFormRef = React.createRef()

  const handleInputChange = (event) => {
    console.log('Input form changed', event.target.value)
    setNoteField(event.target.value)
  }

  const addNote = (event) => {
    event.preventDefault()
    noteFormRef.current.toggleVisibility()
    const newNoteObject = {
      content: noteField,
      date: new Date(),
      flagged: Math.random() > 0.5,
    }

    noteService.create(newNoteObject)
      .then(data => {
        setNotes(notes.concat(data))
        setNoteField('Enter a new note here...')
      })
  }

  return (
    <Togglable buttonLabel='Create Note' ref={noteFormRef}>
      <NoteForm
        addNote={addNote}
        noteField={noteField}
        handleInputChange={handleInputChange}
      />
    </Togglable>
  )
}

export default NoteFormContainer