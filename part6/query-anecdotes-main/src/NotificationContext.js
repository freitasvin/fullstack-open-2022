import { createContext, useReducer } from 'react'

export const NotificationContext = createContext()

const notificationReducer = (state, action) => {
  switch(action.type){
    case 'SET_NOTIFICATION': 
      return action.payload
    case 'HIDE_NOTIFICATION':
      return null
    default:
      return state
  }
}

export const NotificationContextProvider = ({ children }) => {
  const [notification, notificationDispatcher] = useReducer(notificationReducer, null)

  return(
    <NotificationContext.Provider value={[notification, notificationDispatcher]}>
      {children}
    </NotificationContext.Provider>
  )
}