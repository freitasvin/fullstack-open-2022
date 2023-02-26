import React, { useEffect, useContext } from 'react'
import { Blog } from './components/Blog'
import { BlogForm } from './components/BlogForm'
import { LoginForm } from './components/LoginForm'
import { Togglable } from './components/Togglable'
import { Notification } from './components/Notification'
import { useDispatch, useSelector } from 'react-redux'
import {
  initializeBlogsDispatcher,
  newBlogDispatcher,
  voteBlogDispatcher,
  removeBlogDispatcher,
} from './reducers/blogsReducer'
import { loginUserDispatcher, logoutUserDipatcher } from './reducers/userReducer'
import { NotificationContext } from './contexts/notificationContext'

const App = () => {
  const dispatch = useDispatch()
  const { blogs, user } = useSelector((state) => state)
  const [notification, showNotificationDispatcher] = useContext(NotificationContext)

  useEffect(() => {
    dispatch(initializeBlogsDispatcher())
  }, [])

  const handleLogin = async (userObject) => {
    try {
      dispatch(loginUserDispatcher(userObject))
    } catch (exception) {
      showNotificationDispatcher({
        text: 'Wrong username or password',
        errorType: 'error',
        displayTime: 5,
      })
    }
  }

  const handleLogout = () => {
    dispatch(logoutUserDipatcher())
  }

  const addBlog = async (blogData) => {
    try {
      dispatch(newBlogDispatcher(blogData, user))
      showNotificationDispatcher({
        text: `A new blog ${blogData.title} by ${blogData.author} added`,
        errorType: 'success',
        displayTime: 5,
      })
    } catch (exception) {
      showNotificationDispatcher({
        text: 'Error on add a new blog',
        errorType: 'error',
        displayTime: 5,
      })
    }
  }

  const updateBlog = async (blogObject) => {
    try {
      dispatch(voteBlogDispatcher(blogObject, user))
      showNotificationDispatcher({
        text: 'The blog was successfully updated',
        errorType: 'success',
        displayTime: 5,
      })
    } catch (exception) {
      showNotificationDispatcher({
        text: 'Error on update a blog',
        errorType: 'error',
        displayTime: 5,
      })
    }
  }

  const deleteBlog = async (blogObject) => {
    if (window.confirm(`Remove ${blogObject.title} by ${blogObject.author}`)) {
      try {
        dispatch(removeBlogDispatcher(blogObject, user))
        showNotificationDispatcher({
          text: `Blog ${blogObject.title} was successfully deleted`,
          errorType: 'success',
          displayTime: 5,
        })
      } catch (exception) {
        console.log(exception)
        showNotificationDispatcher({
          text: `Blog ${blogObject.title} was not deleted`,
          errorType: 'error',
          displayTime: 5,
        })
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
            <BlogForm addBlog={addBlog} />
          </Togglable>
        </div>
      )}
      <div>{notification && <Notification />}</div>
      <div>
        {blogs
          .slice() //the array is frozen in strict mode by the state
          .sort(likesSort)
          .map((blog) => (
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
