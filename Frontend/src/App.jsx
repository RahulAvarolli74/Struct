import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import BookingService from './components/BookingService';

function App() {
  return (
    <Router>
      <Routes>
        {/* Default path redirects to Login */}
        <Route path="/" element={<Navigate to="/login" />} />
        
        <Route path="/login" element={<Login />} />
        <Route path="/booking-service" element={<BookingService />} />
      </Routes>
    </Router>
  );
}

export default App;