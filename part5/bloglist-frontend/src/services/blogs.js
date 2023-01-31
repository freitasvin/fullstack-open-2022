import axios from 'axios'
const baseUrl = '/api/blogs'

export const getAllBlog = async () => {
  const { data } = await axios.get(baseUrl)
  return data
}

export const createBlog = async (blogData, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}`},
  }
  const { data } = await axios.post(baseUrl, blogData, config)

  return data
}