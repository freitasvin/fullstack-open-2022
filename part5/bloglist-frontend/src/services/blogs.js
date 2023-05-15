import axios from 'axios'
const baseUrl = '/api/blogs'

export const getAllBlog = async () => {
  const { data } = await axios.get(baseUrl)
  return data
}

export const createBlog = async (blogData, user) => {
  const config = {
    headers: { Authorization: `Bearer ${user.token}` },
  }
  const { data } = await axios.post(baseUrl, blogData, config)
  data.user = user
  console.log(blogData)
  return data
}

export const putBlog = async (blogData, user) => {
  const config = {
    headers: { Authorization: `Bearer ${user.token}` },
  }
  const { data } = await axios.put(`${baseUrl}/${blogData.id}`, blogData, config)
  data.user = blogData.user

  return data
}

export const removeBlog = async (blogData, user) => {
  const config = {
    headers: { Authorization: `Bearer ${user.token}` },
  }
  return await axios.delete(`${baseUrl}/${blogData.id}`, config)
}