import { createSlice } from "@reduxjs/toolkit";

const initialState = null

const notificationSlice = createSlice({
  initialState,
  name: 'notification',
  reducers: {
    setNotification(state, action){
      return action.payload
    },
    hideNotification(state, action){
      return null
    }
  }
})

export const { setNotification, hideNotification } = notificationSlice.actions
export default notificationSlice.reducer
