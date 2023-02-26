import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './store'
import App from './App'
import './index.css'
import { NotificationContextProvider } from './contexts/notificationContext'

const root = document.getElementById('root')
ReactDOM.createRoot(root).render(
  <Provider store={store}>
    <NotificationContextProvider>
      <App />
    </NotificationContextProvider>
  </Provider>
)
