import { useState, useEffect } from 'react'
import { loginUser, logoutUser } from '../src/services/login'
import { getAllBlog, createBlog } from './services/blogs'
import { getUserStorage } from './storage/userStorage'
import { Blog } from './components/Blog'
import { BlogForm } from './components/BlogForm'
import { LoginForm } from './components/LoginForm'
import { Toggleable } from './components/Toggleable'
import { Notification } from './components/Notification'

const App = () => {
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      setBlogs(await getAllBlog())
    }

    fetchData()
  }, [])

  useEffect(() => {
    setUser(getUserStorage())
  }, [])

  const handleLogin = async (userObject) => {
    try{
      const user = await loginUser(userObject)
      setUser(user)
      setMessage(null)
    } catch{
      setMessage({
        type: 'error',
        text: 'wrong username or password'
      })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    logoutUser()
    setUser(null)
  }

  const addBlog = async (newBlog) => {
    try{
      const returnedBlog = await createBlog(newBlog, user.token)
      setBlogs(blogs.concat(returnedBlog))
      setMessage({
        type: 'success',
        text: `a new blog ${newBlog.title} by ${newBlog.author} added`
      })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch {
      setMessage({
        type: 'error',
        text: 'error on add a new blog'
      })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  return (
    <div>
      <h1>Blogs</h1>
      {user === null 
        ? <Toggleable buttonLabel='log in'>
            <LoginForm handleLogin={handleLogin}/>
          </Toggleable>
        : <div>
            <div>
              {user.name} logged in
              <button onClick={handleLogout}>logout</button>
            </div>
            <Toggleable buttonLabel='new blog'>
              <BlogForm 
                setBlogs={setBlogs} 
                blogs={blogs}
                user={user}
                addBlog={addBlog}
              />
            </Toggleable>
          </div>
      }
      <div>
        {message && 
          <Notification type={message.type} message={message.text}/>
        }
      </div>
      <div>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}  
      </div>
    </div>
  )
}

export default App