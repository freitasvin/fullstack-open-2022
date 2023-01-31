import { useState, useEffect } from 'react'
import { Blog } from './components/Blog'
import { LoginForm } from './components/LoginForm'
import { Notification } from './components/Notification'
import { logoutUser } from './services/login'
import { getUserStorage } from './storage/userStorage'
import { getAllBlog } from './services/blogs'
import { BlogForm } from './components/BlogForm'

const App = () => {
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
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

  const handleLogout = () => {
    logoutUser()
    setUser(null)
  }

  if(!user){
    return (
      <div>
        <h1>log in to application</h1>
        {message && 
          <Notification type={message.type} message={message.text}/>
        }
        <LoginForm 
          setUser={setUser}
          setUsername={setUsername}
          setPassword={setPassword}
          username={username}
          password={password}
          setMessage={setMessage}
        />  
      </div>
    )
  }

  return (
    <div>
      <div>
        {user.username} logged in
        <button onClick={handleLogout}>logout</button>
      </div>
      <div>
        {message && 
          <Notification type={message.type} message={message.text}/>
        }
      </div>
      <BlogForm 
        setBlogs={setBlogs} 
        setMessage={setMessage} 
        user={user}
        blogs={blogs}
      />
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