/**
 * Open Library API Service
 * 
 * Base URL for Open Library Search API:
 * https://openlibrary.org/search.json
 * 
 * Uses standard JavaScript fetch and async/await for network requests.
 */

const BASE_URL = 'https://openlibrary.org';

/**
 * Search books by query term (e.g. title, author, topic)
 * @param {string} query - The search keywords entered by the user
 * @param {number} page - Page number for pagination (defaults to 1)
 * @returns {Promise<Object>} Search result containing docs array and numFound
 */
export async function searchBooks(query, page = 1) {
  if (!query || query.trim() === '') {
    return { docs: [], numFound: 0 };
  }

  try {
    // encodeURIComponent safely handles spaces and special characters in queries
    const url = `${BASE_URL}/search.json?q=${encodeURIComponent(query)}&page=${page}&limit=20`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch books: HTTP status ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error in searchBooks:', error);
    throw error;
  }
}

/**
 * Helper to construct an Open Library book cover image URL
 * @param {number|string} coverId - The cover_i identifier from search results
 * @param {string} size - 'S' (small), 'M' (medium), or 'L' (large)
 * @returns {string} URL of the book cover image
 */
export function getCoverImageUrl(coverId, size = 'M') {
  if (!coverId) {
    return null; // A fallback image placeholder can be shown in the UI
  }
  return `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`;
}

