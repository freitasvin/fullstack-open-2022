const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
    .populate('blogs', { title: 1, author: 1, url: 1 })

  response.status(201).json(users)
})

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  if (!password || password.length < 3){
    response.status(400).json({ error: 'password must be at least 3 letters' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const newUser = new User({
    username,
    name,
    passwordHash
  })

  const savedUser = await newUser.save()

  response.status(201).json(savedUser)
})

module.exports = usersRouter