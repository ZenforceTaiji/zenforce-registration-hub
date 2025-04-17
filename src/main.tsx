
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { initializeAdminUser } from './lib/initializeAdmin'

// Initialize admin user when the app starts
initializeAdminUser()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
