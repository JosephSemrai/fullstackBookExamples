import React, { useState, useEffect } from 'react'
import Note from './components/Note'
import Notification from './components/Notification'
import Separator from './components/Separator'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import NoteForm from './components/NoteForm'
import noteService from './services/notes'
import loginService from './services/login'

const App = (props) => {
  const [notes, setNotes] = useState([])
  const [noteField, setNoteField] = useState(
  	'Enter a new note here...'
  )
  const [showAll, setShowAll] = useState(true)
  const [notificationMessage, setNotificationMessage] = useState()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const loadNotesEffect = () => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
      .catch(error => {
        setNotificationMessage(`${error}: Something went wrong while trying to retrieve data from the server.`)
      })
  }

  const signedInEffect = () => {
    const loggedInUserJSON = window.localStorage.getItem('noteAppUser')
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }

  useEffect(loadNotesEffect, [])
  useEffect(signedInEffect, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      setUser(user)
      setUsername('')
      setPassword('')
      window.localStorage.setItem(
        'noteAppUser', JSON.stringify(user)
      )
      noteService.setToken(user.token)

    } catch (exception) {
      console.log(exception)
      setNotificationMessage('Incorrect credentials: ' + exception)
      setTimeout(() => {
        setNotificationMessage(null)
      }, 3000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    try {
      window.localStorage.removeItem('noteAppUser')
      noteService.setToken(null)
      setUser(null)
    } catch (exception) {
      console.log(exception)
    }
  }

  const toggleFlagged = id => {
    const referencedNote = notes.find(n => n.id === id)
    const updatedNote = { ...referencedNote, flagged: !referencedNote.flagged }

    noteService
    	.update(id, updatedNote)
    		.then(responseNote => {
     	setNotes(notes.map(note => note.id === id ? updatedNote : note))
      })
  }

  const filteredNotes = showAll ? notes : notes.filter(note => note.flagged)

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

  const handleInputChange = (event) => {
    console.log('Input form changed', event.target.value)
    setNoteField(event.target.value)
  }

  const noteList = () => filteredNotes.map(note =>
  	<Note
      key={note.id}
      note={note}
      toggleFlagged={() => toggleFlagged(note.id)}
    />
  )

  const loginForm = () => {
    return (
      <Togglable buttonLabel='Login'>
        <LoginForm
          handleLogin={handleLogin}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          username={username}
          password={password}
        />
      </Togglable>
    )
  }

  const noteFormRef = React.createRef()

  const noteForm = () => (
    <Togglable buttonLabel='Create Note' ref={noteFormRef}>
      <NoteForm
        addNote={addNote}
        noteField={noteField}
        handleInputChange={handleInputChange}
      />
    </Togglable>
  )

  return (
    <div>
      <h1>Notes</h1>

      {user === null ?
    		loginForm() :
  			<div>
          <p>Welcome, {user.name}</p> <button onClick={handleLogout}>Sign Out</button>
          {noteForm()}
        </div>
    	}

      <Notification message={notificationMessage} />

      <div>
        <button onClick={() => setShowAll(!showAll)}>
          Show {showAll ? 'Flagged' : 'All' }
        </button>
      </div>

      <ul>
        {noteList()}
      </ul>

      <Separator />

    	</div>
  )
}

export default App
