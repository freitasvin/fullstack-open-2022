import { useState } from 'react'
import { createBlog } from '../services/blogs'

export const BlogForm = ({setBlogs, setMessage, user, blogs}) => {
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

  const handleCreate = async (event) => {    
    event.preventDefault()

    const newBlog = {
      title: blogTitle, 
      author: blogAuthor,
      url: blogUrl,
    }

    try{
      const returnedBlog = await createBlog(newBlog, user.token)
  
      setBlogs(blogs.concat(returnedBlog))
      setMessage({
        type: 'success',
        text: `a new blog ${blogTitle} by ${blogAuthor} added`
      })
      setBlogTitle('')
      setBlogAuthor('')
      setBlogUrl('')

      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch {
      setMessage({
        type: 'error',
        text: `error on add a new blog`
      })

      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  return (
    <div>
      <h1>create new</h1>
      <form onSubmit={handleCreate}>
        <div>
          title
          <input 
            type='text' 
            value={blogTitle}
            onChange={({target}) => {
              setBlogTitle(target.value)
            }}
          />
        </div>
        <div>
          author
          <input 
            type='text' 
            value={blogAuthor}
            onChange={({target}) => {
              setBlogAuthor(target.value)
            }}
          />
        </div>
        <div>
          url
          <input 
            type='text'
            value={blogUrl}
            onChange={({target}) => {
              setBlogUrl(target.value)
            }}
          />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}