export const getUserStorage = () => {
  const loggedUser = window.localStorage.getItem('loggedUser')
  return JSON.parse(loggedUser) || null
}

export const getUserTokenStorage = () => {
  const user = getUserStorage()

  return user ? user.token : ''
}

export const saveUserStorage = (user) => {
  window.localStorage.setItem('loggedUser', JSON.stringify(user))
}

export const destroyUserStorage = () => {
  window.localStorage.removeItem('loggedUser')
}
