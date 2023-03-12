import React, { useContext } from 'react'
import { useField } from '../hooks/useField'
import { NotificationContext } from '../contexts/NotificationContext'
import { UserContext } from '../contexts/UserContext'
import { useNavigate } from 'react-router-dom'
import { Button, Box, Grid, TextField, Typography } from '@mui/material'

export const LoginForm = () => {
  const { reset: resetUsername, ...usernameProps } = useField('text')
  const { reset: resetPassword, ...passwordProps } = useField('password')
  const { showNotificationDispatcher } = useContext(NotificationContext)
  const { loginUserDispatcher } = useContext(UserContext)
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()

    handleLogin({
      username: usernameProps.value,
      password: passwordProps.value,
    })

    resetUsername()
    resetPassword()
  }

  const handleLogin = async (userObject) => {
    try {
      loginUserDispatcher(userObject)
      navigate('/')
    } catch (exception) {
      showNotificationDispatcher({
        text: 'Wrong username or password',
        errorType: 'error',
        displayTime: 5,
      })
    }
  }
  return (
    <Box
      sx={{
        minHeight: '85%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Grid
        container
        spacing={2}
        direction="column"
        alignItems="center"
        justifyContent="center"
        component="form"
        onSubmit={(event) => handleSubmit(event)}
      >
        <Typography variant="h5">Login</Typography>
        <Grid item xs={3}>
          <TextField
            id="username"
            label="Username"
            variant="outlined"
            size="small"
            {...usernameProps}
          />
        </Grid>
        <Grid item>
          <TextField
            id="password"
            label="Password"
            variant="outlined"
            size="small"
            {...passwordProps}
          />
        </Grid>
        <Grid item>
          <Button variant="outlined" id="login-button" type="submit">
            Login
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}
