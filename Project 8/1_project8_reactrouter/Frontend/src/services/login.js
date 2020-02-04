import axios from 'axios'
const baseUrl = '/api/login'

let token = null

const setToken = userToken => {
  token = `bearer ${userToken}`
}

const login = async credentials => {
  const res = await axios.post(baseUrl, credentials)
  return res.data
}

const profile = async () => {
  const config = {
    headers: { Authorization: token },
  }
  console.log("Getting profile with token " + token)

  const res = await axios.get(`${baseUrl}/profile`, config)
  return res.data
}

export default { setToken, login, profile }