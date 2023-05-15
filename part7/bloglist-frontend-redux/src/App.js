import React, { useEffect } from 'react'
import { Blog } from './components/Blog'
import { BlogForm } from './components/BlogForm'
import { LoginForm } from './components/LoginForm'
import { Togglable } from './components/Togglable'
import { Notification } from './components/Notification'
import { hideStateNotification, showNotificationDispatcher } from './reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import {
  initializeBlogsDispatcher,
  newBlogDispatcher,
  voteBlogDispatcher,
  removeBlogDispatcher,
} from './reducers/blogsReducer'
import { loginUserDispatcher, logoutUserDipatcher } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()
  const { blogs, notification, user } = useSelector((state) => state)

  useEffect(() => {
    dispatch(initializeBlogsDispatcher())
  }, [])

  const handleLogin = async (userObject) => {
    try {
      dispatch(loginUserDispatcher(userObject))
      dispatch(hideStateNotification())
    } catch (exception) {
      dispatch(
        showNotificationDispatcher({
          text: 'Wrong username or password',
          type: 'error',
          displayTime: 5,
        })
      )
    }
  }

  const handleLogout = () => {
    dispatch(logoutUserDipatcher())
  }

  const addBlog = async (blogData) => {
    try {
      dispatch(newBlogDispatcher(blogData, user))
      dispatch(
        showNotificationDispatcher({
          text: `A new blog ${blogData.title} by ${blogData.author} added`,
          type: 'success',
          displayTime: 5,
        })
      )
    } catch (exception) {
      dispatch(
        showNotificationDispatcher({
          text: 'Error on add a new blog',
          type: 'error',
          displayTime: 5,
        })
      )
    }
  }

  const updateBlog = async (blogObject) => {
    try {
      dispatch(voteBlogDispatcher(blogObject, user))
      dispatch(
        showNotificationDispatcher({
          text: 'The blog was successfully updated',
          type: 'success',
          displayTime: 5,
        })
      )
    } catch (exception) {
      dispatch(
        showNotificationDispatcher({
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
        dispatch(removeBlogDispatcher(blogObject, user))
        dispatch(
          showNotificationDispatcher({
            text: `Blog ${blogObject.title} was successfully deleted`,
            type: 'success',
            displayTime: 5,
          })
        )
      } catch (exception) {
        console.log(exception)
        dispatch(
          showNotificationDispatcher({
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
