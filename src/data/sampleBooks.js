/**
 * Sample Book Data
 * 
 * Used for testing and verifying the visual layout before connecting the live Open Library API.
 * Uses real Open Library cover IDs (https://covers.openlibrary.org/b/id/{cover_id}-M.jpg)
 * and realistic metadata matching Open Library's search.json format.
 */

export const SAMPLE_BOOKS = [
  {
    id: 'OL262758W',
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    firstPublishYear: 1937,
    coverUrl: 'https://covers.openlibrary.org/b/id/8406786-M.jpg',
    genres: ['Fantasy', 'Adventure', 'Classics'],
    rating: 4.7,
    editionCount: 420,
    status: 'Completed',
  },
  {
    id: 'OL1168007W',
    title: '1984',
    author: 'George Orwell',
    firstPublishYear: 1949,
    coverUrl: 'https://covers.openlibrary.org/b/id/7222246-M.jpg',
    genres: ['Dystopian', 'Political Fiction', 'Classics'],
    rating: 4.6,
    editionCount: 780,
    status: 'Currently Reading',
  },
  {
    id: 'OL58434W',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    firstPublishYear: 1960,
    coverUrl: 'https://covers.openlibrary.org/b/id/8225261-M.jpg',
    genres: ['Historical Fiction', 'Courtroom', 'Classics'],
    rating: 4.8,
    editionCount: 310,
    status: 'Want to Read',
  },
  {
    id: 'OL468436W',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    firstPublishYear: 1925,
    coverUrl: 'https://covers.openlibrary.org/b/id/7984916-M.jpg',
    genres: ['Literary Fiction', 'Jazz Age', 'Tragedy'],
    rating: 4.3,
    editionCount: 650,
    status: 'Completed',
  },
  {
    id: 'OL149925W',
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    firstPublishYear: 1813,
    coverUrl: 'https://covers.openlibrary.org/b/id/8231856-M.jpg',
    genres: ['Romance', 'Satire', 'Classic Literature'],
    rating: 4.7,
    editionCount: 920,
    status: 'Want to Read',
  },
  {
    id: 'OL893415W',
    title: 'Dune',
    author: 'Frank Herbert',
    firstPublishYear: 1965,
    coverUrl: 'https://covers.openlibrary.org/b/id/8114342-M.jpg',
    genres: ['Science Fiction', 'Space Opera', 'Philosophy'],
    rating: 4.5,
    editionCount: 290,
    status: 'Currently Reading',
  },
  {
    id: 'OL27479W',
    title: 'Brave New World',
    author: 'Aldous Huxley',
    firstPublishYear: 1932,
    coverUrl: 'https://covers.openlibrary.org/b/id/9255566-M.jpg',
    genres: ['Science Fiction', 'Dystopian'],
    rating: 4.4,
    editionCount: 340,
    status: 'Want to Read',
  },
  {
    id: 'OL2163649W',
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    firstPublishYear: 1951,
    coverUrl: 'https://covers.openlibrary.org/b/id/8235113-M.jpg',
    genres: ['Coming-of-age', 'Fiction'],
    rating: 4.1,
    editionCount: 410,
    status: 'Completed',
  },
];

