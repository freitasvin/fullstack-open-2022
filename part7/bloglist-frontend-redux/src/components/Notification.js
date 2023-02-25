import React from 'react'
import { useSelector } from 'react-redux'

export const Notification = () => {
  const { text, type } = useSelector((state) => state.notification)

  if (text === null) {
    return null
  }
  console.log(type)

  return <div className={type}>{text}</div>
}
