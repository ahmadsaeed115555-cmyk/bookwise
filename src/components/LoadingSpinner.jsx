import React from 'react';

/**
 * LoadingSpinner Component
 * Reusable feedback component displayed while fetching data from Open Library.
 * 
 * Props:
 * - message: Custom text to show below the spinner (default: "Loading...")
 */
function LoadingSpinner({ message = 'Loading books from Open Library...' }) {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center py-5">
      <div
        className="spinner-border text-primary mb-3"
        style={{ width: '3rem', height: '3rem' }}
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
      <p className="text-muted fw-semibold mb-0">{message}</p>
    </div>
  );
}

export default LoadingSpinner;

