import { createSlice } from '@reduxjs/toolkit'
import { getAllBlog, createBlog } from '../services/blogs'

const blogsSlice = createSlice({
  initialState: [],
  name: 'blogs',
  reducers: {
    setBlogs: (state, action) => {
      return action.payload
    },
    appendBlog: (state, action) => {
      return [...state, action.payload]
    },
  },
})

export const initializeBlogs = () => {
  return async (dispatch) => {
    dispatch(setBlogs(await getAllBlog()))
  }
}

export const newBlog = (blog, user) => {
  return async (dispatch) => {
    dispatch(appendBlog(await createBlog(blog, user)))
  }
}

export default blogsSlice.reducer
export const { setBlogs, appendBlog } = blogsSlice.actions
