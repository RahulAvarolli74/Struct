import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Register
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const endpoint = isLogin 
      ? 'http://localhost:8000/api/v1/users/login' 
      : 'http://localhost:8000/api/v1/users/register';

    try {
      // Filter data: Register needs username, Login doesn't
      const payload = isLogin 
        ? { email: formData.email, password: formData.password }
        : formData;

      const response = await axios.post(endpoint, payload);

      if (response.data.success || response.status === 200 || response.status === 201) {
        alert(isLogin ? "Login Successful!" : "Registration Successful! Please Login.");
        
        if (isLogin) {
            // Navigate to Booking Page on success
            navigate('/booking-service');
        } else {
            // Switch to login view after successful registration
            setIsLogin(true);
            setFormData({ username: '', email: '', password: '' });
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-[-20%] left-[20%] w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

      <div className="bg-white/80 backdrop-blur-lg w-full max-w-md rounded-2xl shadow-2xl overflow-hidden relative z-10">
        
        {/* Header Toggle */}
        <div className="flex">
          <button 
            onClick={() => { setIsLogin(true); setError(''); }}
            className={`w-1/2 py-4 font-bold text-lg transition-colors duration-300 ${isLogin ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
          >
            Login
          </button>
          <button 
            onClick={() => { setIsLogin(false); setError(''); }}
            className={`w-1/2 py-4 font-bold text-lg transition-colors duration-300 ${!isLogin ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
          >
            Register
          </button>
        </div>

        <div className="p-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-center text-gray-500 mb-8">
            {isLogin ? 'Enter your credentials to access your account' : 'Sign up to book your vehicle service'}
          </p>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded shadow-sm animate-pulse">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Username Field - Only for Register */}
            {/* FIX APPLIED: p-1 allows the focus ring to render without being clipped */}
            <div className={`transition-all duration-500 ease-in-out overflow-hidden ${!isLogin ? 'max-h-28 opacity-100 p-1' : 'max-h-0 opacity-0 p-0'}`}>
              <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <input 
                type="text" 
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                placeholder="johndoe"
                required={!isLogin}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                placeholder="john@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input 
                type="password" 
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                placeholder="••••••••"
                required
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;