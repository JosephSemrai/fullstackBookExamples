import React, { useState } from 'react'
import noteService from '../services/notes'
import Note from './Note'

const NoteContainer = ({ notes, setNotes }) => {

  const [showAll, setShowAll] = useState(true)

  const toggleFlagged = id => {
    const referencedNote = notes.find(n => n.id === id)
    const updatedNote = { ...referencedNote, flagged: !referencedNote.flagged }

    noteService
      .update(id, updatedNote)
      .then(() => {
        setNotes(notes.map(note => note.id === id ? updatedNote : note))
      })
  }

  const filteredNotes = showAll ? notes : notes.filter(note => note.flagged)

  const noteList = () => filteredNotes.map(note =>
    <Note
      key={note.id}
      note={note}
      toggleFlagged={() => toggleFlagged(note.id)}
    />
  )

  return (
    <>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          Show {showAll ? 'Flagged' : 'All' }
        </button>
      </div>

      <ul>
        {noteList()}
      </ul>
    </>
  )
}

export default NoteContainer