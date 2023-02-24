import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer.js'

export const store = configureStore({
  reducer: {
    notification: notificationReducer,
  },
})
