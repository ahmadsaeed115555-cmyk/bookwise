import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

/**
 * ReadingListContext
 * Global state management for saving books and persisting them to localStorage.
 */
const ReadingListContext = createContext(null);

const STORAGE_KEY = 'bookwise_reading_list';

export function ReadingListProvider({ children }) {
  // 1. Initialize state from localStorage (or fallback to empty array)
  const [readingList, setReadingList] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error reading reading list from localStorage:', error);
      return [];
    }
  });

  // 2. Automatically sync to localStorage whenever readingList changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(readingList));
    } catch (error) {
      console.error('Error saving reading list to localStorage:', error);
    }
  }, [readingList]);

  /**
   * Helper to find a book in the list by either its id or Open Library key
   */
  const findBookIndex = (bookId) => {
    if (!bookId) return -1;
    return readingList.findIndex(
      (b) => b.id === bookId || b.key === bookId || b.id === bookId.replace('/works/', '')
    );
  };

  /**
   * Check if a book is already in the reading list
   */
  const isBookSaved = (bookId) => {
    return findBookIndex(bookId) !== -1;
  };

  /**
   * Get the current reading status for a book (or null if not saved)
   */
  const getBookStatus = (bookId) => {
    const idx = findBookIndex(bookId);
    return idx !== -1 ? readingList[idx].status : null;
  };

  /**
   * Add a book to the reading list
   * @param {Object} book - The book object
   * @param {string} status - 'Want to Read' | 'Currently Reading' | 'Completed'
   */
  const addBook = (book, status = 'Want to Read') => {
    if (!book) return;

    const bookIdentifier = book.id || book.key;
    const existingIndex = findBookIndex(bookIdentifier);

    if (existingIndex !== -1) {
      // Book already exists -> update its status
      updateBookStatus(bookIdentifier, status);
      return;
    }

    const newBook = {
      id: book.id || (book.key ? book.key.replace('/works/', '') : String(Date.now())),
      key: book.key || `/works/${book.id}`,
      title: book.title || 'Untitled',
      author: book.author || book.author_name || 'Unknown Author',
      firstPublishYear: book.firstPublishYear || book.first_publish_year || 'N/A',
      coverUrl: book.coverUrl || book.cover_url || '',
      status: status,
      addedAt: new Date().toISOString(),
    };

    setReadingList((prev) => [newBook, ...prev]);
    toast.success(`"${newBook.title}" added to ${status}!`);
  };

  /**
   * Remove a book from the reading list
   */
  const removeBook = (bookId) => {
    const targetBook = readingList.find(
      (b) => b.id === bookId || b.key === bookId || b.id === bookId.replace('/works/', '')
    );

    setReadingList((prev) =>
      prev.filter(
        (b) => b.id !== bookId && b.key !== bookId && b.id !== bookId.replace('/works/', '')
      )
    );

    if (targetBook) {
      toast.info(`Removed "${targetBook.title}" from your reading list.`);
    }
  };

  /**
   * Update reading status for an existing book
   */
  const updateBookStatus = (bookId, newStatus) => {
    setReadingList((prev) =>
      prev.map((b) => {
        if (b.id === bookId || b.key === bookId || b.id === bookId.replace('/works/', '')) {
          return { ...b, status: newStatus };
        }
        return b;
      })
    );
    toast.info(`Status updated to "${newStatus}"!`);
  };

  const value = {
    readingList,
    addBook,
    removeBook,
    updateBookStatus,
    isBookSaved,
    getBookStatus,
  };

  return (
    <ReadingListContext.Provider value={value}>
      {children}
    </ReadingListContext.Provider>
  );
}

/**
 * Custom Hook: useReadingList
 * Provides easy access to the reading list state and management actions.
 */
export function useReadingList() {
  const context = useContext(ReadingListContext);
  if (!context) {
    throw new Error('useReadingList must be used within a ReadingListProvider');
  }
  return context;
}

