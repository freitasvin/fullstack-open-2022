import React, { useContext } from 'react'
import { NotificationContext } from '../contexts/notificationContext'

export const Notification = () => {
  const [notification] = useContext(NotificationContext)

  return <div className={notification.errorType}>{notification.text}</div>
}
