import React, { useState, useEffect } from 'react'
import { loginUser, logoutUser } from '../src/services/login'
import { getAllBlog, createBlog, putBlog, removeBlog } from './services/blogs'
import { getUserStorage } from './storage/userStorage'
import { Blog } from './components/Blog'
import { BlogForm } from './components/BlogForm'
import { LoginForm } from './components/LoginForm'
import { Togglable } from './components/Togglable'
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
    } catch (exception){
      setMessage({
        type: 'error',
        text: 'Wrong username or password'
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
      const returnedBlog = await createBlog(newBlog, user)
      setBlogs(blogs.concat({ ...returnedBlog }))
      setMessage({
        type: 'success',
        text: `A new blog ${newBlog.title} by ${newBlog.author} added`
      })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (exception){
      setMessage({
        type: 'error',
        text: 'error on add a new blog'
      })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const updateBlog = async (blogObject) => {
    try{
      const returnedBlog = await putBlog(blogObject, user)
      setBlogs(blogs.map(blog => blog.id !== returnedBlog.id ? blog : returnedBlog))
      setMessage({
        type: 'success',
        text: 'The blog was successfully updated'
      })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (exception) {
      setMessage({
        type: 'error',
        text: 'Error on update a blog'
      })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const deleteBlog = async (blogObject) => {
    if (window.confirm(`Remove ${blogObject.title} by ${blogObject.author}`)){
      try{
        await removeBlog(blogObject, user)
        setBlogs(blogs.filter(blog => blog.id !== blogObject.id))
        setMessage({
          type: 'success',
          text: `Blog ${blogObject.title} was successfully deleted`
        })
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      } catch (exception) {
        console.log(exception)
        setMessage({
          type: 'error',
          text: `Blog ${blogObject.title} was not deleted`
        })
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      }
    }
  }

  const likesSort = (b1, b2) => b2.likes - b1.likes

  return (
    <div>
      <h1>Blogs</h1>
      {user === null
        ?
        <Togglable buttonLabel='log in'>
          <LoginForm handleLogin={handleLogin}/>
        </Togglable>
        :
        <div>
          <div>
            {user.name} logged in
            <button id='logout-button' onClick={handleLogout}>logout</button>
          </div>
          <Togglable buttonLabel='new blog'>
            <BlogForm
              setBlogs={setBlogs}
              blogs={blogs}
              user={user}
              addBlog={addBlog}
            />
          </Togglable>
        </div>
      }
      <div>
        {message &&
          <Notification type={message.type} message={message.text}/>
        }
      </div>
      <div>
        {blogs.sort(likesSort).map(blog =>
          <Blog
            key={blog.id}
            user={user}
            blog={blog}
            updateBlog={updateBlog}
            deleteBlog={deleteBlog}
          />
        )}
      </div>
    </div>
  )
}

export default App