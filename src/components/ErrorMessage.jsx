import React from 'react';
import { FaExclamationTriangle, FaRedo } from 'react-icons/fa';

/**
 * ErrorMessage Component
 * Reusable component to inform the user about network failures, 
 * missing books, or invalid API responses.
 * 
 * Props:
 * - title: Short headline (default: "Oops! Something went wrong")
 * - message: The error description to show
 * - onRetry: Optional callback function triggered when "Try Again" is clicked
 */
function ErrorMessage({
  title = 'Oops! Something went wrong',
  message = 'Unable to fetch data from Open Library. Please check your internet connection and try again.',
  onRetry,
}) {
  return (
    <div className="alert alert-danger shadow-sm border-0 d-flex flex-column flex-sm-row align-items-start align-items-sm-center justify-content-between p-4 my-4 rounded-3">
      <div className="d-flex align-items-center mb-3 mb-sm-0">
        <FaExclamationTriangle className="text-danger fs-2 me-3 flex-shrink-0" />
        <div>
          <h5 className="alert-heading fw-bold mb-1">{title}</h5>
          <p className="mb-0 text-danger-emphasis small">{message}</p>
        </div>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="btn btn-outline-danger btn-sm d-flex align-items-center flex-shrink-0 ms-sm-3"
        >
          <FaRedo className="me-2" /> Try Again
        </button>
      )}
    </div>
  );
}

export default ErrorMessage;

