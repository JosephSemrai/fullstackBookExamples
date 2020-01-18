import axios from 'axios'
const baseUrl = '/api/notes'

let token = null

const setToken = userToken => {
  token = `bearer ${userToken}`
}

const getAll = () => {
  const req = axios.get(baseUrl)
  return req.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  
  const res = await axios.post(baseUrl, newObject, config)
  return res.data
}

const update = (id, newObject) => {
  const req = axios.put(`${baseUrl}/${id}`, newObject)
  return req.then(res => res.data)
}

export default {
  setToken: setToken,
  getAll: getAll, 
  create: create, 
  update: update
}