import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAll = async () => {
  const { data } = await axios.get(baseUrl)
  
  return data
}

export const createNew = async (content) => {
  const newAnecdote = { content, votes: 0 }
  const { data } = await axios.post(baseUrl, newAnecdote)

  return data
}