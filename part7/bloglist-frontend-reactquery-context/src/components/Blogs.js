import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { UserContext } from '../contexts/UserContext'
import { BlogForm } from './BlogForm'
import { Togglable } from './Togglable'

export const Blog = ({ user, blog, updateBlog, deleteBlog }) => {
  const [buttonText, setButtonText] = useState('view')
  const [viewDetails, setViewDetails] = useState(false)
  const [blogLikes, setBlogLikes] = useState(blog.likes)

  const handleClickDetails = () => {
    setViewDetails(!viewDetails)
    setButtonText(viewDetails === true ? 'view' : 'hide')
  }

  const handleClickLike = () => {
    const blogObject = {
      ...blog,
      likes: blogLikes + 1,
    }
    updateBlog(blogObject)
    setBlogLikes(blogObject.likes)
  }

  const handleClickRemove = () => deleteBlog(blog)

  return (
    <div className="blog">
      <Link to={`/blogs/${blog.id}`}>
        {blog.title} - {blog.author}
      </Link>
      <button onClick={handleClickDetails}>{buttonText}</button>
      {viewDetails && (
        <div>
          <div>{blog.url}</div>
          <div>
            likes: {blogLikes}
            <button id="like-button" hidden={!user} onClick={handleClickLike}>
              like
            </button>
          </div>
          <div>{blog.user.username}</div>
          <div>
            {user && user.username === blog.user.username && (
              <button id="remove-button" hidden={!user} onClick={handleClickRemove}>
                remove
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export const Blogs = ({ blogs, updateBlog, deleteBlog, addBlog }) => {
  const [user] = useContext(UserContext)
  const likesSort = (b1, b2) => b2.likes - b1.likes
  return (
    <div>
      {user && (
        <Togglable buttonLabel="new blog">
          <BlogForm addBlog={addBlog} />
        </Togglable>
      )}
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
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
}
