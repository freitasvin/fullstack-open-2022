import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  initialState: null,
  name: 'notification',
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    hideNotification() {
      return null
    },
  },
})

export const showNotification = ({ text, type, displayTime }) => {
  return async (dispatch) => {
    dispatch(setNotification({ text, type }))
    setTimeout(() => {
      dispatch(hideNotification())
    }, displayTime * 1000)
  }
}

export const { setNotification, hideNotification } = notificationSlice.actions

export default notificationSlice.reducer
