import React from 'react';
import { useNavigate } from 'react-router-dom';

function BookingService() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // In a real app, you would clear tokens here
    navigate('/login');
  };

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Welcome to Booking Service</h1>
      <p>You have successfully logged into the dashboard.</p>
      
      <div style={{ marginTop: '2rem', padding: '1rem', border: '1px dashed #ccc' }}>
        <h3>Service Dashboard</h3>
        <p>Your booking options will appear here.</p>
      </div>

      <button 
        onClick={handleLogout} 
        style={{ marginTop: '2rem', padding: '10px 20px', cursor: 'pointer' }}
      >
        Logout
      </button>
    </div>
  );
}

export default BookingService;