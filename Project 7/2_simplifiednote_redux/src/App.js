import React from 'react'
import Notes from './components/Notes'
import NewNote from './components/NewNote'
import NoteFilter from './components/NoteFilter'

const App = ({ store }) => {

  return (
    <div>
      <NewNote store={store} />
      <NoteFilter store={store} />
      <Notes store={store} />
    </div>
  )
}

export default App