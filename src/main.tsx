
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { initializeAdminUser } from './lib/initializeAdmin'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { HelmetProvider } from 'react-helmet-async'
import './index.css' // Make sure we're importing CSS

// Configure React Query for performance
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

// Mount the app
const container = document.getElementById('root')

// Ensure the container exists
if (!container) throw new Error('Root element not found')

// Create root
const root = createRoot(container)
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
