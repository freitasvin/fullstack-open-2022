import { useState, useEffect } from 'react'
import { Form } from './components/Form'
import { Filter } from './components/Filter'
import { Numbers } from './components/Numbers'
import phonebookService from './services/phonebook'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

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

    if (persons.find(person => person.name === newName)){
      alert(`${newName} is already added to phonebook`)  
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
      })
    }
  }

  const handleClickDelete = (id) => {
    const targetPerson = persons.find(persons => persons.id === id)

    if (window.confirm(`delete ${targetPerson.name} ?`)){
      phonebookService
      .deletePerson(targetPerson.id)
      .then(setPersons(persons.filter(person => 
        person.id !== targetPerson.id
      )))
    }
  }



  return (
    <div>
      <h2>Phonebook</h2>
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