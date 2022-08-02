const Header = ({name}) => {
  return(
    <h1>{name}</h1>
  )
}

const Part = ({part, exercises}) => {
  return(
    <p>{part} {exercises}</p>
  )
}

const Content = ({course}) => {
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

const Course = ({course}) => {
  return (
    <div>
      <Header name={course.name} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

const Total = (props) => {
  return (
    <p>total of {props.course.parts[0].exercises + props.course.parts[1].exercises + props.course.parts[2].exercises} exercises</p>
  )
}

const App = () => {

  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }
  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App