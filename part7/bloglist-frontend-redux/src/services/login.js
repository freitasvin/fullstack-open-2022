import axios from 'axios'
import { saveUserStorage, destroyUserStorage } from '../storage/userStorage'
const baseUrl = '/api/login'

export const loginUser = async (credentials) => {
  const { data } = await axios.post(baseUrl, credentials)
  saveUserStorage(data)
  return data
}

export const logoutUser = () => {
  destroyUserStorage()
}
