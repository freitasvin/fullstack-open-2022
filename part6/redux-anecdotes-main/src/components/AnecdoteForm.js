import { useDispatch } from "react-redux"
import { createNew } from "../services/anecdotesService"
import { createAnecdote } from '../reducers/anecdoteReducer'

export const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const handleSubmit = async (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    event.target.anecdote.value = ''

    const newAnecdote = await createNew(anecdote)
    dispatch(createAnecdote(newAnecdote))
  }

  return (
    <div>
    <h2>create new</h2>
    <form onSubmit={handleSubmit}>
      <div>
        <input name='anecdote' />
      </div>
      <button>create</button>
    </form>    
    </div>
  )
}