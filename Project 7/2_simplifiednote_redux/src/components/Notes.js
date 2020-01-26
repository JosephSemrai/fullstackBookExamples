import React from 'react'
import { toggleFlaggedOf } from '../reducers/noteReducer'
import { connect } from 'react-redux'
import Note from './Note'

const Notes = ({ 
  notes,
  toggleFlagged 
}) => {

  return (
    <ul>
      {notes.map(note =>
        <Note
          key={note.id}
          note={note}
          toggleFlagged={() => toggleFlagged(note.id)}
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