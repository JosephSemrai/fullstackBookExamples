import noteService from '../services/notes'
import loginService from '../services/login'

const authenticatedState = async (token) => {
  noteService.setToken(token)
  loginService.setToken(token)
  let user = await loginService.profile()
  user = {
    token,
    ...user
  }
  window.localStorage.setItem(
    'noteAppUser', JSON.stringify(user)
  )
  return user
}

export default authenticatedState