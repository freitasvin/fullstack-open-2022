const filterReducer = (state = '', action) => {
  const { type, payload } = action
  switch (type){
    case 'SET_FILTER':
      return payload.filter
    default: return state
  }
}

export const filterChange = (filter) => {
  return{
    type: 'SET_FILTER',
    payload: { filter }
  }
}

export default filterReducer