export const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.payload
    case 'HIDE_NOTIFICATION':
      return null
    default:
      return state
  }
}
