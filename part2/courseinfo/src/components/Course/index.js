import React from "react"
import { Header } from '../Header'
import { Content } from '../Content'
import { Total } from '../Total'

export const Course = ({course}) => {
  return (
    <div>
      <Header name={course.name} />
      <Content course={course} />
      <Total parts={course.parts} />
    </div>
  )
}