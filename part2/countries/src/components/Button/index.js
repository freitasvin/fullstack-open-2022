import React from 'react'

export const Button = ({text, onClick}) => {
  return(
    <button onClick={onClick}>{text}</button>
  )
}