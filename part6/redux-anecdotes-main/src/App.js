import { useEffect } from 'react'
import { getAll } from './services/anecdotesService'
import { setAnecdotes } from './reducers/anecdoteReducer'
import Notification from './components/Notification'
import Filter from './components/Filter'
import { AnecdoteForm } from './components/AnecdoteForm'
import { AnecdoteList } from './components/AnecdoteList'
import { useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchData = async () => {
      dispatch(setAnecdotes(await getAll()))
    }

    fetchData()
  }, [dispatch])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App