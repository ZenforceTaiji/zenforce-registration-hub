
import React from 'react';

/**
 * Component that renders the initial loading state shown before React hydration
 */
const InitialLoadingState: React.FC = () => {
  return (
    <div id="initial-loading" className="loading">
      <div className="loading-spinner"></div>
      <h1 className="loading-title">ZenForce TaijiQuan SA</h1>
      <p className="loading-subtitle">Discover the ancient art of balance, strength and inner peace</p>
    </div>
  );
};

export default InitialLoadingState;
