import { createSlice } from "@reduxjs/toolkit";

const initialState = 'None notifation'

const notificationSlice = createSlice({
  initialState,
  name: 'notification',
  setNotification(state, action){
    return action.payload
  }
})

export const { setNotification } = notificationSlice.actions
export default notificationSlice.reducer
