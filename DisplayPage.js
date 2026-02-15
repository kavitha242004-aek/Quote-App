import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import HeroSection from './HeroSection';
import CustomSection from './CustomSection';

const DisplayPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [data, setData] = useState({ name: '', quote: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const name = searchParams.get('name');
    const quote = searchParams.get('quote');
    
    if (name?.trim() && quote?.trim()) {
      try {
        setData({ 
          name: decodeURIComponent(name), 
          quote: decodeURIComponent(quote) 
        });
      } catch (error) {
        console.error('Decode error:', error);
      }
    } else {
      navigate('/', { replace: true });
    }
    setLoading(false);
  }, [searchParams, navigate]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading your quote...</p>
      </div>
    );
  }

  return (
    <div className="display-page">
      <HeroSection name={data.name} quote={data.quote} />
      <CustomSection name={data.name} quote={data.quote} />
    </div>
  );
};

export default DisplayPage;
