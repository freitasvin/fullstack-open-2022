import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'

const Anecdote = ({ anecdote }) => {
  const dispatch = useDispatch()

  const handleVote = (id) => {
    dispatch(voteAnecdote(id))
  }

  return (
    <div key={anecdote.id}>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={() => handleVote(anecdote.id)}>vote</button>
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