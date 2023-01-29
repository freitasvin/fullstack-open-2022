import axios from 'axios';
import { saveUserStorage, destroyUserStorage } from '../storage/userStorage';
const baseUrl = '/api/login'

const login = async credentials => {
  const { data } = await axios.post(baseUrl, credentials)
  saveUserStorage(data)
  return data
}

const logout = () => {
  destroyUserStorage()
}

export default { login, logout }