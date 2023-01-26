const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})

  response.status(201).send(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  if(!body.likes){
    body.likes = 0
  }

  const blog = new Blog(body)
  const savedBlog = await blog.save()

  response.status(201).send(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const id = request.params.id

  await Blog.findByIdAndRemove(id)

  response.status(204).end()
})

module.exports = blogsRouter