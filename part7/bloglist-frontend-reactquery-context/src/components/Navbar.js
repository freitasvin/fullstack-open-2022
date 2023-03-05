import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../contexts/UserContext'

export const Navbar = ({ handleLogout }) => {
  const [user] = useContext(UserContext)
  const padding = {
    padding: 5,
  }
  return (
    <div>
      <Link style={padding} to={'/'}>
        blogs
      </Link>
      <Link style={padding} to={'/users'}>
        users
      </Link>
      {user && (
        <div style={{ padding, display: 'inline-block' }}>
          <em>{user.name} logged in</em>
          <button id="logout-button" onClick={handleLogout}>
            logout
          </button>
        </div>
      )}
    </div>
  )
}
