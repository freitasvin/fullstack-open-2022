export const getUserStorage = () => {
  const loggedUser = window.localStorage.getItem('loggedUser')
  return JSON.parse(loggedUser) ?? null
}

export const saveUserStorage = user => {
  window.localStorage.setItem('loggedUser', JSON.stringify(user))
}

export const destroyUserStorage = user => {
  window.localStorage.removeItem('loggedUser')
}