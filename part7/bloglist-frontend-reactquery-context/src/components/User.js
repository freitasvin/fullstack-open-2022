import React from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { getUserById } from '../services/users'

export const User = () => {
  const params = useParams()
  const {
    data: user,
    isLoading,
    isError,
  } = useQuery('selectedUser', () => getUserById(params.id), {
    refetchOnWindowFocus: false,
    retry: false,
  })

  if (isLoading) {
    return <div>loading user...</div>
  }

  if (isError) {
    return <div>user not foud</div>
  }

  return (
    <div>
      <h1>{user.username}</h1>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}
