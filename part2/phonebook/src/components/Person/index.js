import { Button } from '../Button'

export const Person = ({person, handleClickDelete}) => {
  return(
    <li className="person">
      {person.name}
      {' '}
      {person.number} 
      <Button handleClick={() => handleClickDelete(person.id)} text="delete"/>
    </li>
  )
}