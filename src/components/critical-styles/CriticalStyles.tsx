
import React from 'react';

/**
 * Component for inlining critical CSS that should be loaded immediately
 * This component should be placed in the head of the document via Helmet
 */
const CriticalStyles: React.FC = () => {
  return (
    <style>
      {`
      /* Critical path CSS */
      body {
        margin: 0;
        padding: 0;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        background-color: black;
        color: white;
        display: block;
      }
      
      h1 {
        visibility: visible !important;
        opacity: 1 !important;
        display: block !important;
      }
      
      /* Hero section - critical for first render */
      .hero-section {
        position: relative;
        background-color: black;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 60vh;
        padding: 4rem 1rem;
        text-align: center;
        visibility: visible;
        opacity: 1;
        transform: translateY(0);
      }
      
      .hero-title {
        font-family: 'Cinzel', serif;
        font-size: 2rem;
        font-weight: 700;
        color: #b7791f; /* amber-600 */
        margin-bottom: 1rem;
        visibility: visible;
        opacity: 1;
      }
      
      .hero-subtitle {
        font-size: 1.125rem;
        max-width: 36rem;
        margin: 0 auto 2rem;
        line-height: 1.5;
        visibility: visible;
        opacity: 1;
      }
      
      .hero-button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        background-color: rgba(180, 83, 9, 0.8);
        color: white;
        padding: 0.75rem 1.5rem;
        border-radius: 0.375rem;
        font-weight: 500;
        text-decoration: none;
        margin: 0.5rem;
        transition: background-color 0.2s;
      }
      
      .hero-button:hover {
        background-color: rgb(180, 83, 9);
      }
      
      .hero-button-outline {
        background-color: transparent;
        border: 1px solid rgba(180, 83, 9, 0.5);
      }
      
      /* Initial content loading - showing immediately */
      #initial-content {
        display: block;
        visibility: visible;
        opacity: 1;
      }
      
      /* Loading UI that transitions to the app */
      .loading {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
        background-color: black;
        color: #b7791f;
        text-align: center;
        padding: 0 1rem;
        z-index: 9999;
        transition: opacity 0.5s ease-out;
        visibility: visible;
        opacity: 1;
      }
      
      .loading-spinner {
        width: 50px;
        height: 50px;
        border: 3px solid rgba(183, 121, 31, 0.3);
        border-radius: 50%;
        border-top-color: rgb(183, 121, 31);
        animation: spin 1s ease-in-out infinite;
        margin-bottom: 1rem;
      }
      
      .loading-title {
        font-family: 'Cinzel', serif;
        font-size: 1.5rem;
        font-weight: 700;
        margin-bottom: 0.5rem;
        color: #b7791f;
      }
      
      .loading-subtitle {
        font-size: 1rem;
        max-width: 280px;
        margin: 0 auto;
        opacity: 0.9;
      }
      
      /* Hero background image placeholder */
      .hero-bg-placeholder {
        position: absolute;
        inset: 0;
        background-color: #111;
        z-index: -1;
      }
      
      /* Content visibility for below the fold content */
      .below-fold {
        content-visibility: auto;
        contain-intrinsic-size: 1px 1000px;
      }
      
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
      
      /* Font display settings */
      @font-face {
        font-family: 'Cinzel';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url('/fonts/cinzel-v19-latin-regular.woff2') format('woff2');
      }
      
      /* Mobile-first responsive layout */
      @media (min-width: 768px) {
        .hero-title {
          font-size: 2.75rem;
        }
        .hero-subtitle {
          font-size: 1.25rem;
        }
      }
      `}
    </style>
  );
};

export default CriticalStyles;
