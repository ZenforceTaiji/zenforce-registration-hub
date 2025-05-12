
import React from 'react';
import { Helmet } from 'react-helmet-async';

/**
 * Component for preloading critical assets
 * This helps improve page load performance
 */
const CriticalPreloads: React.FC = () => {
  return (
    <Helmet>
      {/* Preload critical hero image with high priority */}
      <link 
        rel="preload" 
        href="https://images.unsplash.com/photo-1464207687429-7505649dae38?q=80&w=400&auto=format&fit=crop" 
        as="image" 
        fetchPriority="high"
        // Remove the invalid 'importance' attribute
      />
      
      {/* Modern format preloading for browsers that support it */}
      <link 
        rel="preload" 
        as="image" 
        href="https://images.unsplash.com/photo-1464207687429-7505649dae38?q=80&w=400&fm=webp" 
        type="image/webp" 
        fetchPriority="high"
      />
      
      {/* Lower quality version for faster initial paint */}
      <link 
        rel="preload" 
        as="image" 
        href="https://images.unsplash.com/photo-1464207687429-7505649dae38?q=60&w=100&auto=format&fit=crop&blur=5" 
        fetchPriority="high"
      />
      
      {/* Preload critical fonts */}
      <link 
        rel="preload" 
        href="/fonts/cinzel-v19-latin-regular.woff2" 
        as="font" 
        type="font/woff2" 
        crossOrigin="anonymous" 
      />
      
      {/* Font stylesheet with display swap to prevent FOIT 
          Replace the string with a proper onLoad event handler */}
      <link 
        rel="stylesheet" 
        href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&display=swap" 
        media="print" 
        onLoad={() => {
          // TypeScript compliant event handler
          const linkElement = document.querySelector('link[href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&display=swap"]');
          if (linkElement) {
            (linkElement as HTMLLinkElement).media = 'all';
          }
        }}
      />
      
      {/* DNS prefetch and preconnect for critical domains */}
      <link rel="dns-prefetch" href="https://images.unsplash.com" />
      <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="" />
    </Helmet>
  );
};

export default CriticalPreloads;
