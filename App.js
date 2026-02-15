import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FormPage from './components/FormPage';
import DisplayPage from './components/DisplayPage';
import './App.css';

const AppContent = () => (
  <div className="App">
    <Routes>
      <Route path="/" element={<FormPage />} />
      <Route path="/display" element={<DisplayPage />} />
    </Routes>
  </div>
);

const App = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;
