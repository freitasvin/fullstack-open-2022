import React, { useState } from 'react'
import PropTypes from 'prop-types'

export const Blog = ({ user, blog, updateBlog, deleteBlog }) => {
  const [buttonText, setButtonText] = useState('view')
  const [viewDetails, setViewDetails] = useState(false)
  const [blogLikes, setBlogLikes] = useState(blog.likes)

  const handleClickDetails = () => {
    setViewDetails(!viewDetails)
    setButtonText(viewDetails === true ? 'view' : 'hide')
  }

  const handleLike = () => {
    const blogObject = {
      ...blog,
      likes: blogLikes + 1
    }
    updateBlog(blogObject)
    setBlogLikes(blogObject.likes)
  }

  const handleClickRemove = () => deleteBlog(blog)

  return (
    <div className='blog'>
      {blog.title} - {blog.author}
      <button onClick={handleClickDetails}>{buttonText}</button>
      {viewDetails &&
        <div>
          <div>{blog.url}</div>
          <div>
            likes: {blogLikes}
            <button id='like-button' hidden={!user} onClick={handleLike}>like</button>
          </div>
          <div>{blog.user.username}</div>
          <div>
            <button id='remove-button' hidden={!user} onClick={handleClickRemove}>remove</button>
          </div>
        </div>
      }
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
}