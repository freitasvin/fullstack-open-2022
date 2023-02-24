import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useNotes = (url) => {
  const [notes, setNotes] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(url)
      setNotes(data)
    }

    fetchData()
  }, [url])

  return notes
}

const App = () => {
  const [counter, setCounter] = useState(0)
  const [values, setValues] = useState([])

  const notes = useNotes(BACKEND_URL)
  console.log(notes);

  const handleClick = () => {
    setCounter(counter + 1)
    setValues(values.concat(counter))
  }

  return (
    <div className='container'>
      <button onClick={handleClick}>press</button>
      hello webpack {counter} clicks
      {
        notes.map(note => {
          return (
            <div key={note.id}>
              {note.content}
            </div>
          )
        })
      }
    </div>
  )
}

export default App