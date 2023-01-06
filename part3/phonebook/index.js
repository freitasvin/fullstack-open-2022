require('dotenv').config()
const express = require('express');
const Person = require('./models/persons')
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
  id = Number(req.params.id);
  const person = persons.find(person => person.id === id);

  if (person) {
    res.json(person);
  } else {
    res.status(404).end('NOT FOUND');
  };
});

//Delete person
app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter(person => person.id !== id);

  res.status(204).end();
});

//Add person
app.post('/api/persons', (req, res) => {
  const body = req.body;

  if(!body) {
    return res.status(400).json({
      error: "content missing"
    });
  }

  if(!body.name){
    return res.status(400).json({
      error: 'name missing'
    });
  }

  if(!body.number){
    return res.status(400).json({
      error: 'number missing'
    });
  }

  if (persons.find(person => person.name === body.name)) {
    return res.status(400).json({
    error: 'name must be unique'
    });
  }

  const person = {
    id: Math.floor(Math.random() * (1000 - 5) + 5),
    name: body.name,
    number: body.number
  };

  persons = persons.concat(person);

  res.json(person);
});
