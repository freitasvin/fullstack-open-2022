import axios from 'axios'
import React, { useEffect, useState } from 'react'

export const Country = ({country}) => {
  const [weather, setWeather] = useState(null)
  const API_key = process.env.REACT_APP_API_KEY
  const lat = country.latlng[0]
  const lng = country.latlng[1]
  const flag = country.flags.png
  const languages = []

  useEffect(() => {
    axios
    .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=${API_key}`)
    .then(response => {
      setWeather(response.data)
      console.log(response.data)
    })
    .catch(reason => {
      console.log(reason)
    })
  }, [])

  //Countries such as antarctica do not have native languages
  country.languages && Object.keys(country.languages)
  .forEach((key) => {
    languages.push(country.languages[key])
  })


  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>
        <span>capital {country.capital}</span>
        <br/>
        <span>area {country.area}</span>
      </div>

      {country.languages && 
      <div>
        <h3>languages:</h3>
        <ul>
          {languages.map((language, index) => {
            return(
              <li key={index}>{language}</li>
            )
          })}
        </ul>
      </div>
      }

      <img src={flag} alt="Country Flag" style={{width: "200px"}}/>

      <div>
        <h2>Weather in {country.capital}</h2>
        { weather ? (
        <>
          <p>temperature {weather.main.temp} </p>
          <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="weather"/>
          <p>wind {weather.wind.speed} m/s</p>
        </>
        ) : (
          <p>...</p>
        )}
      </div>
    </div>
  )
}