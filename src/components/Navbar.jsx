import React from 'react';

/**
 * Navbar Component
 * Displays the top application header with brand logo and navigation links.
 */
function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-container">
        {/* Brand logo & title */}
        <div className="navbar-brand">
          <div className="brand-icon">🎓</div>
          <div>
            <h1 className="brand-title">EduManage</h1>
            <p className="brand-subtitle">Student Management Portal</p>
          </div>
        </div>

        {/* Navigation links & status badge */}
        <nav className="navbar-nav">
          <span className="nav-badge">
            <span className="status-dot"></span> Live System
          </span>
          <a href="#dashboard" className="nav-link active">Dashboard</a>
          <a href="#register-section" className="nav-link">Register</a>
          <a href="#students-section" className="nav-link">Student Directory</a>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
