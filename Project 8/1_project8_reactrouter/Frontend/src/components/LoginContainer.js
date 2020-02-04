import React, { useState, useEffect } from 'react'
import noteService from '../services/notes'
import Togglable from './Togglable'
import LoginForm from './LoginForm'
import { withRouter } from 'react-router-dom'
import authenticatedState from '../helpers/authenticatedState'



const LoginContainer = ({ user, setUser }) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

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

  const authenticateWithProvider = (provider) => {
    window.location = 'http://localhost:3000/api/authentication/' + provider + '/start'
  }


  const loginForm = () => {
    return (
      <>
        <Togglable buttonLabel='Sign Up With Email'>
          <LoginForm
            loginAddress={'http://localhost:3000/api/authentication/local/start'}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            username={username}
            password={password}
          />
        </Togglable>
        <button onClick={() => authenticateWithProvider('google')}>Sign In with Google</button>
        <button onClick={() => authenticateWithProvider('facebook')}>Sign In with Facebook</button>
      </>
    )
  }

  const tokenEffect = () => {
    const params = (new URL(document.location)).searchParams
    const token = params.get('token')
    if (token) {
      setUser(authenticatedState(token))
    }

    // For production cases, you should remove the parameters from the URL so the user cannot accidentally copy and send their token when trying to share their link
  }

  useEffect(tokenEffect, [])

  return user === null ?
    loginForm() :
    <div>
      <p>Welcome, {user.name}</p> <button onClick={handleLogout}>Sign Out</button>
    </div>
}

export default withRouter(LoginContainer)