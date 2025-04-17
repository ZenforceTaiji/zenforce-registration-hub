
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { initializeAdminUser } from './lib/initializeAdmin'
import { BrowserRouter } from 'react-router-dom'

// Initialize admin user when the app starts
initializeAdminUser()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
