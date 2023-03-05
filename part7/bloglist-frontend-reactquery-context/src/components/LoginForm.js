import React, { useContext } from 'react'
import { useField } from '../hooks/useField'
import { NotificationContext } from '../contexts/NotificationContext'
import { UserContext } from '../contexts/UserContext'
import { useNavigate } from 'react-router-dom'

export const LoginForm = () => {
  const { reset: resetUsername, ...usernameProps } = useField('text')
  const { reset: resetPassword, ...passwordProps } = useField('text')
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
    <div>
      <h1>Login</h1>
      <form onSubmit={(event) => handleSubmit(event)}>
        <div>
          username
          <input id="username" {...usernameProps} />
        </div>
        <div>
          password
          <input id="password" {...passwordProps} />
        </div>
        <button id="login-button" type="submit">
          login
        </button>
      </form>
    </div>
  )
}
