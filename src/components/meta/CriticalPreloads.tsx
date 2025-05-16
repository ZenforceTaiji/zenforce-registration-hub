
import React from 'react';
import { Helmet } from 'react-helmet-async';

/**
 * Component for preloading critical assets
 * This helps improve page load performance
 */
const CriticalPreloads: React.FC = () => {
  return (
    <Helmet>
      {/* Preload critical hero image with high priority but smaller size */}
      <link 
        rel="preload" 
        href="https://images.unsplash.com/photo-1464207687429-7505649dae38?q=80&w=400&auto=format&fit=crop&quality=80" 
        as="image" 
        fetchpriority="high"
      />
      
      {/* Modern format preloading for browsers that support it */}
      <link 
        rel="preload" 
        as="image" 
        href="https://images.unsplash.com/photo-1464207687429-7505649dae38?q=80&w=400&fm=webp&quality=80" 
        type="image/webp" 
        fetchpriority="high"
      />
      
      {/* Preload critical fonts with correct CORS attribute */}
      <link 
        rel="preload" 
        href="/fonts/cinzel-v19-latin-regular.woff2" 
        as="font" 
        type="font/woff2" 
        crossOrigin="anonymous" 
      />
      
      {/* Font stylesheet with display swap to prevent FOIT */}
      <link 
        rel="stylesheet" 
        href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&display=swap" 
        media="print" 
        onLoad={(e) => {
          // TypeScript compliant event handler
          if (e.currentTarget) {
            e.currentTarget.media = 'all';
          }
        }}
      />
      
      {/* DNS prefetch and preconnect for critical domains */}
      <link rel="dns-prefetch" href="https://images.unsplash.com" />
      <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="" />
      
      {/* Add preconnect for Google Fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />

      {/* Ensure admin portal CSS is loaded early */}
      <link rel="prefetch" href="/src/components/admin/settings/styles.css" as="style" />
    </Helmet>
  );
};

export default CriticalPreloads;
