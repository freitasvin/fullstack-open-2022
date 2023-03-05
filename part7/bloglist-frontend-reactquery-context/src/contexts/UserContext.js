import { createContext, useReducer } from 'react'
import { userReducer } from '../reducers/userReducer'
import { getUserStorage } from '../storage/userStorage'
import { loginUser } from '../services/login'

export const UserContext = createContext()

export const UserContextProvider = ({ children }) => {
  const loggedUser = getUserStorage()
  const [user, userDispatcher] = useReducer(userReducer, loggedUser)

  async function loginUserDispatcher(userCredentials) {
    const newUser = await loginUser(userCredentials)
    userDispatcher({ type: 'SET_USER', payload: newUser })
  }

  function logoutUserDispatcher() {
    userDispatcher({ type: 'REMOVE_USER' })
  }

  return (
    <UserContext.Provider value={{ user, loginUserDispatcher, logoutUserDispatcher }}>
      {children}
    </UserContext.Provider>
  )
}
