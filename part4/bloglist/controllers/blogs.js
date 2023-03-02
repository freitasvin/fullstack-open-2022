const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
    .populate('user', { username: 1, name: 1 })

  response.status(201).json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
    .populate('user', { username: 1, name: 1 })

  response.status(201).json(blog)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const user = request.user

  const newBlog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  })

  const savedBlog = await newBlog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.put('/:id', async (request, response) => {
  const id = request.params.id
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0
  }

  const updatedBlog = await Blog.findByIdAndUpdate(id, blog, { new: true })
  response.json(updatedBlog.toJSON())
})

blogsRouter.delete('/:id', async (request, response) => {
  const id = request.params.id
  const user = request.user
  const blogToDelete = await Blog.findById(id)

  if (!(blogToDelete.user.toString() === user.id.toString())){
    return response.status(401).end()
  }

  user.blogs = user.blogs.filter(blog => blog.toString() !== blogToDelete.id.toString())
  await blogToDelete.delete()
  await user.save()
  response.status(204).end()
})

module.exports = blogsRouter