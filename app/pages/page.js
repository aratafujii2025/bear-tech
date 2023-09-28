"use client"

// src/index.js
import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot instead of ReactDOM
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';

const root = createRoot(document.getElementById('root')); // Use createRoot

root.render(
  <Router>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Router>
);
