import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaBookOpen, FaCompass, FaBookmark } from 'react-icons/fa';

/**
 * Navbar Component
 * Provides responsive navigation across the three core pages:
 * 1. Discover Books (Home)
 * 2. My Reading List
 */
function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container">
        {/* Brand Name & Logo */}
        <Link className="navbar-brand d-flex align-items-center fw-bold" to="/">
          <FaBookOpen className="text-primary me-2 fs-4" />
          <span>BookWise</span>
        </Link>

        {/* Mobile Toggle Button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#bookwiseNavbar"
          aria-controls="bookwiseNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation Links */}
        <div className="collapse navbar-collapse" id="bookwiseNavbar">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `nav-link d-flex align-items-center ${isActive ? 'active fw-semibold' : ''}`
                }
              >
                <FaCompass className="me-1" /> Discover Books
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/reading-list"
                className={({ isActive }) =>
                  `nav-link d-flex align-items-center ${isActive ? 'active fw-semibold' : ''}`
                }
              >
                <FaBookmark className="me-1" /> My Reading List
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

