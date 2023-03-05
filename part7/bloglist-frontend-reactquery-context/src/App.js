import React, { useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Blogs } from './components/Blogs'
import { Users } from './components/Users'
import { LoginForm } from './components/LoginForm'
import { Togglable } from './components/Togglable'
import { Notification } from './components/Notification'
import { User } from './components/User'
import { BlogPost } from './components/BlogPost'
import { Navbar } from './components/Navbar'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { NotificationContext } from './contexts/NotificationContext'
import { createBlog, getAllBlog, putBlog, removeBlog } from './services/blogs'
import { UserContext } from './contexts/UserContext'

const App = () => {
  const queryClient = useQueryClient()
  const [notification, showNotificationDispatcher] = useContext(NotificationContext)
  const [user, loginUserDispatcher, logoutUserDipatcher] = useContext(UserContext)

  const {
    data: blogs,
    isLoading,
    isError,
  } = useQuery('blogs', getAllBlog, {
    refetchOnWindowFocus: false,
    retry: false,
  })

  const newBlogMutation = useMutation(createBlog, {
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData('blogs')
      queryClient.setQueryData('blogs', blogs.concat(newBlog))
      showNotificationDispatcher({
        text: `A new blog ${newBlog.title} by ${newBlog.author} added`,
        errorType: 'success',
        displayTime: 5,
      })
    },
    onError: () => {
      showNotificationDispatcher({
        text: 'Error on add a new blog',
        errorType: 'error',
        displayTime: 5,
      })
    },
  })

  const updateBlogMutation = useMutation('blogs', putBlog, {
    onSuccess: (updatedBlog) => {
      const blogs = queryClient.getQueryData('blogs')
      queryClient.setQueryData(
        blogs.map((blog) => (blog.id !== updatedBlog.id ? blog : updatedBlog))
      )
      showNotificationDispatcher({
        text: 'The blog was successfully updated',
        errorType: 'success',
        displayTime: 5,
      })
    },
    onError: () => {
      showNotificationDispatcher({
        text: 'Error on update a blog',
        errorType: 'error',
        displayTime: 5,
      })
    },
  })

  const deleteBlogMutation = useMutation('blogs', removeBlog, {
    onSuccess: (deletedBlog) => {
      queryClient.invalidateQueries()
      showNotificationDispatcher({
        text: `Blog ${deletedBlog.title} was successfully deleted`,
        errorType: 'success',
        displayTime: 5,
      })
    },
    onError: () => {
      showNotificationDispatcher({
        text: 'Blog was not deleted',
        errorType: 'error',
        displayTime: 5,
      })
    },
  })

  const handleLogin = async (userObject) => {
    try {
      loginUserDispatcher(userObject)
    } catch (exception) {
      showNotificationDispatcher({
        text: 'Wrong username or password',
        errorType: 'error',
        displayTime: 5,
      })
    }
  }

  const handleLogout = () => {
    logoutUserDipatcher()
  }

  const addBlog = async (blogData) => {
    newBlogMutation.mutate({ blogData: blogData, user: user })
  }

  const updateBlog = async (blogData) => {
    updateBlogMutation.mutate({ blogData: blogData, user: user })
  }

  const deleteBlog = async (blogData) => {
    if (window.confirm(`Remove ${blogData.title} by ${blogData.author}`)) {
      deleteBlogMutation.mutate({ blogData: blogData, user: user })
    }
  }

  if (isLoading) {
    return <div>..loading</div>
  }

  if (isError) {
    return <div>blogs service not available due to problems in server</div>
  }

  return (
    <div>
      <Navbar handleLogout={handleLogout} />
      <h1>Blogs</h1>
      {user === null && (
        <Togglable buttonLabel="log in">
          <LoginForm handleLogin={handleLogin} />
        </Togglable>
      )}
      <div>{notification && <Notification />}</div>
      <Routes>
        <Route
          path="/"
          element={
            <Blogs
              blogs={blogs}
              updateBlog={updateBlog}
              deleteBlog={deleteBlog}
              addBlog={addBlog}
            />
          }
        />
        <Route path="/users" element={<Users />} />
        <Route path="/user/:id" element={<User />} />
        <Route
          path="/blogs/:id"
          element={<BlogPost updateBlog={updateBlog} deleteBlog={deleteBlog} />}
        />
      </Routes>
    </div>
  )
}

export default App
