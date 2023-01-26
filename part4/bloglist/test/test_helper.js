const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    'id': '63c609845a0f92dc45efddc9',
    'title': 'Call of Duty',
    'author': 'Vinicius Freitas',
    'url': 'localhost:3001',
    'likes': 50,
  },
  {
    'id': '63c609845a0f92dc45efddc9',
    'title': 'Coding',
    'author': 'Vinicius Freitas',
    'url': 'localhost:3001',
    'likes': 32,
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = { initialBlogs, blogsInDb, usersInDb }