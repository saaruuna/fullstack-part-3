import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/persons'

const getAll = () => {
  return axios.get(baseUrl)
}

const create = newObject => {
  return axios.post(baseUrl, newObject)
}

const update = changedObject => {
  return axios.put(baseUrl + "/" + changedObject.id, changedObject)
}

const deleteContact = contactId => {
    return axios.delete(baseUrl + '/' + contactId)
}

export default { 
  getAll: getAll, 
  create: create, 
  update: update,
  deleteContact: deleteContact
}