
import React from 'react';

/**
 * Component for setting initial document visibility state
 * This helps with render timing and performance optimization
 */
const InitialVisibilityScript: React.FC = () => {
  // The script needs to be defined as a string to be inserted into a script tag
  const inlineScript = `
    // Set document as visible to improve initial rendering
    (function() {
      document.visibilityState = "visible";
    })();
  `;

  return (
    <script dangerouslySetInnerHTML={{ __html: inlineScript }} />
  );
};

export default InitialVisibilityScript;
