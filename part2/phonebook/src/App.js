import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

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
      setPersons([...persons, { name: newName, number: newNumber }])
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
        <div>
          filter shown with: <input onChange={handleSearch}/>
        </div>
      <div>
        <h2>add a new</h2>
        <form onSubmit={handleSubmit}>
          <div>
            name: <input onChange={handleNameChange}/>
          </div>
          <div>
            number: <input onChange={handleNumberChange}/>
          </div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
      </div>
      <h2>Numbers</h2>
      {persons.filter(person => 
        person.name.toLowerCase().includes(search.toLowerCase())
      ).map(person => 
        <p key={person.name}>{person.name} {person.number}</p>
      )}
    </div>
  )
}

export default App