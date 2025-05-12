import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { initializeAdminUser } from './lib/initializeAdmin'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { HelmetProvider } from 'react-helmet-async'
import InlineHeroLoader from './components/loaders/InlineHeroLoader'
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
  
  // Get existing elements that need transitions
  const loadingElement = document.getElementById('initial-loading')
  const initialContent = document.getElementById('initial-content')
  
  // Start the rendering process immediately
  if (loadingElement) {
    // Make the transition smooth
    loadingElement.style.opacity = '0'
    
    setTimeout(() => {
      // Remove the loading spinner but keep initial content
      if (loadingElement.parentNode) {
        loadingElement.parentNode.removeChild(loadingElement)
      }
      
      // Render the application but don't clear initial content yet
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
      
      // After React has hydrated, smoothly remove the initial content
      if (initialContent) {
        // Keep initial content visible until React is ready
        setTimeout(() => {
          if (initialContent && initialContent.parentNode) {
            initialContent.style.opacity = '0'
            setTimeout(() => {
              if (initialContent.parentNode) {
                initialContent.parentNode.removeChild(initialContent)
              }
            }, 300)
          }
        }, 200)
      }
    }, 10)
  } else {
    // If no loading element, just render immediately
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

// Start rendering immediately if document is ready
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  // If the document is already loaded or interactive, start immediately
  startApp()
} else {
  // Otherwise use DOMContentLoaded
  document.addEventListener('DOMContentLoaded', startApp, { once: true })
  
  // Backup in case DOMContentLoaded doesn't fire
  setTimeout(startApp, 200) // Reduced timeout to display content faster
}

// Initialize admin user after render in low priority
const initAdmin = () => {
  // Use requestIdleCallback to run non-critical initialization
  initializeAdminUser().catch(error => {
    console.error('Failed to initialize admin user:', error)
  })
}

// Only initialize admin after page is fully interactive
if (window.requestIdleCallback) {
  window.requestIdleCallback(initAdmin, { timeout: 3000 })
} else {
  // Fallback for browsers that don't support requestIdleCallback
  setTimeout(initAdmin, 2000)
}

// Handle visibility optimization
if (typeof document !== 'undefined' && !document.hidden) {
  // If document is already visible, trigger optimizations
  document.dispatchEvent(new CustomEvent('app:visible'))
}
