
import React from 'react';

const SkipToContent: React.FC = () => {
  return (
    <div className="skip-links">
      <a href="#main-content" className="skip-link" id="skip-to-content">
        Skip to main content
      </a>
      <a href="#main-nav" className="skip-link" id="skip-to-navigation">
        Skip to main navigation
      </a>
      <a href="#footer" className="skip-link" id="skip-to-footer">
        Skip to footer
      </a>
    </div>
  );
};

export default SkipToContent;
