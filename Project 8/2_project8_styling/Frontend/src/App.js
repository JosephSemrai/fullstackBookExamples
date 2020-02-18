import React, { useState, useEffect } from 'react'
import Notification from './components/Notification'
import Separator from './components/Separator'
import noteService from './services/notes'
import loginService from './services/login'
import LoginContainer from './components/LoginContainer'
import NoteFormContainer from './components/NoteFormContainer'
import Note from './components/Note'
import NoteContainer from './components/NoteContainer'
import {
  BrowserRouter as Router, Route, Link, Redirect
} from 'react-router-dom'
import { Checkbox, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  checkboxRoot: {
    color: theme.status.danger,
    '&$checked': {
      color: theme.status.danger,
    },
  },
  checked: {},
}));

const App = (props) => {
  const classes = useStyles()
  const [notes, setNotes] = useState([])
  const [notificationMessage, setNotificationMessage] = useState()
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
      const storageUser = JSON.parse(loggedInUserJSON)
      setUser(storageUser)
      noteService.setToken(storageUser.token)
      loginService.setToken(storageUser.token)
    }
  }

  useEffect(loadNotesEffect, [])
  useEffect(signedInEffect, [])

  const getNoteById = (id) => notes.find(note => note.id === id)

  const linkStyle = { padding: 10 }

  return (
    <div>
      <Checkbox
        classes={{
          root: classes.checkboxRoot,
          checked: classes.checked
        }}
      />
      <h1>Notes</h1>
        <Router>
          <div>
            <div>
              <Link style={linkStyle} to="/">Home</Link>
              <Link style={linkStyle} to="/notes">Notes</Link>
              <Link style={linkStyle} to="/login">Login</Link>
              {user === null ?
                null :
                <Link style={linkStyle} to="/create">Create</Link>}
            </div>
            <Notification message={notificationMessage} />
            <div>
              <Route exact path="/" render={() => <h2>Home</h2>} />
              <Route path="/login" render={() => <LoginContainer user={user} setUser={setUser} setNotificationMessage={setNotificationMessage} />} />
              <Route exact path="/notes" render={() => <NoteContainer notes={notes} setNotes={setNotes} />}/>
              <Route path="/notes/:id" render={({ match }) => <Note note={getNoteById(match.params.id)} />}/>
              <Route path="/create" render={() => user ? <NoteFormContainer notes={notes} setNotes={setNotes} /> : <Redirect to="/login" />}/>
            </div>
          </div>
        </Router>
      <Separator />
    </div>
  )
}

export default App
