import React from 'react';

/**
 * Footer Component
 * Displayed at the bottom of the main dashboard content area.
 */
function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-top py-3 px-4 text-center text-muted small mt-auto">
      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center gap-2">
        <span>
          <strong>BookWise</strong> &ndash; Global Book Explorer &copy; {currentYear}
        </span>
        <span className="text-secondary">
          Powered by Open Library REST API &bull; Built with React &amp; Bootstrap 5
        </span>
      </div>
    </footer>
  );
}

export default Footer;
