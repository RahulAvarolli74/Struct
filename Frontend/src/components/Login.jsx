import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Stop page refresh
    setError('');

    try {
      // 1. Send data to your Backend
      const response = await axios.post('http://localhost:8000/api/v1/users/login', {
        email: email,
        password: password
      });

      // 2. If success (Backend sends 200 OK)
      if (response.data.success) {
        alert("Login Successful!");
        
        // 3. Navigate to Booking Page
        navigate('/booking-service');
      }

    } catch (err) {
      // Handle Errors (Backend sends 401/404)
      if (err.response && err.response.data) {
        // Show the specific message from your ApiError.js (e.g., "Invalid user credentials")
        setError(err.response.data.message || "Something went wrong");
      } else {
        setError("Server is not running or network error");
      }
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Login</h2>
        {error && <p style={styles.error}>{error}</p>}
        
        <form onSubmit={handleLogin}>
          <div style={styles.inputGroup}>
            <label>Email:</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
              style={styles.input}
            />
          </div>
          
          <div style={styles.inputGroup}>
            <label>Password:</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
              style={styles.input}
            />
          </div>

          <button type="submit" style={styles.button}>Login</button>
        </form>
      </div>
    </div>
  );
}

// Simple CSS-in-JS for clean look without external files
const styles = {
  container: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f0f2f5' },
  card: { padding: '2rem', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', width: '300px' },
  inputGroup: { marginBottom: '1rem' },
  input: { width: '100%', padding: '0.5rem', marginTop: '0.5rem', boxSizing: 'border-box' },
  button: { width: '100%', padding: '0.7rem', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' },
  error: { color: 'red', fontSize: '0.9rem', marginBottom: '1rem' }
};

export default Login;