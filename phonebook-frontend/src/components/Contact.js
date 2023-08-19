import contactService from '../services/contacts'

const Contact = ({ contact, persons, setPersons, setErrorMessage}) => {
    const deleteContact = (event) => {
      event.preventDefault()
      if (window.confirm("Delete " + contact.name + "?")) {
        const contactId = contact.id
        contactService
        .deleteContact(contactId)
        .then(response => {   
          setPersons(persons.filter(person => person.id !== contactId))    
        })
        .catch(error => {
          const name = persons.find(person => person.id === contactId).name
          setErrorMessage(`Information of ${name} not found on server`)        
          setTimeout(() => {setErrorMessage(null)}, 5000)
        })
      }
    }

    return (
      <li>
        {contact.name} 
        {contact.number} 
        <button onClick={deleteContact}>delete</button>
      </li>
    )
  }
  
  export default Contact