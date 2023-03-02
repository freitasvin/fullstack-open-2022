import React, { useContext } from 'react'
import { NotificationContext } from '../contexts/NotificationContext'

export const Notification = () => {
  const [notification] = useContext(NotificationContext)

  return <div className={notification.errorType}>{notification.text}</div>
}
