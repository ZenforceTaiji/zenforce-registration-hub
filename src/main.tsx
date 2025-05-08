
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
  
  // Remove loading state with nice transition
  const loadingElement = document.getElementById('initial-loading')
  if (loadingElement) {
    loadingElement.style.opacity = '0'
    setTimeout(() => {
      // Clear all content for React to take over
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
    }, 300) // Slight delay for fade out animation
  } else {
    // If no loading element, just render immediately
    container.innerHTML = ''
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
}

// Use requestIdleCallback to start rendering as soon as browser is idle
// but with a backup timeout to ensure it happens quickly
if ('requestIdleCallback' in window) {
  const timeoutId = setTimeout(() => startApp(), 1000) // Backup timeout
  window.requestIdleCallback(() => {
    clearTimeout(timeoutId)
    startApp()
  }, { timeout: 1000 })
} else {
  // For browsers that don't support requestIdleCallback
  setTimeout(startApp, 200)
}

// Initialize admin user after render in low priority
const initAdmin = () => {
  initializeAdminUser().catch(error => {
    console.error('Failed to initialize admin user:', error)
  })
}

// Use requestIdleCallback to avoid blocking the main thread
if ('requestIdleCallback' in window) {
  window.requestIdleCallback(initAdmin, { timeout: 3000 })
} else {
  // Fallback for browsers that don't support requestIdleCallback
  setTimeout(initAdmin, 2000)
}
