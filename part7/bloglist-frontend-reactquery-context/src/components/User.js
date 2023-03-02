import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

export const User = () => {
  const location = useLocation()
  const [user, setUser] = useState(null)

  useEffect(() => {
    location.state && setUser(location.state.user)
  }, [])

  if (!user) {
    return <div>user not found</div>
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
