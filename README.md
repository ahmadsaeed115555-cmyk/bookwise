# BookWise – Global Book Explorer 📚

A modern, responsive React web application that allows users to search, explore, and track books from across the globe using the **Open Library REST API**, manage a personal reading list with local persistence, and visualize reading habits with interactive charts.

🔗 **Live Deployment:** [https://ahmadsaeed115555-cmyk.github.io/bookwise/](https://ahmadsaeed115555-cmyk.github.io/bookwise/)

---

## 🌟 Key Application Features

- **Global Book Discovery**: Real-time searching across millions of titles, authors, and subjects using the Open Library Search API.
- **Dedicated Book Details**: Extended book metadata view displaying cover art, publication year, author information, and work identifiers.
- **Reading List & Status Tracking**: Save books and organize them into distinct reading statuses:
  - 🟡 *Want to Read*
  - 🔵 *Currently Reading*
  - 🟢 *Completed*
- **Local Storage Synchronization**: All saved books and status updates automatically persist in the browser's `localStorage` (`bookwise_reading_list`), so your reading list is preserved across sessions and reloads.
- **Interactive Reading Analytics**: Dynamic data visualization powered by **Recharts** (Donut/Pie charts) that calculates and displays live reading distribution metrics.
- **Responsive Library Dashboard**:
  - Dark navy navigation sidebar with a live saved-book counter.
  - Mobile slide-out drawer with backdrop overlay for phones and tablets.
  - Top search bar synchronized with React Router query parameters (`?q=...`).
  - Smooth card hover animations, cover aspect ratio preservation, and image fallback handling.
- **Toast Notifications**: Clean feedback popups powered by **React Toastify** when books are added, updated, or removed.
- **Graceful Loading & Error States**: Reusable loading spinners and error banners with retry capabilities for resilient network communication.

---

## 🛠️ Technologies & Libraries

| Technology | Purpose |
| :--- | :--- |
| **React 19 (JavaScript)** | Modern component-based user interface development without TypeScript |
| **Vite** | Ultra-fast next-generation frontend build tool and development server |
| **React Router (`react-router-dom` v7)** | Declarative client-side routing for seamless page transitions |
| **Bootstrap 5 (`bootstrap` v5.3)** | Responsive grid system, typography, cards, and UI components |
| **React Icons (`react-icons` v5)** | Lightweight vector iconography (Font Awesome library) |
| **Recharts (`recharts` v3)** | Composable, declarative SVG charting for reading progress analytics |
| **React Toastify (`react-toastify` v11)** | User notifications for state changes and API actions |

---

## 🌐 Open Library API Integration

This project uses the free, public, and open **Open Library REST API** without requiring paid access or private API keys:

- **Search Endpoint**:
  ```http
  GET https://openlibrary.org/search.json?q={query}&fields=key,title,author_name,cover_i,first_publish_year&limit=20
  ```
- **Book Cover CDN**:
  ```http
  GET https://covers.openlibrary.org/b/id/{cover_i}-M.jpg
  ```
- **Implementation**: Written in [src/services/bookService.js](file:///c:/React-Projects/src/services/bookService.js) using native `fetch()` and `async/await` syntax, with automatic URL encoding via `encodeURIComponent()` and fallback placeholder covers for titles without uploaded art.

---

## 📂 Project Architecture

```text
React-Projects/
├── public/                     # Static assets (favicons, icons)
├── src/
│   ├── assets/                 # Local images and graphic assets
│   ├── components/             # Modular, reusable UI components
│   │   ├── BookCard.jsx        # Individual book card with status dropdown
│   │   ├── BookGrid.jsx        # Responsive Bootstrap grid with empty-state handling
│   │   ├── ErrorMessage.jsx    # Alert component with retry button
│   │   ├── Footer.jsx          # Dashboard footer
│   │   ├── Header.jsx          # Top search bar with mobile toggle
│   │   ├── LoadingSpinner.jsx  # Animated loading indicator
│   │   └── Sidebar.jsx         # Dark navy sidebar with live count badge
│   ├── context/
│   │   └── ReadingListContext.jsx # Global state management & localStorage persistence
│   ├── data/
│   │   └── sampleBooks.js      # Sample dataset for visual testing & fallbacks
│   ├── pages/                  # Main page views
│   │   ├── BookDetails.jsx     # View metadata for an individual book
│   │   ├── DiscoverBooks.jsx   # Live search and quick topic exploration
│   │   ├── MyReadingList.jsx   # Saved collection management & Recharts analytics
│   │   └── ReadingList.jsx     # Route alias for MyReadingList
│   ├── services/
│   │   └── bookService.js      # Open Library REST API fetching logic
│   ├── App.css                 # Custom dashboard styling & animations
│   ├── App.jsx                 # Route definitions & provider wrappers
│   ├── index.css               # Global base styles
│   └── main.jsx                # React root entry point with Bootstrap imports
├── .gitignore                  # Git ignore rules for node_modules, dist, and secrets
├── index.html                  # Single Page Application HTML entry point
├── package.json                # Project dependencies and npm scripts
├── package-lock.json           # Exact dependency version lockfile
└── vite.config.js              # Vite build tool configuration
```

---

## 💻 Getting Started & Installation

### Prerequisites

- **Node.js** (v18.0.0 or higher recommended)
- **npm** (comes with Node.js)

### 1. Clone the Repository

```bash
git clone https://github.com/ahmadsaeed115555-cmyk/bookwise.git
cd bookwise
```

### 2. Install Dependencies

Install all required packages:

```bash
npm install
```

---

## 🚀 Running the Application

### Start Development Server

Run the local development server with Hot Module Replacement (HMR):

```bash
npm run dev
```

> [!NOTE]
> **Windows PowerShell Users:** If you encounter a script execution policy error with `npm`, run:
> ```powershell
> npm.cmd run dev
> ```

Once started, open your web browser and navigate to:
```text
http://localhost:5173/
```

### Build for Production

To create an optimized production bundle in the `dist/` directory:

```bash
npm run build
```

### Preview Production Build

To locally preview the production build generated in `dist/`:

```bash
npm run preview
```

---

## 🎓 University Project Details

- **Project Name**: BookWise – Global Book Explorer
- **Author**: University Student Final Project
- **License**: MIT Open Source
