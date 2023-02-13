import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const { data } = await axios.get(baseUrl)
  
  return data
}

const createNew = async (content) => {
  const newAnecdote = { content, votes: 0 }
  const { data } = await axios.post(baseUrl, newAnecdote)

  return data
}

const anecdoteService = {
  getAll,
  createNew
}

export default anecdoteService