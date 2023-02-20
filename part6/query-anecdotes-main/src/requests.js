import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = async () => {
  const { data } = await axios.get(baseUrl)
  return data
}

export const createAnectdote = async (anecdoteData) => {
  const { data } = await axios.post(baseUrl, anecdoteData)
  return data
}

export const updateAnecdote = async (anecdoteData) => {
  const { data } = await axios.put(`${baseUrl}/${anecdoteData.id}`, anecdoteData)
  return data
}