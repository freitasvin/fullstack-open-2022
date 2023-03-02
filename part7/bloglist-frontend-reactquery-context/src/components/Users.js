import React from 'react'
import { useQuery } from 'react-query'
import { getAllUsers } from '../services/users'

export const Users = () => {
  const {
    data: allUsers,
    isLoading,
    isError,
  } = useQuery('users', getAllUsers, {
    refetchOnWindowFocus: false,
    retry: false,
  })

  if (isLoading) {
    return <div>loading users...</div>
  }

  if (isError) {
    return <div>blogs service not available due to problems in server</div>
  }

  return (
    <div>
      <h3>Users</h3>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
          {allUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
