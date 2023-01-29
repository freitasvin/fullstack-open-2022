import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import { getAllBlog, createBlog } from './services/blogs'
import { LoginForm } from './components/LoginForm'
import { logoutUser } from './services/login'
import { getUserStorage } from './storage/userStorage'

const App = () => {
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      setBlogs(await getAllBlog())
    }

    fetchData()
  }, [])

  useEffect(() => {
    setUser(getUserStorage())
  }, [])

  const handleLogout = () => {
    logoutUser()
    setUser(null)
  }

  const handleCreate = async () => {
    const returnedBlog = await createBlog({
      title: blogTitle, 
      author: blogAuthor,
      url: blogUrl,
    }, user.token)

    setBlogs([...blogs, returnedBlog])
    setBlogTitle('')
    setBlogAuthor('')
    setBlogUrl('')
  }

  if(!user){
    return (
      <LoginForm 
        setUser={setUser}
        setUsername={setUsername}
        setPassword={setPassword}
        username={username}
        password={password}
      />
    )
  }

  return (
    <div>
      <div>
        {user.username} logged in
        <button onClick={handleLogout}>logout</button>
      </div>
      <div>
        <h1>create new</h1>
        <form onSubmit={handleCreate}>
          <div>
            title
            <input 
              type='text' 
              value={blogTitle}
              onChange={({target}) => {
                setBlogTitle(target.value)
              }}
            />
          </div>
          <div>
            author
            <input 
              type='text' 
              value={blogAuthor}
              onChange={({target}) => {
                setBlogAuthor(target.value)
              }}
            />
          </div>
          <div>
            url
            <input 
              type='text'
              value={blogUrl}
              onChange={({target}) => {
                setBlogUrl(target.value)
              }}
            />
          </div>
          <button type='submit'>create</button>
        </form>
      </div>
      <div>
        <h2>blogs</h2>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}  
      </div>
    </div>
  )
}

export default App