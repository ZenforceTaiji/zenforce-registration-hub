
import React from 'react';
import { Helmet } from 'react-helmet-async';

/**
 * Component for preloading critical assets
 * This helps improve page load performance
 */
const CriticalPreloads: React.FC = () => {
  return (
    <Helmet>
      {/* Preload critical assets */}
      <link 
        rel="preload" 
        href="https://images.unsplash.com/photo-1464207687429-7505649dae38?q=80&w=400&auto=format&fit=crop" 
        as="image" 
        fetchPriority="high" 
      />
      
      {/* Modern format preloading */}
      <link 
        rel="preload" 
        as="image" 
        href="https://images.unsplash.com/photo-1464207687429-7505649dae38?q=80&w=400&fm=webp" 
        type="image/webp" 
      />
      
      {/* Preload critical fonts */}
      <link 
        rel="preload" 
        href="/fonts/cinzel-v19-latin-regular.woff2" 
        as="font" 
        type="font/woff2" 
        crossOrigin="anonymous" 
      />
      <link 
        rel="preload" 
        href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&display=swap" 
        as="style" 
      />
      
      {/* Font stylesheet with display swap to prevent FOIT */}
      <link 
        rel="stylesheet" 
        href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&display=swap" 
      />
    </Helmet>
  );
};

export default CriticalPreloads;
