import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FaCalendarAlt,
  FaUserEdit,
  FaBookOpen,
  FaStar,
  FaBookmark,
  FaCheck,
  FaChevronDown,
  FaTrashAlt,
} from 'react-icons/fa';
import { useReadingList } from '../context/ReadingListContext.jsx';

/**
 * BookCard Component
 * Renders an individual book with its cover art, title, author, publish year,
 * and an interactive "Add to Reading List" dropdown with status tracking.
 * 
 * Props:
 * - book: Object containing { id, key, title, author, firstPublishYear, coverUrl, genres, rating }
 */
function BookCard({ book }) {
  const [imageError, setImageError] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Access global Reading List state
  const { isBookSaved, getBookStatus, addBook, updateBookStatus, removeBook } = useReadingList();

  const bookId = book.id || book.key;
  const isSaved = isBookSaved(bookId);
  const currentStatus = getBookStatus(bookId);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fallback placeholder image if cover doesn't exist or fails to load
  const placeholderCover =
    'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300&auto=format&fit=crop&q=60';

  const handleSelectStatus = (status) => {
    if (isSaved) {
      updateBookStatus(bookId, status);
    } else {
      addBook(book, status);
    }
    setDropdownOpen(false);
  };

  const handleRemove = () => {
    removeBook(bookId);
    setDropdownOpen(false);
  };

  return (
    <div className="col">
      <div className="card h-100 book-card shadow-sm border-0 rounded-3 overflow-hidden position-relative">
        {/* Book Cover Container */}
        <div className="book-cover-wrapper position-relative text-center bg-light">
          <img
            src={imageError || !book.coverUrl ? placeholderCover : book.coverUrl}
            alt={`Cover of ${book.title}`}
            className="book-cover-img"
            onError={() => setImageError(true)}
            loading="lazy"
          />

          {/* Rating Badge */}
          {book.rating && (
            <span className="badge bg-dark text-warning position-absolute top-0 end-0 m-2 shadow-sm d-flex align-items-center">
              <FaStar className="me-1" /> {book.rating}
            </span>
          )}

          {/* Saved in Reading List Indicator Badge */}
          {isSaved && (
            <span className="badge bg-success position-absolute top-0 start-0 m-2 shadow-sm d-flex align-items-center">
              <FaCheck className="me-1" /> In List
            </span>
          )}
        </div>

        {/* Book Details */}
        <div className="card-body d-flex flex-column p-3">
          {/* Genre / Subject Tag */}
          {book.genres && book.genres.length > 0 && (
            <span className="badge bg-primary-subtle text-primary align-self-start mb-2 px-2 py-1 small">
              {book.genres[0]}
            </span>
          )}

          {/* Book Title */}
          <h6 className="card-title fw-bold text-dark mb-1 text-truncate" title={book.title}>
            {book.title}
          </h6>

          {/* Author */}
          <p className="card-text text-muted small mb-2 d-flex align-items-center text-truncate">
            <FaUserEdit className="me-1 text-secondary flex-shrink-0" />
            <span className="text-truncate">{book.author || book.author_name || 'Unknown Author'}</span>
          </p>

          {/* Publication Year */}
          <p className="card-text text-secondary extra-small mb-3 d-flex align-items-center">
            <FaCalendarAlt className="me-1 text-muted" />
            <span>First published: {book.firstPublishYear || book.first_publish_year || 'N/A'}</span>
          </p>

          {/* Action Row */}
          <div className="mt-auto pt-2 border-top d-flex gap-2 align-items-center">
            {/* View Details Link */}
            <Link
              to={`/book/${book.id || (book.key ? book.key.replace('/works/', '') : '')}`}
              className="btn btn-outline-secondary btn-sm flex-grow-1 d-flex align-items-center justify-content-center"
            >
              <FaBookOpen className="me-1" /> Details
            </Link>

            {/* Add to Reading List Dropdown */}
            <div className="position-relative" ref={dropdownRef}>
              {isSaved ? (
                // Already in list button
                <button
                  type="button"
                  className="btn btn-success btn-sm d-flex align-items-center gap-1"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  title={`Status: ${currentStatus}. Click to modify.`}
                >
                  <FaCheck />
                  <span className="d-none d-sm-inline">{currentStatus}</span>
                  <FaChevronDown className="ms-1" style={{ fontSize: '0.65rem' }} />
                </button>
              ) : (
                // Not in list button
                <button
                  type="button"
                  className="btn btn-primary btn-sm d-flex align-items-center gap-1"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  title="Add to Reading List"
                >
                  <FaBookmark />
                  <span>+ Add</span>
                  <FaChevronDown className="ms-1" style={{ fontSize: '0.65rem' }} />
                </button>
              )}

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div
                  className="dropdown-menu show shadow position-absolute end-0 p-2 border-0 rounded-3 mt-1"
                  style={{ minWidth: '180px', zIndex: 1050, bottom: '100%', marginBottom: '6px' }}
                >
                  <div className="px-2 py-1 text-uppercase text-muted fw-bold extra-small border-bottom mb-1">
                    {isSaved ? 'Update Status' : 'Add to List as:'}
                  </div>

                  {['Want to Read', 'Currently Reading', 'Completed'].map((status) => (
                    <button
                      key={status}
                      type="button"
                      className={`dropdown-item small rounded-2 py-1 px-2 d-flex align-items-center justify-content-between ${
                        currentStatus === status ? 'active bg-primary' : ''
                      }`}
                      onClick={() => handleSelectStatus(status)}
                    >
                      <span>{status}</span>
                      {currentStatus === status && <FaCheck className="ms-2" />}
                    </button>
                  ))}

                  {isSaved && (
                    <>
                      <div className="dropdown-divider my-1"></div>
                      <button
                        type="button"
                        className="dropdown-item small text-danger rounded-2 py-1 px-2 d-flex align-items-center"
                        onClick={handleRemove}
                      >
                        <FaTrashAlt className="me-2" /> Remove from List
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookCard;
