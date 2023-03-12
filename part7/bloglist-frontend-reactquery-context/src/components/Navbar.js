import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../contexts/UserContext'
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'

export const Navbar = () => {
  const { user, logoutUserDispatcher } = useContext(UserContext)

  const handleClickLogout = () => {
    logoutUserDispatcher()
  }

  return (
    <AppBar position="static">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box>
          <Button variant="inherited" component={Link} to="/">
            Blogs
          </Button>
          <Button variant="inherited" component={Link} to="/users">
            Users
          </Button>
          {user ? (
            <Button variant="inherited" onClick={handleClickLogout}>
              Logout
            </Button>
          ) : (
            <Button variant="inherited" component={Link} to="/login">
              Login
            </Button>
          )}
        </Box>
        {user && <Typography>{user.username} logged in</Typography>}
      </Toolbar>
    </AppBar>
  )
}
