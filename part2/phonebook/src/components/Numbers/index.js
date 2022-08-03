import { Person } from "../Person"

export const Numbers = ({
  persons,
  search
}) => {
  return(
    <div>
      <h2>Numbers</h2>
      <div>
        {persons.filter(person => 
          person.name.toLowerCase().includes(search.toLowerCase())
        ).map(person => 
          <Person key={person.name} person={person}/>
        )}
      </div>
    </div>
  )
}