import { createSlice } from '@reduxjs/toolkit'
import { getAllBlog, createBlog, putBlog, removeBlog } from '../services/blogs'

const blogsSlice = createSlice({
  initialState: [],
  name: 'blogs',
  reducers: {
    setStateBlogs: (state, action) => {
      return action.payload
    },
    appendStateBlog: (state, action) => {
      return [...state, action.payload]
    },
    updateStateBlog: (state, action) => {
      return state.map((blog) => (blog.id !== action.payload.id ? blog : action.payload))
    },
    deleteStateBlog: (state, action) => {
      console.log(`deleteStateBlog: ${JSON.stringify(action.payload)}`)
      return state.filter((blog) => blog.id !== action.payload.id)
    },
  },
})

export const initializeBlogsDispatcher = () => {
  return async (dispatch) => {
    dispatch(setStateBlogs(await getAllBlog()))
  }
}

export const newBlogDispatcher = (blog, user) => {
  return async (dispatch) => {
    dispatch(appendStateBlog(await createBlog(blog, user)))
  }
}

export const voteBlogDispatcher = (blog, user) => {
  return async (dispatch) => {
    dispatch(updateStateBlog(await putBlog(blog, user)))
  }
}

export const removeBlogDispatcher = (blog, user) => {
  return async (dispatch) => {
    await removeBlog(blog, user)
    dispatch(deleteStateBlog(blog))
  }
}

export default blogsSlice.reducer
export const { setStateBlogs, appendStateBlog, updateStateBlog, deleteStateBlog } =
  blogsSlice.actions
