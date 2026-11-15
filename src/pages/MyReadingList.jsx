import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaBookmark,
  FaChartPie,
  FaCheckCircle,
  FaBookOpen,
  FaClock,
  FaTrashAlt,
  FaSearch,
  FaCompass,
  FaBook,
} from 'react-icons/fa';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { useReadingList } from '../context/ReadingListContext.jsx';

/**
 * MyReadingList Page
 * Displays all saved books from localStorage via ReadingListContext.
 * Features:
 * - Filtering by reading status (Want to Read, Currently Reading, Completed)
 * - Quick search filter by title or author
 * - Real-time status modification & removal
 * - Recharts reading distribution analytics
 * - Informative empty states
 */
function MyReadingList() {
  const { readingList, updateBookStatus, removeBook } = useReadingList();

  const [statusFilter, setStatusFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  // Calculate statistics for Recharts
  const completedCount = readingList.filter((b) => b.status === 'Completed').length;
  const readingCount = readingList.filter((b) => b.status === 'Currently Reading').length;
  const wantToReadCount = readingList.filter((b) => b.status === 'Want to Read').length;
  const totalCount = readingList.length;

  const chartData = [
    { name: 'Completed', value: completedCount, color: '#198754' },
    { name: 'Currently Reading', value: readingCount, color: '#0d6efd' },
    { name: 'Want to Read', value: wantToReadCount, color: '#ffc107' },
  ].filter((item) => item.value > 0);

  // Filter books by status and user search query
  const displayedBooks = readingList.filter((book) => {
    const matchesStatus = statusFilter === 'All' || book.status === statusFilter;
    const matchesSearch =
      searchTerm.trim() === '' ||
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (book.author && book.author.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Completed':
        return (
          <span className="badge bg-success-subtle text-success border border-success-subtle d-inline-flex align-items-center">
            <FaCheckCircle className="me-1" /> Completed
          </span>
        );
      case 'Currently Reading':
        return (
          <span className="badge bg-primary-subtle text-primary border border-primary-subtle d-inline-flex align-items-center">
            <FaBookOpen className="me-1" /> Reading
          </span>
        );
      case 'Want to Read':
      default:
        return (
          <span className="badge bg-warning-subtle text-warning-emphasis border border-warning-subtle d-inline-flex align-items-center">
            <FaClock className="me-1" /> Want to Read
          </span>
        );
    }
  };

  // If reading list is completely empty
  if (totalCount === 0) {
    return (
      <div className="container-fluid p-0">
        <div className="card shadow-sm border-0 rounded-4 text-center p-5 bg-white my-4">
          <div className="display-3 text-muted mb-3">
            <FaBookmark />
          </div>
          <h3 className="fw-bold text-dark mb-2">Your Reading List is Empty</h3>
          <p className="text-muted mx-auto mb-4" style={{ maxWidth: '500px' }}>
            You haven't saved any books yet. Discover millions of titles using the Open
            Library search and track your reading journey!
          </p>
          <div>
            <Link to="/" className="btn btn-primary px-4 py-2 fw-semibold">
              <FaCompass className="me-2" /> Discover Books Now
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid p-0">
      {/* Header */}
      <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3 mb-4">
        <div>
          <h2 className="fw-bold text-dark mb-1 d-flex align-items-center">
            <FaBookmark className="text-primary me-2" /> My Reading List
          </h2>
          <p className="text-muted small mb-0">
            Manage your personal library, track your progress, and analyze reading trends.
          </p>
        </div>
        <div>
          <span className="badge bg-dark px-3 py-2 fs-6">
            Total Saved: {totalCount} {totalCount === 1 ? 'Book' : 'Books'}
          </span>
        </div>
      </div>

      <div className="row g-4">
        {/* Left Column: Book Collection Management */}
        <div className="col-xl-8">
          <div className="card shadow-sm border-0 rounded-3 mb-4">
            {/* Filter and Search Bar */}
            <div className="card-header bg-white border-bottom p-3">
              <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-3">
                {/* Status Filter Buttons */}
                <div className="btn-group btn-group-sm flex-wrap">
                  <button
                    type="button"
                    className={`btn ${statusFilter === 'All' ? 'btn-primary' : 'btn-outline-secondary'}`}
                    onClick={() => setStatusFilter('All')}
                  >
                    All ({totalCount})
                  </button>
                  <button
                    type="button"
                    className={`btn ${statusFilter === 'Want to Read' ? 'btn-primary' : 'btn-outline-secondary'}`}
                    onClick={() => setStatusFilter('Want to Read')}
                  >
                    Want to Read ({wantToReadCount})
                  </button>
                  <button
                    type="button"
                    className={`btn ${statusFilter === 'Currently Reading' ? 'btn-primary' : 'btn-outline-secondary'}`}
                    onClick={() => setStatusFilter('Currently Reading')}
                  >
                    Reading ({readingCount})
                  </button>
                  <button
                    type="button"
                    className={`btn ${statusFilter === 'Completed' ? 'btn-primary' : 'btn-outline-secondary'}`}
                    onClick={() => setStatusFilter('Completed')}
                  >
                    Completed ({completedCount})
                  </button>
                </div>

                {/* Filter within saved list */}
                <div className="input-group input-group-sm" style={{ maxWidth: '240px' }}>
                  <span className="input-group-text bg-light text-muted border-end-0">
                    <FaSearch />
                  </span>
                  <input
                    type="text"
                    className="form-control bg-light border-start-0 shadow-none"
                    placeholder="Filter saved books..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Book Table */}
            <div className="card-body p-0">
              {displayedBooks.length === 0 ? (
                <div className="p-5 text-center text-muted">
                  <FaBook className="fs-1 text-secondary mb-2" />
                  <p className="mb-0">
                    No books match the status filter "<strong>{statusFilter}</strong>"
                    {searchTerm ? ` and search "${searchTerm}"` : ''}.
                  </p>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover align-middle mb-0">
                    <thead className="table-light small text-uppercase">
                      <tr>
                        <th scope="col" className="ps-3">Book</th>
                        <th scope="col">Author</th>
                        <th scope="col">Status</th>
                        <th scope="col" className="text-end pe-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {displayedBooks.map((book) => {
                        const bookId = book.id || book.key;
                        return (
                          <tr key={bookId}>
                            <td className="ps-3">
                              <div className="d-flex align-items-center">
                                <img
                                  src={
                                    book.coverUrl ||
                                    'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300&auto=format&fit=crop&q=60'
                                  }
                                  alt={book.title}
                                  className="rounded me-3 shadow-sm flex-shrink-0"
                                  style={{ width: '42px', height: '58px', objectFit: 'cover' }}
                                />
                                <div style={{ maxWidth: '280px' }}>
                                  <Link
                                    to={`/book/${book.id}`}
                                    className="fw-semibold text-dark text-decoration-none text-truncate d-block"
                                    title={book.title}
                                  >
                                    {book.title}
                                  </Link>
                                  <span className="extra-small text-muted">
                                    Published: {book.firstPublishYear || 'N/A'}
                                  </span>
                                </div>
                              </div>
                            </td>
                            <td className="text-secondary small">
                              {book.author || 'Unknown Author'}
                            </td>
                            <td>{getStatusBadge(book.status)}</td>
                            <td className="text-end pe-3">
                              <div className="d-inline-flex align-items-center gap-2">
                                <select
                                  className="form-select form-select-sm"
                                  value={book.status || 'Want to Read'}
                                  onChange={(e) => updateBookStatus(bookId, e.target.value)}
                                  style={{ width: 'auto' }}
                                  aria-label="Change status"
                                >
                                  <option value="Want to Read">Want to Read</option>
                                  <option value="Currently Reading">Currently Reading</option>
                                  <option value="Completed">Completed</option>
                                </select>
                                <button
                                  type="button"
                                  className="btn btn-outline-danger btn-sm"
                                  title="Remove from list"
                                  onClick={() => removeBook(bookId)}
                                >
                                  <FaTrashAlt />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Recharts Analytics */}
        <div className="col-xl-4">
          <div className="card shadow-sm border-0 rounded-3 h-100">
            <div className="card-header bg-white border-bottom p-3">
              <h5 className="fw-bold mb-0 d-flex align-items-center">
                <FaChartPie className="text-primary me-2" /> Reading Analytics
              </h5>
            </div>
            <div className="card-body d-flex flex-column align-items-center justify-content-center p-4">
              <p className="text-muted small text-center mb-3">
                Live Distribution from your saved books (powered by <strong>Recharts</strong>)
              </p>

              {/* Recharts Pie Chart */}
              {chartData.length > 0 ? (
                <div style={{ width: '100%', height: 260 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={55}
                        outerRadius={85}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend verticalAlign="bottom" height={36} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="p-4 text-center text-muted">
                  <p>Add books with different statuses to view your analytics chart.</p>
                </div>
              )}

              {/* Quantitative Metrics Breakdown */}
              <div className="w-100 border-top pt-3 mt-3">
                <div className="d-flex justify-content-between small text-muted mb-2">
                  <span>Books Completed:</span>
                  <strong className="text-success">{completedCount}</strong>
                </div>
                <div className="d-flex justify-content-between small text-muted mb-2">
                  <span>Currently Reading:</span>
                  <strong className="text-primary">{readingCount}</strong>
                </div>
                <div className="d-flex justify-content-between small text-muted">
                  <span>In Queue (Want to Read):</span>
                  <strong className="text-warning-emphasis">{wantToReadCount}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyReadingList;

