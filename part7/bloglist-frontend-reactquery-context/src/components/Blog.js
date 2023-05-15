import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../contexts/UserContext'
import PropTypes from 'prop-types'
import { Button, Typography } from '@mui/material'

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
      <Typography component={Link} to={`/blogs/${blog.id}`}>
        {blog.title} - {blog.author}
      </Typography>
      <Button onClick={handleClickDetails}>{buttonText}</Button>
      {viewDetails && (
        <div>
          <Typography>{blog.url}</Typography>
          <div>
            likes: {blogLikes}
            <Button
              id="like-button"
              size="small"
              variant="contained"
              hidden={!user}
              onClick={handleClickLike}
            >
              like
            </Button>
          </div>
          <div>{blog.user.username}</div>
          <div>
            {user && user.username === blog.user.username && (
              <Button id="remove-button" hidden={!user} onClick={handleClickRemove}>
                remove
              </Button>
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
