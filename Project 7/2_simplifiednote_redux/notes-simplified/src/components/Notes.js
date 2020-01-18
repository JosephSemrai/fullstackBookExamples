import React from 'react'
import { toggleFlaggedOf } from '../reducers/noteReducer'
import { connect } from 'react-redux'
import Note from './Note'

const Notes = ({ 
  notes,
  filter,
  toggleFlagged 
}) => {

  const noteList = () => {
    if (filter === 'FLAGGED') {
      return notes.filter(n => n.flagged)
    }
    return notes
  }

  return (
    <ul>
      {noteList().map(note =>
        <Note
          key={note.id}
          note={note}
          toggleFlagged={() => toggleFlagged(note.id)}
        />
      )}
    </ul>
  )
}

const mapStateToProps = (state) => {
  return {
    notes: state.notes,
    filter: state.filter
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