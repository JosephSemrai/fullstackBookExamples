import React, { useState, useEffect } from 'react'
import loginService from '../services/login'
import noteService from '../services/notes'
import Togglable from './Togglable'
import LoginForm from './LoginForm'
import { withRouter } from 'react-router-dom'
import authenticatedState from '../helpers/authenticatedState'

const authenticateWithProvider = (provider) => {
  window.open('http://localhost:3000/api/authentication/' + provider + '/start')
}


const LoginContainer = ({ history, user, setUser, setNotificationMessage }) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      setUser(user)
      setUsername('')
      setPassword('')
      window.localStorage.setItem(
        'noteAppUser', JSON.stringify(user)
      )
      noteService.setToken(user.token)
      history.push('/')
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

  const loginForm = () => {
    return (
      <>
        <Togglable buttonLabel='Sign Up With Email'>
          <LoginForm
            handleLogin={handleLogin}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            username={username}
            password={password}
          />
        </Togglable>
        <button onClick={() => authenticateWithProvider('google')}>Sign In with Google</button>
        <button onClick={() => tokenEffect()}>Test</button>
      </>
    )
  }

  const tokenEffect = () => {
    const params = (new URL(document.location)).searchParams;
    const token = params.get('token')
    if (token) {
      setUser(authenticatedState(token))
    }
  }

  useEffect(tokenEffect, [])

  return user === null ?
    loginForm() :
    <div>
      <p>Welcome, {user.name}</p> <button onClick={handleLogout}>Sign Out</button>
    </div>
}

export default withRouter(LoginContainer)