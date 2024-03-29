const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const Blog = require('../models/blog')

let headers

beforeAll(async () => {
  const testUser = {
    username: 'test',
    name: 'test',
    password: 'test'
  }

  await api
    .post('/api/users')
    .send(testUser)

  const loggedTestUser = await api
    .post('/api/login')
    .send({
      username: testUser.username,
      password: testUser.password
    })

  headers = {
    'authorization': `Bearer ${loggedTestUser.body.token}`
  }
})

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogsObjects = helper.initialBlogs
    .map( blog => new Blog(blog))
  const promisseArray = blogsObjects
    .map(blog => blog.save())

  await Promise.all(promisseArray)
})

describe('when there is initially some blogs saved', () => {
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
})


describe('addition of a new note', () => {
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
      .set(headers)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsInDb = await helper.blogsInDb()

    expect(blogsInDb).toHaveLength(helper.initialBlogs.length + 1)
  })
})

describe('verifying blog properties', () => {
  test('if likes property is missing, the default value is 0', async () => {
    const newBlog = {
      title: 'Coding 3',
      author: 'Vinicius Freitas',
      url: 'localhost:3005',
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set(headers)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsInDb = await helper.blogsInDb()
    const addedBlog = blogsInDb.find(blog => blog.title === 'Coding 3')

    expect(addedBlog.likes).toBe(0)
  })

  test('if title or url are missing, respond with 400 bad request', async () => {
    const blogWithoutTitle = {
      name: 'Popeye',
      url: 'localhost:4000',
      likes: 35,
    }

    const blogWithoutUrl = {
      title: 'lalaue',
      name: 'Popeye',
      likes: 35,
    }

    await api
      .post('/api/blogs')
      .send(blogWithoutTitle)
      .set(headers)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    await api
      .post('/api/blogs')
      .send(blogWithoutUrl)
      .set(headers)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })
})

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const newBlog = {
      title: 'test',
      author: 'test',
      url: 'test.com'
    }

    const blogToDelete = await api
      .post('/api/blogs')
      .send(newBlog)
      .set(headers)
      .expect(201)
      .expect('Content-Type', /application\/json/)


    await api
      .delete(`/api/blogs/${blogToDelete.body.id}`)
      .set(headers)
      .expect(204)
  })
})

describe('update of a blog', () => {
  test('succeeds when change the likes amount', async () => {
    const allBlogs = await helper.blogsInDb()
    const blogToUpdate = allBlogs[0]
    const oldLikes = blogToUpdate.likes

    blogToUpdate.likes = oldLikes + 1

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)
      .set(headers)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogAfterUpdate = await Blog.findById(blogToUpdate.id)

    expect(blogAfterUpdate.likes).toBe(oldLikes + 1)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})