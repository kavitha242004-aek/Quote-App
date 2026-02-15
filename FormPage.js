import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FormPage = () => {
  const [formData, setFormData] = useState({ name: '', quote: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.quote.trim()) newErrors.quote = 'Quote is required';
    if (formData.quote.trim().length < 10) newErrors.quote = 'Quote must be at least 10 characters';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    
    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      setTimeout(() => {
        navigate(`/display?name=${encodeURIComponent(formData.name.trim())}&quote=${encodeURIComponent(formData.quote.trim())}`);
      }, 800);
    } else {
      setErrors(validationErrors);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="form-page">
      <div className="container">
        <div className="form-card">
          <h1 className="form-title">Share Your Wisdom</h1>
          <p className="form-subtitle">Enter your name and a meaningful quote</p>
          
          <form onSubmit={handleSubmit} className="quote-form">
            <div className="form-group">
              <label htmlFor="name">Your Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? 'input-error' : ''}
                placeholder="Enter your full name"
                maxLength={50}
              />
              {errors.name && <span className="error">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="quote">Your Quote</label>
              <textarea
                id="quote"
                name="quote"
                value={formData.quote}
                onChange={handleChange}
                className={errors.quote ? 'input-error' : ''}
                placeholder="Share a quote that inspires you..."
                rows={4}
                maxLength={500}
              />
              {errors.quote && <span className="error">{errors.quote}</span>}
              <div className="char-count">
                {formData.quote.length}/500 characters
              </div>
            </div>

            <button 
              type="submit" 
              className="submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Share Quote'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormPage;
