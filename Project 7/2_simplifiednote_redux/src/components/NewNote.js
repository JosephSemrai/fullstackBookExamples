import React from 'react'
import { connect } from 'react-redux'
import { createNote } from '../reducers/noteReducer'

const NewNote = ({ createNewNote }) => {
  
  const addNote = (event) => {
    event.preventDefault()
    const textContent = event.target.noteField.value
    createNewNote(textContent)
    event.target.noteField.value = ''
  }
  
  return (
  	<form onSubmit={addNote}>
      <input name="noteField"/> 
      <button type="submit">Create Note</button>
    </form>
  )
}

const mapDispatchToProps = {
  createNewNote: createNote
}

const ConnectedNewNote = connect(
  null,
  mapDispatchToProps
)(NewNote)
export default ConnectedNewNote