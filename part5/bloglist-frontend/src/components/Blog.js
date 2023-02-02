import React, { useState } from 'react'

export const Blog = ({ blog, updateBlog, user }) => {
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
      likes: blog.likes + 1
    }
    setBlogLikes(blogObject.likes)
    updateBlog(blogObject)
  }

  return ( // todo likes só se estiver logado
    <div className='blog'>
      {blog.title} {blog.author}
      <button onClick={handleClickDetails}>{buttonText}</button>
      {viewDetails &&
        <div>
          <div>{blog.url}</div>
          <div>
            likes: {blogLikes}
            { user && <button onClick={handleLike}>like</button> }
          </div>
          <div>{blog.user.username}</div>
        </div>
      }
    </div>
  )
}