import React from 'react';
import { Link } from 'react-router-dom';
import './NotFoundPage.css';

const NotFoundPage = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1 className="error-code">404</h1>
        <h2 className="error-message">Oops! Page not found.</h2>
        <p className="error-description">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link to="/" className="go-home-link">Go to Homepage</Link>
      </div>
    </div>
  );
};

export default NotFoundPage;