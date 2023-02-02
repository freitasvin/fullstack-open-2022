import React from 'react'
export const Notification = ({ type, message }) => {
  if (message === null){
    return null
  }
  console.log(type)

  return(
    <div className={type}>
      {message}
    </div>
  )
}