import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import Notes from './components/Notes'
import NewNote from './components/NewNote'
import NoteFilter from './components/NoteFilter'

import { initNotes } from './reducers/noteReducer'

const App = ({ initializeNotes }) => {

  useEffect(() => {
    initializeNotes()
  }, [initializeNotes])

  return (
    <div>
      <NewNote />
      <NoteFilter />
      <Notes />
    </div>
  )
}

const ConnectedApp = connect(null, { initializeNotes: initNotes })(App) 
export default ConnectedApp