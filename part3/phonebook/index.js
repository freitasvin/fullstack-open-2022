require('dotenv').config()
const express = require('express');
const Person = require('./models/person')
const cors = require('cors');
const app = express();
const PORT = process.env.PORT;

//Starting server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

//CORS 
app.use(cors())

//express JSON middleware
app.use(express.json())

//Express show static content
app.use(express.static('build'))

//Homepage
app.get('/', (req, res) => {
  res.send('<h1>Phonebook</h1>');
});

//All persons
app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons)
  })
});

//Api info
app.get('/info', (req, res) => {
  const quantity = persons.length;
  const date = new Date();

  res.send(`
    <p>Phonebook has info for ${quantity} people</p>
    <p>${date}</p>
    `);
});

//Single person search
app.get('/api/persons/:id', (req, res) => {
  Person.findById(req.params.id)
  .then(person => {
    if (person) {
      res.send(person)
    } else {
      res.status(404).end()
    }
  })
  .catch(error => {
    console.log(error)
    res.status(500).end({ error: 'malformatted id' })
  })
});

//Delete person
app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id;
  
  Person.findByIdAndRemove(id)
    .then(result => {
      res.status(204).end()
    })
    .catch(error => {
      console.log(error)
    })
});

//Add person
app.post('/api/persons', (req, res) => {
  const body = req.body;

  if (body.name === undefined) {
    return res.status(400).json({ error: 'content missing' })
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save().then(savedPerson => {
    res.json(savedPerson)
  })
});
