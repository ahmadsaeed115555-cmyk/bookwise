import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FaBars, FaSearch, FaTimes, FaGlobeAmericas } from 'react-icons/fa';

/**
 * Header Component
 * Top dashboard header containing:
 * 1. Mobile menu toggle button
 * 2. Search bar synchronized with React Router query parameters (?q=...)
 * 3. Open Library live status indicator
 * 
 * Props:
 * - onToggleSidebar: Callback to toggle the mobile sidebar open/closed
 */
function Header({ onToggleSidebar }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [localQuery, setLocalQuery] = useState(searchParams.get('q') || '');

  // Keep input synchronized if the URL search query changes (e.g. clicking category chips)
  useEffect(() => {
    setLocalQuery(searchParams.get('q') || '');
  }, [searchParams]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = localQuery.trim();
    if (trimmed) {
      navigate(`/?q=${encodeURIComponent(trimmed)}`);
    } else {
      navigate('/');
    }
  };

  const handleClear = () => {
    setLocalQuery('');
    navigate('/');
  };

  return (
    <header className="top-header bg-white border-bottom px-3 px-md-4 py-3 sticky-top shadow-sm">
      <div className="d-flex align-items-center justify-content-between gap-3">
        {/* Left: Mobile Sidebar Toggle */}
        <button
          type="button"
          className="btn btn-outline-secondary d-md-none border-0 p-2 me-1"
          onClick={onToggleSidebar}
          aria-label="Open Sidebar Menu"
        >
          <FaBars className="fs-5" />
        </button>

        {/* Center: Search Bar */}
        <form onSubmit={handleSubmit} className="flex-grow-1 search-form-wrapper">
          <div className="input-group">
            <span className="input-group-text bg-light border-end-0 text-muted">
              <FaSearch />
            </span>
            <input
              type="text"
              className="form-control bg-light border-start-0 border-end-0 ps-0 shadow-none"
              placeholder="Search by book title, author, or keyword (e.g. Tolkien, 1984, Dune, Psychology)..."
              value={localQuery}
              onChange={(e) => setLocalQuery(e.target.value)}
              aria-label="Search books"
            />
            {localQuery && (
              <button
                type="button"
                className="btn btn-light border-top border-bottom text-muted"
                onClick={handleClear}
                title="Clear search"
              >
                <FaTimes />
              </button>
            )}
            <button className="btn btn-primary px-3 fw-semibold" type="submit">
              Search
            </button>
          </div>
        </form>

        {/* Right: API Status Badge */}
        <div className="d-none d-lg-flex align-items-center flex-shrink-0 text-muted small ps-2 border-start">
          <span className="badge bg-success-subtle text-success border border-success-subtle d-flex align-items-center px-2 py-1">
            <FaGlobeAmericas className="me-1" /> Open Library Live
          </span>
        </div>
      </div>
    </header>
  );
}

export default Header;
