import React, { useContext } from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { UserContext } from '../contexts/UserContext'
import { getBlogById } from '../services/blogs'

export const BlogPost = ({ handleLike, handleClickRemove }) => {
  const params = useParams()
  const [user] = useContext(UserContext)

  const {
    data: blog,
    isLoading,
    isError,
  } = useQuery('selectedBlog', () => getBlogById(params.id), {
    refetchOnWindowFocus: false,
    retry: false,
  })

  if (isLoading) {
    return <div>loading blog...</div>
  }

  if (isError) {
    return <div>blog not found</div>
  }

  console.log(blog)
  return (
    <div>
      <h1>{blog.title}</h1>
      <div>{blog.url}</div>
      <div>
        likes: {blog.likes}
        <button id="like-button" hidden={!user} onClick={handleLike}>
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
    </div>
  )
}
