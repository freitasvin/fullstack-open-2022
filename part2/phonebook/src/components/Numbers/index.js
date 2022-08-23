import { Person } from '../Person'
import { Button } from '../Button'

export const Numbers = ({
  persons,
  search,
  handleClickDelete,
}) => {

  return(
    <div>
      <h2>Numbers</h2>
      <div>
        {persons.filter(person => 
          person.name.toLowerCase().includes(search.toLowerCase())
        ).map(person =>
          <div key={person.id}>
            <Person person={person}/> 
            <Button handleClick={() => handleClickDelete(person.id)} text="delete"/>
          </div>
        )}
      </div>
    </div>
  )
}