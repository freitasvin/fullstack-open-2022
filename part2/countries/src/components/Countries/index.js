import React from 'react'
import { Country } from '../Country'
import { Button } from '../Button'

export const Countries = ({countries, setSearch}) => {

  if (countries.length > 10){
    return(
      <div>
        <span>Too many matches, specify another filter</span>
      </div>
    )
  } else if (countries.length >= 2){
    return (
      <div>
      {countries.map(country => 
        <p key={country.name.common}>
          {country.name.common} 
          <Button text="show" onClick={() => setSearch(country.name.common)}/>
        </p>
        )
      }
    </div>
    )
  } else if (countries.length){
      return(
        <Country country={countries[0]} />
      )
    }
}