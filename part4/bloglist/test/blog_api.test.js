const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const Blog = require('../models/blog')

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

test('the unique identifier property of the blog posts is named id', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body[0].id).toBeDefined()
})

test('a valid note can be added', async () => {
  const newBlog = {
    title: 'Coding 2',
    author: 'Vinicius Freitas',
    url: 'localhost:3001',
    likes: 15,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsInDb = await helper.blogsInDb()

  expect(blogsInDb).toHaveLength(helper.initialBlogs.length + 1)
})

test('if likes property is missing, the default value is 0', async () => {
  const newBlog = {
    title: 'Coding 3',
    author: 'Vinicius Freitas',
    url: 'localhost:3005',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsInDb = await helper.blogsInDb()
  const addedBlog = blogsInDb.find(blog => blog.title === 'Coding 3')

  expect(addedBlog.likes).toBe(0)
})


afterAll(async () => {
  await mongoose.connection.close()
})