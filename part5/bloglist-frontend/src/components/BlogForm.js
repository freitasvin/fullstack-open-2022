import React, { useState } from 'react'
import PropTypes from 'prop-types'

export const BlogForm = ({ addBlog }) => {
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()

    addBlog({
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl,
    })

    setBlogTitle('')
    setBlogAuthor('')
    setBlogUrl('')
  }

  return (
    <div>
      <h1>create new</h1>
      <form onSubmit={handleSubmit}>
        <div>
          title
          <input
            id='title'
            type='text'
            value={blogTitle}
            onChange={({ target }) => {
              setBlogTitle(target.value)
            }}
          />
        </div>
        <div>
          author
          <input
            id='author'
            type='text'
            value={blogAuthor}
            onChange={({ target }) => {
              setBlogAuthor(target.value)
            }}
          />
        </div>
        <div>
          url
          <input
            id='url'
            type='text'
            value={blogUrl}
            onChange={({ target }) => {
              setBlogUrl(target.value)
            }}
          />
        </div>
        <button id='create-button' type='submit'>create</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired,
}