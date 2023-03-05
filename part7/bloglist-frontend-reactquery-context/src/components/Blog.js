import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../contexts/UserContext'
import PropTypes from 'prop-types'

export const Blog = ({ blog, handleDeleteBlog, handleLikeBlog }) => {
  const [buttonText, setButtonText] = useState('view')
  const [viewDetails, setViewDetails] = useState(false)
  const [blogLikes, setBlogLikes] = useState(blog.likes)
  const { user } = useContext(UserContext)

  const handleClickDetails = () => {
    setViewDetails(!viewDetails)
    setButtonText(viewDetails === true ? 'view' : 'hide')
  }

  const handleClickLike = () => {
    const blogObject = {
      ...blog,
      likes: blogLikes + 1,
    }
    handleLikeBlog(blogObject)
    setBlogLikes(blogObject.likes)
  }

  const handleClickRemove = () => handleDeleteBlog(blog)

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

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleLikeBlog: PropTypes.func.isRequired,
  handleDeleteBlog: PropTypes.func.isRequired,
}
