import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import NoteForm from './NoteForm'

const Wrapper = (props) => {

  const handleInputChange = (event) => {
    props.state.noteField = event.target.value
  }

  return (
    <NoteForm
      addNote={props.addNote}
      noteField={props.state.noteField}
      handleInputChange={handleInputChange}
    />
  )
}

test('<NoteForm /> updates through handleInputChange and calls addNote', () => {
  const addNote = jest.fn()
  const state = {
      noteField: ''
  }

  const component = render(
    <Wrapper addNote={addNote} state={state} />
  )

  const input = component.container.querySelector('input')
  const form = component.container.querySelector('form')

  fireEvent.change(input, { target: { value: 'Test form input' } })
  fireEvent.submit(form)

  expect(addNote.mock.calls.length).toBe(1)
  expect(state.noteField).toBe('Test form input')
})