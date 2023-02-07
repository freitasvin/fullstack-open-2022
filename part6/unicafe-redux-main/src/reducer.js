const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

export const reducer = (state = initialState, action) => {
  switch(action.type){
    case 'DO_NOTHING':
      return state
    case 'GOOD':
      return {...state, good: state.good + 1}
    case 'OK':
      return {...state, ok: state.ok + 1}
    case 'BAD':
      return {...state, bad: state.bad + 1}
    case 'ZERO':
      return initialState
    default: return state
  }
}