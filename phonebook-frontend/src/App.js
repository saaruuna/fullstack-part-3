import { useState, useEffect} from 'react'
import contactService from './services/contacts'
import Contacts from './components/Contacts'
import NewContactForm from './components/NewContactForm'
import SearchForm from './components/SearchForm'
import { Success, Error } from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [searchName, setNewSearchName] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {        
    contactService.
    getAll()     
    .then(response => {                
      setPersons(response.data)      
    })  
  }, [])  
  return (
    <div>
      <h2>Phonebook</h2>
      <Success message={successMessage}/>
      <Error message={errorMessage}/>
      <SearchForm searchName={searchName} setNewSearchName={setNewSearchName} />
      <h2>add a new</h2>
      <NewContactForm persons={persons} setPersons={setPersons} setSuccessMessage={setSuccessMessage} setErrorMessage={setErrorMessage}/>
      <h2>Numbers</h2>
      <Contacts persons={persons} searchName={searchName} setPersons={setPersons} setErrorMessage={setErrorMessage}/>
    </div>
  )
}

export default App
