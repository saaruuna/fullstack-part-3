import { useState } from 'react'
import contactService from '../services/contacts'

const NewContactForm = ({persons, setPersons, setSuccessMessage, setErrorMessage}) => {    
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

    const addNameAndNumber = (event) => {
        event.preventDefault()    
        const nameObject = {
          id: persons.length + 1,
          name: newName,
          number: newNumber,
        }
    
        if (persons.map(person => person.name).includes(nameObject.name)) {
          if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
            const updateId = persons.find(person => person.name.includes(nameObject.name)).id
            const changedObject = {...nameObject, id: updateId}
            contactService
            .update(changedObject)
            .then(response => {
              setPersons(persons.map(person => person.id === changedObject.id ? response.data : person))
              setSuccessMessage(`Updated ${nameObject.name}`)        
              setTimeout(() => {setSuccessMessage(null)}, 5000)
            })
            .catch(error => {
              setErrorMessage(`Information of ${nameObject.name} not found on server`)        
              setTimeout(() => {setErrorMessage(null)}, 5000)
            })
          }
        } else {
          contactService
          .create(nameObject)   
          .then(response => {      
            setPersons(persons.concat(response.data))    
            setSuccessMessage(`Added ${nameObject.name}`)        
            setTimeout(() => {setSuccessMessage(null)}, 5000)
          })
          .catch(error => {
            setErrorMessage(`Could not add ${nameObject.name}`)        
            setTimeout(() => {setErrorMessage(null)}, 5000)
          })
        }
    
        setNewName('')
        setNewNumber('')
      }
    
      const handleNameChange = (event) => {    
        console.log(event.target.value)    
        setNewName(event.target.value)  
      }
    
      const handleNumberChange = (event) => {    
        console.log(event.target.value)    
        setNewNumber(event.target.value)  
      }

    return(
        <div>
            <form onSubmit={addNameAndNumber}>
                <div>
                name: <input
                value={newName}
                onChange={handleNameChange}        
                />
                </div>
                <div>
                number: <input
                value={newNumber}
                onChange={handleNumberChange}        
                />
                </div>
                <div>
                <button type="submit">add</button>
                </div>
            </form>
        </div>
    )
}

export default NewContactForm