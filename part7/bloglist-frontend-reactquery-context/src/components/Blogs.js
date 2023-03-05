import React, { useContext } from 'react'
import { useQuery } from 'react-query'
import { UserContext } from '../contexts/UserContext'
import { getAllBlog } from '../services/blogs'
import { useUpdateBlog, useDeleteBlog } from '../hooks/mutations'
import { Blog, BlogForm, Togglable } from '../components'

export const Blogs = () => {
  const { user } = useContext(UserContext)
  const { mutate: updateBlog } = useUpdateBlog()
  const { mutate: deleteBlog } = useDeleteBlog()
  const likesSort = (b1, b2) => b2.likes - b1.likes

  const {
    data: blogs,
    isLoading,
    isError,
  } = useQuery('blogs', getAllBlog, {
    refetchOnWindowFocus: false,
    retry: false,
  })

  if (isLoading) {
    return <div>..loading</div>
  }

  if (isError) {
    return <div>blogs service not available due to problems in server</div>
  }

  const handleDeleteBlog = (blogData) => {
    if (window.confirm(`Remove ${blogData.title} by ${blogData.author}`)) {
      deleteBlog({ blogData: blogData })
    }
  }

  const handleLikeBlog = (blogData) => {
    updateBlog({ blogData: blogData })
  }

  return (
    <div>
      {user && (
        <Togglable buttonLabel="new blog">
          <BlogForm />
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
            handleLikeBlog={handleLikeBlog}
            handleDeleteBlog={handleDeleteBlog}
          />
        ))}
    </div>
  )
}
