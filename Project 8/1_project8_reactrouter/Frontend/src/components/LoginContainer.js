import React, { useState } from 'react'
import loginService from '../services/login'
import noteService from '../services/notes'
import Togglable from './Togglable'
import LoginForm from './LoginForm'

const LoginContainer = ({ user, setUser, setNotificationMessage }) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

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

  return user === null ?
    loginForm() :
    <div>
      <p>Welcome, {user.name}</p> <button onClick={handleLogout}>Sign Out</button>
    </div>
}

export default LoginContainer