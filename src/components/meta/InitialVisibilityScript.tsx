
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
      try {
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

        // Add error recovery - if page is blank for more than 5 seconds, force refresh
        setTimeout(function() {
          // Check if any content is visible
          const visibleContent = document.body && 
                              document.body.innerText && 
                              document.body.innerText.length > 0;
          
          if (!visibleContent) {
            console.log('Detected possible black screen, attempting recovery...');
            window.location.reload();
          }
        }, 5000);
      } catch (e) {
        // Log any errors but don't crash
        console.error('Error in visibility script:', e);
        
        // Try to set visibility anyway
        document.documentElement.style.visibility = 'visible';
      }
    })();
  `;

  return (
    <script dangerouslySetInnerHTML={{ __html: inlineScript }} />
  );
};

export default InitialVisibilityScript;
