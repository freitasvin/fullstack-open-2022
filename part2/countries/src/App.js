import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Input } from './components/Input'
import { Countries } from './components/Countries'

const App = () => {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])

  useEffect(() => {
    axios
    .get('https://restcountries.com/v3.1/all')
    .then(response => {
      setCountries(response.data)
    })
  }, [])

  useEffect(() => {
    setFilteredCountries(countries.filter(country => 
      country.name.common.toLowerCase().includes(search.toLowerCase())
    ))
  }, [countries, search]);


  const handleSearch = (event) => {
    setSearch(event.target.value)
  }
  return (
    <div>
      <Input text="find countries" handleSearch={handleSearch}/>

      {search.length > 0 && (
        <Countries countries={filteredCountries}/>
      )}
      
    </div>
  )
}

export default App