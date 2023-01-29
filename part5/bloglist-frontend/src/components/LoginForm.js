import { loginUser } from '../services/login'

export const LoginForm = ({
  setUser,
  setUsername,
  setPassword,
  username,
  password
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
    } catch{
      console.log('Erro no login')
    }
  }

  return (
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
  )
}