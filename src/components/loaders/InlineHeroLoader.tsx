
import React from 'react';

/**
 * Component for inlining the critical hero loader script
 * This script renders the hero section while the React app is loading
 */
const InlineHeroLoader: React.FC = () => {
  // The script needs to be defined as a string to be inserted into a script tag
  const inlineScript = `
    // Execute immediately to avoid blank screen flash
    (function() {
      // Mark the page as visible to start rendering content sooner
      document.dispatchEvent(new CustomEvent('app:visible'));
      
      // Immediately create and insert initial static content
      const staticContent = document.createElement('div');
      staticContent.id = 'initial-content';
      staticContent.className = 'fade-in';
      staticContent.innerHTML = \`
        <div class="hero-section">
          <div class="hero-bg-placeholder"></div>
          <div style="position: relative; z-index: 5; max-width: 48rem; margin: 0 auto;">
            <h1 class="hero-title">ZenForce TaijiQuan SA</h1>
            <p class="hero-subtitle">Experience the ancient art of balance, strength, and inner peace</p>
            <div class="hero-buttons">
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
        </div>
      \`;
      
      // Get the root container
      const container = document.getElementById('root');
      if (container) {
        // Insert static content before anything else
        container.appendChild(staticContent);
        
        // Set up loading spinner
        const loadingEl = document.createElement('div');
        loadingEl.id = 'initial-loading';
        loadingEl.className = 'loading';
        loadingEl.innerHTML = \`
          <div class="loading-spinner"></div>
          <h1 class="loading-title">ZenForce TaijiQuan SA</h1>
          <p class="loading-subtitle">Discover the ancient art of balance, strength and inner peace</p>
        \`;
        container.appendChild(loadingEl);
        
        // Load hero image in the background
        const bgImage = new Image();
        bgImage.onload = function() {
          const heroPlaceholder = staticContent.querySelector('.hero-bg-placeholder');
          if (heroPlaceholder) {
            heroPlaceholder.style.background = \`linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('\${bgImage.src}') center/cover no-repeat\`;
            heroPlaceholder.classList.add('loaded');
          }
        };
        bgImage.src = "https://images.unsplash.com/photo-1464207687429-7505649dae38?q=80&w=400&auto=format&fit=crop";
      }
    })();
  `;

  return (
    <script dangerouslySetInnerHTML={{ __html: inlineScript }} />
  );
};

export default InlineHeroLoader;
