const listHelper = require('../utils/list_helper')

const blogs = [
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
  },
  {
    'id': '63c609845a0f92dc45efddc9',
    'title': 'Coding 2',
    'author': 'Vinicius Freitas',
    'url': 'localhost:3001',
    'likes': 15,
  },
  {
    'id': '63c7387500979eb39fd0b903',
    'title': 'blablabla',
    'author': 'Freitas',
    'url': 'localhost:3002',
    'likes': 90,
  },
  {
    'id': '63c7389800979eb39fd0b905',
    'title': 'Full Stack Open',
    'author': 'Helsinki',
    'url': 'localhost:3003',
    'likes': 80,
  },
  {
    'id': '63c738be00979eb39fd0b907',
    'title': 'Expensive Course',
    'author': 'ABC',
    'url': 'localhost:3004',
    'likes': 0,
  }
]

describe('The sum of all blog likes', () => {
  const listWithOneBlog = blogs[4]

  test('when no blogs', () => {
    const resultNoBLogs = listHelper.totalLikes([])
    expect(resultNoBLogs).toBe(0)
  })

  test('when list has only one blog', () => {
    const resultOneBlog = listHelper.totalLikes([listWithOneBlog])
    expect(resultOneBlog).toBe(80)
  })

  test('when used the blog list', () => {
    const resultListOfBlogs = listHelper.totalLikes(blogs)
    expect(resultListOfBlogs).toBe(267)
  })
})

describe('The bigger amount of likes in a post', () => {
  test('when no blogs', () => {
    const resultNoBlogs = listHelper.biggerLikes([])
    expect(resultNoBlogs).toBe(0)
  })

  test('when used the blog list', () => {
    const resultListOfBlogs = listHelper.biggerLikes(blogs)
    expect(resultListOfBlogs).toBe(90)
  })
})

describe('The most frequent author', () => {
  test('when no blogs', () => {
    const resultNoBlogs = listHelper.mostBlogs([])
    expect(resultNoBlogs).toEqual({})
  })

  test('when list has only one blog', () => {
    const blog = blogs[0]
    const resultOneBlog = listHelper.mostBlogs([blog])
    expect(resultOneBlog).toEqual({
      author: blog.author,
      blogs: 1
    })
  })

  test('when used the blog list', () => {
    const resultListOfBlogs = listHelper.mostBlogs(blogs)
    expect(resultListOfBlogs).toEqual({
      author: 'Vinicius Freitas',
      blogs: 3
    })
  })
})

describe('Favorite author based on likes', () => {
  test('when no blogs', () => {
    const resultNoBlogs = listHelper.mostLikes([])
    expect(resultNoBlogs).toEqual({})
  })

  test('when list has only one blog', () => {
    const blog = blogs[0]
    const resultOneBlog = listHelper.mostLikes([blog])
    expect(resultOneBlog).toEqual({
      author: blog.author,
      likes: 50
    })
  })

  test('when used the blog list', () => {
    const resultListOfBlogs = listHelper.mostLikes(blogs)
    expect(resultListOfBlogs).toEqual({
      author: 'Vinicius Freitas',
      likes: 97
    })
  })
})