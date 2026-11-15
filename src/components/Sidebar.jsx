import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FaBookOpen, FaCompass, FaBookmark, FaGraduationCap, FaTimes } from 'react-icons/fa';
import { useReadingList } from '../context/ReadingListContext.jsx';

/**
 * Sidebar Component
 * Dark navy navigation sidebar featuring the BookWise brand, primary routes,
 * live reading list count badge, and academic project meta info.
 * 
 * Props:
 * - isOpen: Boolean indicating whether the mobile sidebar drawer is currently open
 * - onClose: Function to close the mobile sidebar
 */
function Sidebar({ isOpen, onClose }) {
  const { readingList } = useReadingList();

  return (
    <>
      {/* Mobile Backdrop overlay (clicks outside close sidebar on mobile) */}
      {isOpen && (
        <div
          className="sidebar-backdrop d-md-none"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside className={`sidebar-container d-flex flex-column ${isOpen ? 'show-mobile' : ''}`}>
        {/* Brand Header */}
        <div className="sidebar-brand-wrapper d-flex align-items-center justify-content-between p-3 border-bottom border-secondary border-opacity-25">
          <Link to="/" className="text-decoration-none d-flex align-items-center" onClick={onClose}>
            <div className="brand-icon-box me-2 d-flex align-items-center justify-content-center text-white bg-primary rounded-3">
              <FaBookOpen className="fs-5" />
            </div>
            <div>
              <h5 className="mb-0 fw-bold text-white tracking-wide">BookWise</h5>
              <span className="sidebar-brand-subtitle text-white-50">Global Explorer</span>
            </div>
          </Link>

          {/* Close button visible only on small screens */}
          <button
            type="button"
            className="btn btn-sm btn-link text-white-50 d-md-none p-1"
            onClick={onClose}
            aria-label="Close Sidebar"
          >
            <FaTimes className="fs-5" />
          </button>
        </div>

        {/* Navigation Menu */}
        <div className="sidebar-nav-wrapper flex-grow-1 p-3">
          <div className="sidebar-section-title text-uppercase fw-bold text-white-50 px-3 mb-2">
            Main Menu
          </div>
          <ul className="nav nav-pills flex-column gap-1">
            <li className="nav-item">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `nav-link d-flex align-items-center px-3 py-2 rounded-3 text-white ${
                    isActive ? 'active-nav-link' : 'sidebar-link'
                  }`
                }
                onClick={onClose}
              >
                <FaCompass className="me-3 fs-5" />
                <span className="fw-medium">Discover Books</span>
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/reading-list"
                className={({ isActive }) =>
                  `nav-link d-flex align-items-center px-3 py-2 rounded-3 text-white ${
                    isActive ? 'active-nav-link' : 'sidebar-link'
                  }`
                }
                onClick={onClose}
              >
                <FaBookmark className="me-3 fs-5" />
                <span className="fw-medium">My Reading List</span>
                {readingList.length > 0 && (
                  <span className="badge bg-primary ms-auto rounded-pill px-2 py-1 extra-small">
                    {readingList.length}
                  </span>
                )}
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Academic Project Badge / Sidebar Footer */}
        <div className="sidebar-footer p-3 border-top border-secondary border-opacity-25 mt-auto">
          <div className="p-3 rounded-3 academic-badge-card text-white-50">
            <div className="d-flex align-items-center mb-1 text-white">
              <FaGraduationCap className="me-2 text-warning fs-5" />
              <span className="fw-bold small">University Final Project</span>
            </div>
            <p className="extra-small mb-0 text-white-50">
              Built with React, Vite &amp; Open Library API
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
