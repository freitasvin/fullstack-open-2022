import { useState } from 'react'

export const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
  
    handleLogin({
      username: username,
      password: password
    })

    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={event => handleSubmit(event)}>
        <div>
          username
          <input 
            type='text' 
            value={username} 
            onChange={({target}) => {setUsername(target.value)}}
          />
        </div>
        <div>
          password
          <input 
            type='password' 
            value={password} 
            onChange={({target}) => {setPassword(target.value)}}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}