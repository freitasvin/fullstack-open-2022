import React, { useContext, useState } from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { UserContext } from '../contexts/UserContext'
import { getBlogById } from '../services/blogs'

export const BlogPost = ({ updateBlog, deleteBlog }) => {
  const params = useParams()
  const [user] = useContext(UserContext)
  const [comment, setComment] = useState('')
  const [blogComments, setBlogComments] = useState([])
  const [blogLikes, setBlogLikes] = useState(0)

  const {
    data: blog,
    isLoading,
    isError,
  } = useQuery('selectedBlog', () => getBlogById(params.id), {
    refetchOnWindowFocus: false,
    retry: false,
    onSuccess: (blog) => {
      setBlogComments(blog.comments)
      setBlogLikes(blog.likes)
    },
  })

  const handleCommentChange = ({ target }) => {
    setComment(target.value)
  }

  const handleClickComment = () => {
    const blogObject = {
      ...blog,
      comments: [...blog.comments, comment],
    }

    updateBlog(blogObject)
    setBlogComments(blogObject.comments)
    setComment('')
  }

  const handleClickLike = () => {
    const blogObject = {
      ...blog,
      likes: blogLikes + 1,
    }
    updateBlog(blogObject)
    setBlogLikes(blogObject.likes)
  }

  const handleClickRemove = () => {
    deleteBlog(blog)
  }

  if (isLoading) {
    return <div>loading blog...</div>
  }

  if (isError) {
    return <div>blog not found</div>
  }

  return (
    <div>
      <h1>{blog.title}</h1>
      <div>{blog.url}</div>
      <div>
        likes: {blogLikes}
        <button id="like-button" hidden={!user} onClick={handleClickLike}>
          like
        </button>
      </div>
      <div>added by {blog.user.username}</div>
      <div>
        {user && user.username === blog.user.username && (
          <button id="remove-button" hidden={!user} onClick={handleClickRemove}>
            remove
          </button>
        )}
      </div>
      <div>
        <h3>comments</h3>
        <div>
          <input type="text" onChange={handleCommentChange} />
          <button onClick={handleClickComment}>add coment</button>
        </div>
        <div>
          <ul>
            {blogComments.map((comment, index) => (
              <li key={index}>{comment}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
