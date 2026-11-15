import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  FaArrowLeft,
  FaCalendarAlt,
  FaUserEdit,
  FaStar,
  FaBookmark,
  FaLayerGroup,
  FaCheck,
  FaTrashAlt,
} from 'react-icons/fa';
import { useReadingList } from '../context/ReadingListContext.jsx';
import { SAMPLE_BOOKS } from '../data/sampleBooks.js';

/**
 * BookDetails Page
 * Displays full metadata for a selected book and connects to the global
 * ReadingListContext to manage reading status and persistence.
 */
function BookDetails() {
  const { id } = useParams();
  const { readingList, addBook, updateBookStatus, removeBook, isBookSaved, getBookStatus } =
    useReadingList();

  // Find book from Reading List first, then sample books, or generate fallback
  const savedBook = readingList.find((b) => b.id === id || b.key === id);
  const sampleMatch = SAMPLE_BOOKS.find((b) => b.id === id);

  const book = savedBook || sampleMatch || {
    id: id,
    key: `/works/${id}`,
    title: 'Selected Book Preview',
    author: 'Author Name',
    firstPublishYear: 2020,
    coverUrl: id ? `https://covers.openlibrary.org/b/id/${id}-M.jpg` : '',
    genres: ['Literature'],
    rating: 4.5,
    editionCount: 50,
  };

  const isSaved = isBookSaved(id);
  const currentStatus = getBookStatus(id) || 'Want to Read';

  const handleStatusChange = (newStatus) => {
    if (isSaved) {
      updateBookStatus(id, newStatus);
    } else {
      addBook(book, newStatus);
    }
  };

  return (
    <div className="container-fluid p-0">
      {/* Back button */}
      <div className="mb-4">
        <Link to="/" className="btn btn-outline-secondary btn-sm d-inline-flex align-items-center">
          <FaArrowLeft className="me-2" /> Back to Discover Books
        </Link>
      </div>

      {/* Main Details Card */}
      <div className="card shadow-sm border-0 rounded-4 overflow-hidden mb-4">
        <div className="row g-0">
          {/* Left Column: Book Cover */}
          <div className="col-md-4 col-lg-3 bg-light d-flex align-items-center justify-content-center p-4 border-end">
            <img
              src={
                book.coverUrl ||
                'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300&auto=format&fit=crop&q=60'
              }
              alt={`Cover of ${book.title}`}
              className="img-fluid rounded-3 shadow"
              style={{ maxHeight: '350px', objectFit: 'contain' }}
            />
          </div>

          {/* Right Column: Detailed Info */}
          <div className="col-md-8 col-lg-9 p-4 p-lg-5 d-flex flex-column justify-content-between">
            <div>
              <div className="d-flex flex-wrap align-items-center gap-2 mb-2">
                {book.genres?.map((g) => (
                  <span key={g} className="badge bg-primary-subtle text-primary px-3 py-1">
                    {g}
                  </span>
                ))}
                {isSaved && (
                  <span className="badge bg-success d-inline-flex align-items-center px-2 py-1">
                    <FaCheck className="me-1" /> Saved in Reading List
                  </span>
                )}
              </div>

              <h1 className="fw-bold text-dark mb-2">{book.title}</h1>

              <div className="d-flex flex-wrap align-items-center gap-3 text-muted mb-4">
                <span className="d-flex align-items-center">
                  <FaUserEdit className="me-2 text-primary" />
                  <strong>Author:</strong>&nbsp;{book.author || book.author_name}
                </span>
                <span>&bull;</span>
                <span className="d-flex align-items-center">
                  <FaCalendarAlt className="me-2 text-secondary" />
                  <strong>Published:</strong>&nbsp;{book.firstPublishYear || book.first_publish_year}
                </span>
                <span>&bull;</span>
                <span className="d-flex align-items-center text-warning">
                  <FaStar className="me-1" />
                  <strong className="text-dark">{book.rating || '4.5'}</strong>
                </span>
              </div>

              <h5 className="fw-bold text-dark mb-2">Overview</h5>
              <p className="text-secondary leading-relaxed">
                Explore literary history, character arcs, and thematic depth from the Open Library
                database. Keep track of your reading progress by updating the status below.
              </p>
            </div>

            {/* Action Bar */}
            <div className="bg-light p-3 rounded-3 mt-4 border d-flex flex-column flex-sm-row align-items-sm-center justify-content-between gap-3">
              <div className="d-flex align-items-center gap-2">
                <FaBookmark className="text-primary fs-5" />
                <span className="fw-semibold">Reading Status:</span>
                <select
                  className="form-select form-select-sm w-auto"
                  value={currentStatus}
                  onChange={(e) => handleStatusChange(e.target.value)}
                >
                  <option value="Want to Read">Want to Read</option>
                  <option value="Currently Reading">Currently Reading</option>
                  <option value="Completed">Completed</option>
                </select>
                {isSaved && (
                  <button
                    type="button"
                    className="btn btn-outline-danger btn-sm ms-2"
                    onClick={() => removeBook(id)}
                    title="Remove from Reading List"
                  >
                    <FaTrashAlt className="me-1" /> Remove
                  </button>
                )}
              </div>

              <div className="text-muted small">
                <FaLayerGroup className="me-1" /> Open Library Work ID: <code>{id}</code>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookDetails;
