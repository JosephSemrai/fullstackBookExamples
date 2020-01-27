import React from 'react'
import { toggleFlaggedOf } from '../reducers/noteReducer'
import { connect } from 'react-redux'
import Note from './Note'
import noteService from '../services/noteService'

const Notes = ({ 
  notes,
  toggleFlagged 
}) => {

  const toggleNoteFlagged = async note => {
    const toggledNote = {
      ...note,
      flagged: !note.flagged
    }
    await noteService.update(note.id, toggledNote)
    toggleFlagged(note.id)
  }

  return (
    <ul>
      {notes.map(note =>
        <Note
          key={note.id}
          note={note}
          toggleFlagged={() => toggleNoteFlagged(note)}
        />
      )}
    </ul>
  )
}


const noteList = ({ notes, filter }) => {
  if (filter === 'FLAGGED') {
    return notes.filter(n => n.flagged)
  }
  return notes
}

const mapStateToProps = (state) => {
  return {
    notes: noteList(state)
  }
}

const mapDispatchToProps = {
  toggleFlagged: toggleFlaggedOf
}

const ConnectedNotes = connect(
  mapStateToProps,
  mapDispatchToProps
)(Notes)
export default ConnectedNotes