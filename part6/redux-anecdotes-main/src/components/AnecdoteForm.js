import { useDispatch } from "react-redux"
import { createAnecdote } from '../reducers/anecdoteReducer'

export const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const handleSubmit = (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value

    dispatch(createAnecdote(anecdote))
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