import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  initialState: null,
  name: 'notification',
  reducers: {
    setStateNotification(state, action) {
      return action.payload
    },
    hideStateNotification() {
      return null
    },
  },
})

export const showNotificationDispatcher = ({ text, type, displayTime }) => {
  return async (dispatch) => {
    dispatch(setStateNotification({ text, type }))
    setTimeout(() => {
      dispatch(hideStateNotification())
    }, displayTime * 1000)
  }
}

export const { setStateNotification, hideStateNotification } = notificationSlice.actions

export default notificationSlice.reducer
