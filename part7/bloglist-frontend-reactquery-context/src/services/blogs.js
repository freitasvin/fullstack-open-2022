import axios from 'axios'
import { getUserStorage, getUserTokenStorage } from '../storage/userStorage'

const blogApi = axios.create({
  baseURL: '/api/blogs',
  headers: { Authorization: `Bearer ${getUserTokenStorage()}` },
})

export const getAllBlog = async () => {
  const { data } = await blogApi.get('/')
  return data
}

export const getBlogById = async (blogId) => {
  const { data } = await blogApi.get(`/${blogId}`)
  return data
}

export const createBlog = async ({ blogData }) => {
  const { data } = await blogApi.post('/', blogData)
  const user = getUserStorage()
  data.user = user
  return data
}

export const putBlog = async ({ blogData }) => {
  const { data } = await blogApi.put(`/${blogData.id}`, blogData)
  data.user = blogData.user

  return data
}

export const removeBlog = async ({ blogData }) => {
  await blogApi.delete(`/${blogData.id}`)

  return blogData
}
