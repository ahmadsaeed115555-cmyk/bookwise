import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

// Global State Provider
import { ReadingListProvider } from './context/ReadingListContext.jsx';

// Layout Components
import Sidebar from './components/Sidebar.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';

// Pages
import DiscoverBooks from './pages/DiscoverBooks.jsx';
import BookDetails from './pages/BookDetails.jsx';
import ReadingList from './pages/ReadingList.jsx';

// Global Styles
import './App.css';

/**
 * Main Application Component
 * Wraps the dashboard with:
 * 1. React Router (<Router>)
 * 2. ReadingListProvider (Global state synchronized with localStorage)
 * 3. ToastContainer (User notifications)
 */
function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Router>
      <ReadingListProvider>
        <div className="app-dashboard-layout">
          {/* 1. Dark Navy Sidebar */}
          <Sidebar
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />

          {/* 2. Main Content Area */}
          <div className="main-content-wrapper">
            {/* Top Search Bar & Header */}
            <Header
              onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
            />

            {/* Dynamic Page Views */}
            <main className="page-content">
              <Routes>
                <Route path="/" element={<DiscoverBooks />} />
                <Route path="/book/:id" element={<BookDetails />} />
                <Route path="/reading-list" element={<ReadingList />} />
                {/* Fallback 404 Route */}
                <Route
                  path="*"
                  element={
                    <div className="card shadow-sm border-0 p-5 text-center my-4">
                      <h3 className="fw-bold">404 - Page Not Found</h3>
                      <p className="text-muted">The requested view could not be located.</p>
                      <div>
                        <Link to="/" className="btn btn-primary">
                          Return to Discover Books
                        </Link>
                      </div>
                    </div>
                  }
                />
              </Routes>
            </main>

            {/* Application Footer */}
            <Footer />
          </div>

          {/* Toast Notification Container */}
          <ToastContainer position="bottom-right" autoClose={3000} theme="colored" />
        </div>
      </ReadingListProvider>
    </Router>
  );
}

export default App;
