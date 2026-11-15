import React from 'react';
import BookCard from './BookCard.jsx';
import { FaBook } from 'react-icons/fa';

/**
 * BookGrid Component
 * Displays a responsive grid of BookCard components.
 * 
 * Props:
 * - books: Array of book objects to render
 * - onSaveBook: Optional callback forwarded to BookCard
 * - emptyMessage: Text displayed when the list is empty
 */
function BookGrid({ books = [], onSaveBook, emptyMessage = 'No books found. Try adjusting your search!' }) {
  if (!books || books.length === 0) {
    return (
      <div className="card border-0 shadow-sm rounded-3 p-5 text-center my-4">
        <div className="display-4 text-muted mb-3">
          <FaBook />
        </div>
        <h5 className="fw-bold text-dark mb-2">No Books to Display</h5>
        <p className="text-muted mb-0">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4 my-2">
      {books.map((book, index) => (
        <BookCard key={book.id || book.key || index} book={book} onSave={onSaveBook} />
      ))}
    </div>
  );
}

export default BookGrid;
