import { useSelector, useDispatch } from 'react-redux'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch({
      type: 'VOTE',
      payload: { id }
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value

    dispatch({
      type: 'NEW_ANECDOTE',
      payload: { anecdote }
    })
  }

  const votesSort = (a1, a2) => a2.votes - a1.votes

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.sort(votesSort).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
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

export default App