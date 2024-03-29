import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { getAnecdotes, createAnectdote, updateAnecdote } from './requests'
import { useContext } from 'react'
import { NotificationContext } from './NotificationContext'

const App = () => {
  const queryClient = useQueryClient()
  const [notification, notificationDispatcher] = useContext(NotificationContext)

  const { data: allAnecdotes, isLoading, isError } = useQuery('anecdotes', getAnecdotes, {
    refetchOnWindowFocus: false,
    retry: false
  })

  const newAnectdoteMutation = useMutation(createAnectdote, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes')
      queryClient.setQueryData('anecdotes', anecdotes.concat(newAnecdote))
      console.log(newAnecdote) 
      notificationDispatcher({ type: 'SET_NOTIFICATION',  payload: `anecdote '${newAnecdote.content}' added`})
    },
    onError: ({ response }) => {
      const { error } = response.data
      notificationDispatcher({ type: 'SET_NOTIFICATION',  payload: error })
    }
  })

  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes')
      queryClient.setQueryData('anecdotes', anecdotes.map(anecdote => 
        anecdote.id !== updatedAnecdote.id ? anecdote : updatedAnecdote
      ))
      notificationDispatcher({ type: 'SET_NOTIFICATION',  payload: `you voted '${updatedAnecdote.content}'`})
    }
  })

  const addAnecdote = async (anecdote) => {
    newAnectdoteMutation.mutate({ content: anecdote, votes: 0 })
  }

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1})
  }

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

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm addAnecdote={addAnecdote}/>
    
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
