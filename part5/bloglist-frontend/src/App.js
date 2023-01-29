import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import { getUserStorage } from './storage/userStorage'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    setUser(getUserStorage())
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try{
      const user = await loginService.login({
        username, password
      })
      setUser(user)
      setUsername('')
      setPassword('')
    } catch{
      console.log('Erro no login')
    }
  }

  const handleLogout = () => {
    loginService.logout()
    setUser(null)
  }

  if(!user){
    return (
      <form onSubmit={handleLogin}>
        <div>
          username
          <input 
            type='text' 
            value={username} 
            onChange={({target}) => {setUsername(target.value)}}
          />
        </div>
        <div>
          password
          <input 
            type='password' 
            value={password} 
            onChange={({target}) => {setPassword(target.value)}}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    )
  }

  return (
    <div>
      <div>
        <button onClick={handleLogout}>logout</button>
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