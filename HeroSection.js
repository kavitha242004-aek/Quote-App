import React from 'react';

const HeroSection = ({ name, quote }) => {
  if (!name || !quote) {
    return <div className="loading-container">Loading your wisdom...</div>;
  }

  return (
    <section className="hero-section">
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <h1 className="hero-title">"{quote}"</h1>
        <div className="hero-author">
          <span className="author-name">— {name}</span>
        </div>
        <div className="hero-stats">
          <span className="stat-item">
            <strong>{quote.length}</strong> characters
          </span>
          <span className="stat-item">
            <strong>{quote.split(/\s+/).filter(Boolean).length}</strong> words
          </span>
          <span className="stat-item">
            <strong>Feb 15, 2026</strong> shared
          </span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
