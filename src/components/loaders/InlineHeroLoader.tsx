
import React from 'react';

/**
 * Component for inlining the critical hero loader script
 * This script renders the hero section while the React app is loading
 */
const InlineHeroLoader: React.FC = () => {
  // The script needs to be defined as a string to be inserted into a script tag
  const inlineScript = `
    // Immediately execute script to render static content before React
    (function() {
      // Mark the page as visible to start rendering content sooner
      document.visibilityState = "visible";
      
      const container = document.getElementById('root');
      
      if (container) {
        // Create static hero markup for immediate display
        const staticHero = document.createElement('div');
        staticHero.id = 'initial-content';
        staticHero.className = 'hero-section';
        staticHero.innerHTML = \`
          <div class="hero-bg-placeholder"></div>
          <div style="position: relative; z-index: 5; max-width: 48rem; margin: 0 auto;">
            <h1 class="hero-title">ZenForce TaijiQuan SA</h1>
            <p class="hero-subtitle">Experience the ancient art of balance, strength, and inner peace</p>
            <div>
              <a href="/registration" class="hero-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                In-Person Training Registration
              </a>
              <a href="/online-registration" class="hero-button hero-button-outline">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M2 12h20"></path><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
                Online Training Registration
              </a>
            </div>
          </div>
        \`;
        
        // Insert loading spinner first
        container.innerHTML = \`
          <div id="initial-loading" class="loading">
            <div class="loading-spinner"></div>
            <h1 class="loading-title">ZenForce TaijiQuan SA</h1>
            <p class="loading-subtitle">Discover the ancient art of balance, strength and inner peace</p>
          </div>
        \`;
        
        // Append the static hero to show content instantly
        container.appendChild(staticHero);
        
        // Create and load the hero image with callback
        const img = new Image();
        img.onload = function() {
          // Once hero image loads, set it as background for placeholder
          const heroPlaceholder = staticHero.querySelector('.hero-bg-placeholder');
          if (heroPlaceholder) {
            heroPlaceholder.style.background = \`linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('\${img.src}') center/cover no-repeat\`;
          }
        };
        img.src = "https://images.unsplash.com/photo-1464207687429-7505649dae38?q=80&w=400&auto=format&fit=crop";
      }
    })();
  `;

  return (
    <script dangerouslySetInnerHTML={{ __html: inlineScript }} />
  );
};

export default InlineHeroLoader;
