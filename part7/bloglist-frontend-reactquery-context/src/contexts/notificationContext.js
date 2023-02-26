import { createContext, useReducer } from 'react'
import { notificationReducer } from '../reducers/notificationReducer'

export const NotificationContext = createContext()

export const NotificationContextProvider = ({ children }) => {
  const [notification, notificationDispatcher] = useReducer(notificationReducer, null)

  const showNotificationDispatcher = ({ text, errorType, displayTime = 5 }) => {
    if (!notification) {
      notificationDispatcher({ type: 'SET_NOTIFICATION', payload: { text, errorType } })
      setTimeout(() => {
        notificationDispatcher({ type: 'HIDE_NOTIFICATION' })
      }, displayTime * 1000)
    }
  }

  return (
    <NotificationContext.Provider value={[notification, showNotificationDispatcher]}>
      {children}
    </NotificationContext.Provider>
  )
}
