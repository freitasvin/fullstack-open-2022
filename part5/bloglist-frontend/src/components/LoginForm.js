import { loginUser } from '../services/login'

export const LoginForm = ({
  setUser,
  setUsername,
  setPassword,
  username,
  password,
  setMessage,
}) => {

  const handleLogin = async (event) => {
    event.preventDefault()
  
    try{
      const user = await loginUser({
        username, password
      })
      setUser(user)
      setUsername('')
      setPassword('')
      setMessage(null)
    } catch{
      setMessage({
        type: 'error',
        text: 'wrong username or password'
      })

      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  return (
    <div>
      <h1>log in to application</h1>
      <form onSubmit={handleLogin}>
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