import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  FaCompass,
  FaBookOpen,
  FaSearch,
  FaGlobeAmericas,
  FaTimes,
  FaFilter,
} from 'react-icons/fa';
import BookGrid from '../components/BookGrid.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';
import { searchBooks } from '../services/bookService.js';

/**
 * DiscoverBooks Page
 * Connects to the external Open Library REST API:
 * 1. Executes async queries using searchBooks()
 * 2. Displays LoadingSpinner during network requests
 * 3. Shows ErrorMessage with retry capability on failure
 * 4. Renders responsive BookCard results via BookGrid
 */
function DiscoverBooks() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Read search term from URL query parameter (?q=...) or fallback to default
  const queryParam = searchParams.get('q') || '';
  const [inputQuery, setInputQuery] = useState(queryParam);

  // API State
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeQuery, setActiveQuery] = useState('');

  // Curated quick search topics for instant exploration
  const popularTopics = [
    'Classic Literature',
    'Science Fiction',
    'Fantasy',
    'Dystopian',
    'Mystery',
    'Philosophy',
    'Psychology',
    'History',
  ];

  /**
   * Fetch books from Open Library API
   */
  const executeSearch = useCallback(async (searchTerm) => {
    const term = searchTerm?.trim() || '';
    if (!term) return;

    setIsLoading(true);
    setError(null);
    setActiveQuery(term);

    try {
      const results = await searchBooks(term, 20);
      setBooks(results);
      if (results.length === 0) {
        toast.info(`No books found matching "${term}".`);
      }
    } catch (err) {
      console.error('Search error in DiscoverBooks:', err);
      setError(
        err.message || 'Failed to connect to Open Library. Please verify your internet connection.'
      );
      toast.error('Could not load books from Open Library.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Sync state with URL parameter changes and trigger search
  useEffect(() => {
    const queryToSearch = queryParam.trim() || 'Classic';
    setInputQuery(queryParam);
    executeSearch(queryToSearch);
  }, [queryParam, executeSearch]);

  // Form submit handler for on-page search input
  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = inputQuery.trim();
    if (trimmed) {
      setSearchParams({ q: trimmed });
    } else {
      setSearchParams({});
    }
  };

  // Quick chip click handler
  const handleTopicClick = (topic) => {
    setInputQuery(topic);
    setSearchParams({ q: topic });
  };

  // Clear search input
  const handleClearInput = () => {
    setInputQuery('');
    setSearchParams({});
  };

  // Bookmark / Save handler (feedback notification)
  const handleSaveBook = (book) => {
    toast.success(`"${book.title}" added to your reading list!`);
  };

  return (
    <div className="container-fluid p-0">
      {/* Hero Welcome Banner */}
      <div className="dashboard-hero d-flex flex-column flex-lg-row align-items-lg-center justify-content-between gap-3">
        <div>
          <span className="badge bg-white text-primary mb-2 px-3 py-1 fw-bold">
            <FaCompass className="me-1" /> Open Library REST API Live
          </span>
          <h2 className="fw-bold mb-2">Explore the World's Knowledge</h2>
          <p className="text-white-50 mb-0" style={{ maxWidth: '650px' }}>
            Directly connected to Open Library’s global catalog. Search by title, author, or
            subject to retrieve real publication records, cover art, and metadata.
          </p>
        </div>

        <div className="d-flex align-items-center gap-3">
          <div className="bg-white bg-opacity-10 p-3 rounded-3 text-center border border-white border-opacity-10">
            <h4 className="fw-bold mb-0 text-white">{books.length}</h4>
            <span className="extra-small text-white-50">Books Loaded</span>
          </div>
          <div className="bg-white bg-opacity-10 p-3 rounded-3 text-center border border-white border-opacity-10">
            <h4 className="fw-bold mb-0 text-white">REST</h4>
            <span className="extra-small text-white-50">fetch / async</span>
          </div>
        </div>
      </div>

      {/* On-Page Search Input Bar */}
      <div className="card shadow-sm border-0 rounded-3 mb-4 p-3 bg-white">
        <form onSubmit={handleSubmit}>
          <div className="input-group input-group-lg">
            <span className="input-group-text bg-white border-end-0 text-primary">
              <FaSearch />
            </span>
            <input
              type="text"
              className="form-control border-start-0 border-end-0 shadow-none ps-0"
              placeholder="Search books by title, author, or subject (e.g. Tolkien, 1984, Dune)..."
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              aria-label="Search Open Library"
            />
            {inputQuery && (
              <button
                type="button"
                className="btn btn-white border-top border-bottom text-muted"
                onClick={handleClearInput}
                title="Clear input"
              >
                <FaTimes />
              </button>
            )}
            <button className="btn btn-primary px-4 fw-semibold" type="submit" disabled={isLoading}>
              {isLoading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </form>

        {/* Popular Topic Filter Pills */}
        <div className="d-flex flex-wrap align-items-center gap-2 mt-3 pt-2 border-top">
          <span className="small text-muted fw-semibold me-1 d-flex align-items-center">
            <FaFilter className="me-1" /> Quick Topics:
          </span>
          {popularTopics.map((topic) => (
            <button
              key={topic}
              type="button"
              className={`btn btn-sm filter-chip ${
                activeQuery.toLowerCase() === topic.toLowerCase()
                  ? 'btn-primary shadow-sm'
                  : 'btn-outline-secondary bg-light'
              }`}
              onClick={() => handleTopicClick(topic)}
              disabled={isLoading}
            >
              {topic}
            </button>
          ))}
        </div>
      </div>

      {/* Results Header */}
      <div className="d-flex align-items-center justify-content-between mb-3">
        <div>
          <h4 className="fw-bold text-dark mb-1 d-flex align-items-center">
            <FaBookOpen className="text-primary me-2" />
            {activeQuery ? `Results for "${activeQuery}"` : 'Book Catalog'}
          </h4>
          <p className="text-muted small mb-0">
            Real-time books queried from Open Library API (limit: 20 records).
          </p>
        </div>
        {!isLoading && books.length > 0 && (
          <span className="badge bg-secondary-subtle text-secondary border px-3 py-2 small">
            Showing {books.length} items
          </span>
        )}
      </div>

      {/* 1. Loading State */}
      {isLoading && (
        <LoadingSpinner
          message={`Querying Open Library for "${activeQuery}"...`}
        />
      )}

      {/* 2. Error State */}
      {!isLoading && error && (
        <ErrorMessage
          title="Open Library Query Failed"
          message={error}
          onRetry={() => executeSearch(activeQuery)}
        />
      )}

      {/* 3. Success State: BookGrid */}
      {!isLoading && !error && (
        <BookGrid
          books={books}
          onSaveBook={handleSaveBook}
          emptyMessage={`No books found for "${activeQuery}". Try searching for another author, title, or topic.`}
        />
      )}
    </div>
  );
}

export default DiscoverBooks;
