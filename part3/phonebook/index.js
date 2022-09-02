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
];

//Starting server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use(express.json());

//Homepage
app.get('/', (req, res) => {
  res.send('<h1>Phonebook</h1>');
});

//All persons
app.get('/api/persons', (req, res) => {
  res.json(persons);
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
