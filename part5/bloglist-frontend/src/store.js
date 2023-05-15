import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer.js'
import blogsReducer from './reducers/blogsReducer.js'

export const store = configureStore({
  reducer: {
    blogs: blogsReducer,
    notification: notificationReducer,
  },
})
