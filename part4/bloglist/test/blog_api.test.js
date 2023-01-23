const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('../utils/test_helper')
const Blog = require('../models/blogs')

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogsObjects = helper.initialBlogs
    .map( blog => new Blog(blog))
  const promisseArray = blogsObjects
    .map(blog => blog.save())

  await Promise.all(promisseArray)
})

test('blogs are returned as json', async () => {
  api
    .get('/api/blogs')
    .expect(201)
    .expect('Content-Type', /aplication\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(2)
})

afterAll(async () => {
  await mongoose.connection.close()
})