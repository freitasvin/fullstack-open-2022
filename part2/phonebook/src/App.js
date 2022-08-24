import { useState, useEffect } from 'react'
import { Form } from './components/Form'
import { Filter } from './components/Filter'
import { Numbers } from './components/Numbers'
import { Notification } from './components/Notification'
import phonebookService from './services/phonebook'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    phonebookService
    .getAll()
    .then((response) => {
      setPersons(response)
    }).catch(reason => {
      console.log(reason)
    })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const person = persons.find(person => person.name === newName) || null

    if (person){
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        phonebookService
          .update(person.id, {
            id: person.id,
            name: person.name,
            number: newNumber
          })
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== returnedPerson.id ? person : returnedPerson))
          })
          .catch(error => {
            setPersons(persons.filter(item => item.id !== person.id))
            setMessage({
              type: "error", 
              text: `Information of ${person.name} has already been removed from the server`
            })
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
      }  
    } else {
      phonebookService
        .create(
          {
            name: newName,
            number: newNumber
          }
        )
        .then(returnedPerson => {
          setPersons([...persons, returnedPerson])
          setMessage({
            type: "success" ,
            text: `Added ${returnedPerson.name} successfuly`
          })
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
    }
  }

  const handleClickDelete = (id) => {
    const targetPerson = persons.find(persons => persons.id === id)

    if (window.confirm(`delete ${targetPerson.name} ?`)){
      phonebookService
        .deletePerson(targetPerson.id)
        .then( () => {
          setPersons(persons.filter(person => person.id !== targetPerson.id))
          setMessage({
            type: "success" ,
            text: `${targetPerson.name} was deleted successfuly`
          })
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        
        })
    }
  }



  return (
    <div>
      <h2>Phonebook</h2>
      {message && (
      <Notification type={message.type} message={message.text}/>
      )}
      
      <Filter handleSearch={handleSearch}/>
      <Form 
        handleSubmit={handleSubmit}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <Numbers 
        persons={persons} 
        search={search}
        handleClickDelete={handleClickDelete}
      />
    </div>
  )
}

export default App