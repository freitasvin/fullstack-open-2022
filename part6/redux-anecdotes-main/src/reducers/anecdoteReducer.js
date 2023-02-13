import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotesService'

const anecdoteSlice = createSlice({
  initialState: [],
  name: 'anecdotes',
  reducers: {
    updateAnecdote(state, action) {
      return state.map(anecdote => 
        anecdote.id !== action.payload.id
        ? anecdote 
        : action.payload
      )
    },
    appendAnecdote(state, action) {
      return [...state, action.payload]
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const initializeAnecdotes = () => {
  return async dispatch => {
    dispatch(
      setAnecdotes(await anecdoteService.getAll())
    )
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    dispatch(
      appendAnecdote(await anecdoteService.createNew(content))
    )
  }
}

export const voteAnecdote = (anecdote) => {
  return async dispatch => {
    const votedAnectode = {
      ...anecdote,
      votes: anecdote.votes + 1
    }
    dispatch(
      updateAnecdote(await anecdoteService.updateOne(votedAnectode))
    )
  }
}

export const { updateAnecdote, setAnecdotes, appendAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer