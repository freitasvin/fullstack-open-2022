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

//Express show static content
app.use(express.static('build'))

//express JSON middleware
app.use(express.json())

//Homepage
app.get('/', (req, res) => {
  res.send('<h1>Phonebook</h1>');
});

//All persons
app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons.map(person => person.toJSON()))
  })
})

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
  .catch(error => next(error))
});

//Delete person
app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id;
  
  Person.findByIdAndRemove(id)
    .then(result => {
      res.status(204).end()
    })
    .catch(error => next(error))
});

//Add person
app.post('/api/persons', (req, res, next) => {
  const body = req.body;

  if (body.name === undefined) {
    return res.status(400).json({ error: 'content missing' })
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save()
    .then(savedPerson=> {
        console.log(`added ${body.name} number ${body.number} to phonebook`)
        res.json(savedPerson)
        })
    .catch(error => next(error))
});

app.put('/api/persons/:id', (req, res) => {
  const id = req.params.id 
  const body = req.body

  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(id, person)
    .then(result => {
      console.log(result)
    })
    .catch(error => {
      next(error)
    })
})

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

//Error middleware
const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }
  
  next(error)
}

app.use(errorHandler)