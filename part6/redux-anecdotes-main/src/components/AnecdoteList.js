import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote }) => {
  const dispatch = useDispatch()

  const handleVote = () => {
    dispatch(voteAnecdote(anecdote))
    dispatch(showNotification(`you voted '${anecdote.content}'`, 5))
  }

  return (
    <div key={anecdote.id}>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={handleVote}>vote</button>
      </div>
    </div>
  )
}

export const AnecdoteList = () => {
  const { anecdotes, filter } = useSelector(state => state)

  const byAnecdote = (anecdote) => (
    anecdote
      .content
      .toLowerCase()
      .includes(filter.toLowerCase())
  )
  
  const votesSort = (a1, a2) => a2.votes - a1.votes

  return (
    <div>
      {anecdotes
        .filter(byAnecdote)
        .sort(votesSort)
        .map(anecdote =>
          <Anecdote key={anecdote.id} anecdote={anecdote}/>
        )
      }
    </div>
  )
}