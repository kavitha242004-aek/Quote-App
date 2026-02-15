import React, { useState, useEffect } from 'react';

const CustomSection = ({ name, quote }) => {
  const [quoteStats, setQuoteStats] = useState({
    words: 0,
    avgWordLength: 0,
    sentiment: 'neutral'
  });

  useEffect(() => {
    const words = quote.trim().split(/\s+/).filter(Boolean);
    const avgWordLength = words.length > 0 
      ? words.reduce((sum, word) => sum + word.length, 0) / words.length 
      : 0;
    
    setQuoteStats({
      words: words.length,
      avgWordLength: Math.round(avgWordLength * 10) / 10,
      sentiment: avgWordLength > 6 ? 'inspirational' : 'thoughtful'
    });
  }, [quote]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(`"${quote}" — ${name}`);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <section className="custom-section">
      <div className="container">
        <h2 className="section-title">Quote Insights ✨</h2>
        
        <div className="stats-grid">
          <div className="stat-card">
            <h3>{quoteStats.words}</h3>
            <p>Total Words</p>
          </div>
          <div className="stat-card">
            <h3>{quoteStats.avgWordLength}</h3>
            <p>Avg Word Length</p>
          </div>
          <div className="stat-card">
            <h3>{quoteStats.sentiment}</h3>
            <p>Vibe</p>
          </div>
        </div>

        <div className="share-section">
          <button className="share-btn" onClick={copyToClipboard}>
            📋 Copy Quote
          </button>
          <p className="share-text">
            Ready to inspire others? Copy and share this wisdom!
          </p>
        </div>

        <div className="quote-visualizer">
          <div className="word-cloud">
            {quote.split(/\s+/).slice(0, 15).filter(Boolean).map((word, idx) => (
              <span 
                key={idx} 
                className="word" 
                style={{ 
                  fontSize: `${Math.min(word.length * 2 + 8, 24)}px`,
                  animationDelay: `${idx * 0.1}s`
                }}
              >
                {word}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomSection;
