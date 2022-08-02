import React from "react"
import { Part } from '../Part'

export const Content = ({course}) => {
  return(
    <>
      {course.parts.map((part) => { 
        return(
        <Part key={part.id} part={part.name} exercises={part.exercises} />
        )
      })}
    </>
  )
}