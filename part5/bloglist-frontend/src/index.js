import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './store'
import App from './App'
import './index.css'

const root = document.getElementById('root')
ReactDOM.createRoot(root).render(
  <Provider store={store}>
    <App />
  </Provider>
)
