import { configureStore } from '@reduxjs/toolkit'
import blogsReducer from './reducers/blogsReducer.js'
import userReducer from './reducers/userReducer.js'

export const store = configureStore({
  reducer: {
    blogs: blogsReducer,
    user: userReducer,
  },
})
