
import React from 'react';

/**
 * Component for setting initial visibility behavior
 * This helps with render timing and performance optimization
 */
const InitialVisibilityScript: React.FC = () => {
  // The script needs to be defined as a string to be inserted into a script tag
  const inlineScript = `
    // Improve initial rendering performance and prevent blank screen
    (function() {
      // Set root visibility immediately
      document.documentElement.style.visibility = 'visible';
      
      // Force immediate painting
      document.body && document.body.offsetHeight;
      
      // Schedule visibility events for first paint
      requestAnimationFrame(() => {
        document.documentElement.classList.add('ready');
        
        // Trigger visibility events
        if (document.hidden === false) {
          document.dispatchEvent(new Event('visibilitychange'));
          document.dispatchEvent(new CustomEvent('app:visible'));
        }
      });
      
      // Register visibility change handler
      document.addEventListener('visibilitychange', function() {
        if (!document.hidden) {
          document.dispatchEvent(new CustomEvent('app:visible'));
        }
      });
    })();
  `;

  return (
    <script dangerouslySetInnerHTML={{ __html: inlineScript }} />
  );
};

export default InitialVisibilityScript;
