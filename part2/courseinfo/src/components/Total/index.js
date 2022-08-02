import React from "react";

export function Total({parts}) {
  const total = parts.reduce((sum, part) => sum + part.exercises, 0)
  
  return (
    <p>total of {total} exercises</p>
  )
}