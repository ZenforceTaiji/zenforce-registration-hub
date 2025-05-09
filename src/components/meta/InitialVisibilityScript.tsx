
import React from 'react';

/**
 * Component for setting initial visibility behavior
 * This helps with render timing and performance optimization
 */
const InitialVisibilityScript: React.FC = () => {
  // The script needs to be defined as a string to be inserted into a script tag
  const inlineScript = `
    // Improve initial rendering performance
    (function() {
      // Instead of modifying visibilityState directly, we use the Page Visibility API
      // to respond to visibility changes and optimize rendering accordingly
      if (document.hidden === false) {
        document.dispatchEvent(new Event('visibilitychange'));
      }
      
      // Register visibility change handler
      document.addEventListener('visibilitychange', function() {
        if (!document.hidden) {
          // Page is visible, can trigger optimizations here if needed
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
