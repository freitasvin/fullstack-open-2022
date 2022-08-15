import React from 'react'

export const Country = ({country}) => {
  const flag = country.flags.png
  let languages = []

    Object.keys(country.languages)
    .forEach((key, index) => {
      languages[index] = country.languages[key]
    })
 
  

  return (
    <div>
      <div>
        <h1>{country.name.common}</h1>
      </div>

      <div>
        <p>capital {country.capital}</p>
        <p>area {country.area}</p>
      </div>

      <div>
        <h3>languages:</h3>
        <div>
          <ul>
            {languages.map((language, index) => {
              return(
                <li key={index}>{language}</li>
              )
            })}
          </ul>
        </div>
      </div>

      <div>
        <img src={flag} alt="Country Flag" style={{width: "200px"}}/>
      </div>
    </div>
  )
}