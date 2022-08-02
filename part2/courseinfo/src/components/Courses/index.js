import React from "react"
import { Course } from '../Course';

export const Courses = ({courses}) => {
  return(
    courses.map((course) => {
      return(
        <div>
          <Course key={course.id} course={course} />
        </div>
      )
    })
  )
}