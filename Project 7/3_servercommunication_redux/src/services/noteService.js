import axios from 'axios'

const baseUrl = 'http://localhost:3001/notes'

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const create = async textContent => {
  const note = { 
    textContent,
    flagged: false 
  }
  const res = await axios.post(baseUrl, note)
  return res.data
}

const update = async (id, newObject) => {
  const res = await axios.put(`${baseUrl}/${id}`, newObject)
  return res.data
}

export default { 
  getAll,
  create,
  update
}