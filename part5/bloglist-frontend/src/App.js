import React, { useState, useEffect } from 'react'
import { loginUser, logoutUser } from '../src/services/login'
import { getAllBlog, createBlog, putBlog, removeBlog } from './services/blogs'
import { getUserStorage } from './storage/userStorage'
import { Blog } from './components/Blog'
import { BlogForm } from './components/BlogForm'
import { LoginForm } from './components/LoginForm'
import { Togglable } from './components/Togglable'
import { Notification } from './components/Notification'
import { hideNotification, showNotification } from './reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'

const App = () => {
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const stateNotification = useSelector((state) => state.notification)
  const dispatch = useDispatch()
  console.log(useSelector((state) => state))

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
    try {
      const user = await loginUser(userObject)
      setUser(user)
      dispatch(hideNotification())
    } catch (exception) {
      dispatch(
        showNotification({
          text: 'Wrong username or password',
          type: 'error',
          displayTime: 5,
        })
      )
    }
  }

  const handleLogout = () => {
    logoutUser()
    setUser(null)
  }

  const addBlog = async (newBlog) => {
    try {
      const returnedBlog = await createBlog(newBlog, user)
      setBlogs(blogs.concat({ ...returnedBlog }))
      dispatch(
        showNotification({
          text: `A new blog ${newBlog.title} by ${newBlog.author} added`,
          type: 'success',
          displayTime: 5,
        })
      )
    } catch (exception) {
      dispatch(
        showNotification({
          text: 'Error on add a new blog',
          type: 'error',
          displayTime: 5,
        })
      )
    }
  }

  const updateBlog = async (blogObject) => {
    try {
      const returnedBlog = await putBlog(blogObject, user)
      setBlogs(blogs.map((blog) => (blog.id !== returnedBlog.id ? blog : returnedBlog)))
      dispatch(
        showNotification({
          text: 'The blog was successfully updated',
          type: 'success',
          displayTime: 5,
        })
      )
    } catch (exception) {
      dispatch(
        showNotification({
          text: 'Error on update a blog',
          type: 'error',
          displayTime: 5,
        })
      )
    }
  }

  const deleteBlog = async (blogObject) => {
    if (window.confirm(`Remove ${blogObject.title} by ${blogObject.author}`)) {
      try {
        await removeBlog(blogObject, user)
        setBlogs(blogs.filter((blog) => blog.id !== blogObject.id))
        dispatch(
          showNotification({
            text: `Blog ${blogObject.title} was successfully deleted`,
            type: 'success',
            displayTime: 5,
          })
        )
      } catch (exception) {
        console.log(exception)
        dispatch(
          showNotification({
            text: `Blog ${blogObject.title} was not deleted`,
            type: 'error',
            displayTime: 5,
          })
        )
      }
    }
  }

  const likesSort = (b1, b2) => b2.likes - b1.likes

  return (
    <div>
      <h1>Blogs</h1>
      {user === null ? (
        <Togglable buttonLabel="log in">
          <LoginForm handleLogin={handleLogin} />
        </Togglable>
      ) : (
        <div>
          <div>
            {user.name} logged in
            <button id="logout-button" onClick={handleLogout}>
              logout
            </button>
          </div>
          <Togglable buttonLabel="new blog">
            <BlogForm setBlogs={setBlogs} blogs={blogs} user={user} addBlog={addBlog} />
          </Togglable>
        </div>
      )}
      <div>{stateNotification && <Notification />}</div>
      <div>
        {blogs.sort(likesSort).map((blog) => (
          <Blog
            key={blog.id}
            user={user}
            blog={blog}
            updateBlog={updateBlog}
            deleteBlog={deleteBlog}
          />
        ))}
      </div>
    </div>
  )
}

export default App
