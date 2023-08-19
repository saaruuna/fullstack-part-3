import Contact from './Contact'

const Contacts = ({ persons, searchName, setPersons, setErrorMessage}) => {
    return (
        <div>
            <ul>
                {persons.filter(person => 
                    person.name.toLowerCase()
                    .includes(searchName.toLowerCase()))
                    .map(contact =>          
                    <Contact key={contact.id} contact={contact} persons={persons} setPersons={setPersons} setErrorMessage={setErrorMessage}/>
                )}  
            </ul>
        </div>
    )
}

export default Contacts