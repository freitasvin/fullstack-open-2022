import { Button } from '../Button'

export const Person = ({person, handleClickDelete}) => {
  return(
    <p>{person.name} {person.number} <Button handleClick={() => handleClickDelete(person.id)} text="delete"/></p>
  )
}