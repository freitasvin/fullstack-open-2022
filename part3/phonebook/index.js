const express = require('express');
const app = express();
const PORT = 3001;

let persons = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})

//Homepage
app.get('/', (req, res) => {
  res.send('<h1>Phonebook</h1>')
})

//All persons
app.get('/api/persons', (req, res) => {
  res.json(persons);
})

//Api info
app.get('/info', (req, res) => {
  const quantity = persons.length;
  const date = new Date();

  res.send(`
    <p>Phonebook has info for ${quantity} people</p>
    <p>${date}</p>
    `)
})

//Single person search
app.get('/api/persons/:id', (req, res) => {
  id = Number(req.params.id);
  const person = persons.find(person => person.id === id);

  if (person) {
    res.json(person)
  } else {
    res.status(404).end('NOT FOUND')
  }
})

//Delete person
app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter(person => person.id !== id);

  res.status(204).end()
})

