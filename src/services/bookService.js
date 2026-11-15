/**
 * Book Service
 * 
 * Handles all external network communication with the Open Library REST API.
 * Uses standard JavaScript fetch() and async/await syntax.
 */

// Placeholder cover image when Open Library does not have a cover_i for a title
export const PLACEHOLDER_COVER =
  'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300&auto=format&fit=crop&q=60';

/**
 * Searches books using the Open Library Search API.
 * 
 * @param {string} query - Search terms (e.g., book title, author, subject)
 * @param {number} limit - Number of records to return (defaults to 20)
 * @returns {Promise<Array>} Array of parsed and normalized book objects
 */
export async function searchBooks(query, limit = 20) {
  // Guard clause: return empty array if query is empty or whitespace
  if (!query || !query.trim()) {
    return [];
  }

  // Construct Open Library search endpoint URL with requested fields
  const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(
    query.trim()
  )}&fields=key,title,author_name,cover_i,first_publish_year&limit=${limit}`;

  try {
    const response = await fetch(url);

    // Verify HTTP response status (200-299)
    if (!response.ok) {
      throw new Error(`Open Library API responded with status ${response.status} (${response.statusText})`);
    }

    const data = await response.json();

    // Map over docs array and normalize fields for the React components
    const docs = Array.isArray(data.docs) ? data.docs : [];

    return docs.map((doc) => {
      // Clean author name: Open Library returns an array of strings
      const authorText =
        Array.isArray(doc.author_name) && doc.author_name.length > 0
          ? doc.author_name.join(', ')
          : 'Unknown Author';

      // Clean work ID from key (e.g., "/works/OL27482W" -> "OL27482W")
      const cleanId = doc.key ? doc.key.replace('/works/', '') : '';

      // Construct cover URL or fallback placeholder
      const coverUrl = doc.cover_i
        ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg`
        : PLACEHOLDER_COVER;

      return {
        key: doc.key || cleanId,
        id: cleanId || doc.key,
        title: doc.title || 'Untitled',
        author_name: authorText,
        author: authorText, // convenient alias for BookCard
        first_publish_year: doc.first_publish_year || 'N/A',
        firstPublishYear: doc.first_publish_year || 'N/A', // alias for BookCard
        cover_i: doc.cover_i || null,
        coverUrl: coverUrl, // cover URL with placeholder fallback
        cover_url: coverUrl,
      };
    });
  } catch (error) {
    console.error('Error fetching books from Open Library:', error);
    // Re-throw so the UI component can handle error states
    throw error;
  }
}

