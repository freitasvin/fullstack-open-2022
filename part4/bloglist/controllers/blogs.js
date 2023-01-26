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

blogsRouter.put('/:id', async (request, response) => {
  const id = request.params.id
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(id, blog)

  response.json(updatedBlog.toJSON())
})

blogsRouter.delete('/:id', async (request, response) => {
  const id = request.params.id

  await Blog.findByIdAndRemove(id)

  response.status(204).end()
})

module.exports = blogsRouter