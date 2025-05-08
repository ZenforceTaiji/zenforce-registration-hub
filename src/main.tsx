
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { initializeAdminUser } from './lib/initializeAdmin'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { HelmetProvider } from 'react-helmet-async'
import './index.css' // Make sure we're importing CSS

// Configure React Query for optimized performance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      gcTime: 5 * 60 * 1000, // 5 minutes (formerly cacheTime)
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
})

// Function to start application rendering
const startApp = () => {
  // Mount the app
  const container = document.getElementById('root')

  // Ensure the container exists
  if (!container) throw new Error('Root element not found')

  // Create root
  const root = createRoot(container)
  
  // Remove any loading state that might exist
  container.innerHTML = ''
  
  // Render the application
  root.render(
    <React.StrictMode>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </QueryClientProvider>
      </HelmetProvider>
    </React.StrictMode>,
  )
}

// Start rendering as soon as possible
startApp()

// Initialize admin user after render
// This is a non-blocking operation
const initAdmin = () => {
  initializeAdminUser().catch(error => {
    console.error('Failed to initialize admin user:', error)
  })
}

// Use requestIdleCallback to avoid blocking the main thread
if ('requestIdleCallback' in window) {
  window.requestIdleCallback(initAdmin)
} else {
  // Fallback for browsers that don't support requestIdleCallback
  setTimeout(initAdmin, 1000)
}
