import React from 'react'

export const Input = ({text, handleSearch}) => {
  return(
    <div>
      {text} <input type="text" onChange={handleSearch}/>
    </div>
  )
}