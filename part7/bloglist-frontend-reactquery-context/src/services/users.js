import axios from 'axios'

const baseUrl = '/api/users'

export const getAllUsers = async () => {
  const { data } = await axios.get(baseUrl)
  return data
}

export const getUserById = async (userId) => {
  const { data } = await axios.get(`${baseUrl}/${userId}`)
  return data
}
