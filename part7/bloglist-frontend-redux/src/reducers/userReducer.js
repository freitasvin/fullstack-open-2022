import { createSlice } from '@reduxjs/toolkit'
import { getUserStorage } from '../storage/userStorage'
import { loginUser, logoutUser } from '../services/login'

const userSlice = createSlice({
  initialState: getUserStorage(),
  name: 'user',
  reducers: {
    setStateUser(state, action) {
      return action.payload
    },
    removeStateUser() {
      return null
    },
  },
})
export const loginUserDispatcher = (user) => {
  return async (dispatch) => {
    dispatch(setStateUser(await loginUser(user)))
  }
}

export const logoutUserDipatcher = () => {
  return (dispatch) => {
    logoutUser()
    dispatch(removeStateUser())
  }
}

export default userSlice.reducer

export const { setStateUser, removeStateUser } = userSlice.actions
