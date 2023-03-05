import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../contexts/UserContext'

export const Navbar = () => {
  const { user, logoutUserDispatcher } = useContext(UserContext)
  const padding = {
    padding: 5,
  }

  const handleLogout = () => {
    logoutUserDispatcher()
  }

  return (
    <div>
      <Link style={padding} to="/">
        Blogs
      </Link>
      <Link style={padding} to="/users">
        Users
      </Link>
      {user ? (
        <div style={{ padding, display: 'inline-block' }}>
          <em>{user.name} logged in</em>
          <button id="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : (
        <Link style={padding} to="/login">
          Login
        </Link>
      )}
    </div>
  )
}
