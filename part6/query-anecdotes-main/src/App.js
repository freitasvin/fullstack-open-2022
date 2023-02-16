import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery } from 'react-query'
import { getAnecdotes } from './requests'

const App = () => {
  const { data: allAnecdotes, isLoading, isError } = useQuery('notes', getAnecdotes, {
    refetchOnWindowFocus: false,
    retry: false
  })

  if(isLoading){
    return (
      <div>
        ...isLoading
      </div>
    )
  } 
  
  if(isError){
    return (
      <div>
        anecdote service not available due to problems in server
      </div>
    )
  }

  console.log(allAnecdotes)

  const handleVote = (anecdote) => {
    console.log('vote')
  }

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {allAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
