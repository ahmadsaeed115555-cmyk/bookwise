import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// 1. Import Bootstrap CSS and JS for responsive layout and components
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// 2. Import React Toastify CSS for notifications
import 'react-toastify/dist/ReactToastify.css';

// 3. Import global custom styles
import './index.css';

// 4. Import root App component
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
