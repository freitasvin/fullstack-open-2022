import React from 'react'
import ReactDOM from 'react-dom/client'
import { createStore } from 'redux'
import { reducer } from './reducer'

const store = createStore(reducer)

const App = () => {
  const state = store.getState()
  return (
    <div>
      <button onClick={() => store.dispatch({ type: 'GOOD' })}>GOOD {state.good}</button>
      <button onClick={() => store.dispatch({ type: 'OK' })}>OK {state.ok}</button>
      <button onClick={() => store.dispatch({ type: 'BAD' })}>BAD {state.bad}</button>
      <button onClick={() => store.dispatch({ type: 'ZERO' })}>ZERO</button>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)