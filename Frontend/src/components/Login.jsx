import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';

export default function Login() {
  // --- Logic State (From Source 2) ---
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // --- Animation State (From Source 1) ---
  const [mounted, setMounted] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setMounted(true);
  }, []);

  // --- Handlers (From Source 2) ---
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error when user types, for better UX
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const endpoint = isLogin
      ? 'http://localhost:8000/api/v1/users/login'
      : 'http://localhost:8000/api/v1/users/register';

    try {
      const payload = isLogin
        ? { email: formData.email, password: formData.password }
        : formData;

      const response = await axios.post(endpoint, payload);

      if (response.data.success || response.status === 200 || response.status === 201) {
        alert(isLogin ? "Login Successful!" : "Registration Successful! Please Login.");

        if (isLogin) {
          navigate('/booking-service');
        } else {
          // Switch to login view
          setIsLogin(true);
          setFormData({ username: '', email: '', password: '' });
        }
      }
    } catch (err) {
      console.error("API Error:", err);
      const errorMessage = err.response?.data?.message || err.message || "Something went wrong.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Helper to switch modes and clear errors
  const toggleMode = (mode) => {
    setError('');
    setIsLogin(mode);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f0f11] text-white font-sans selection:bg-indigo-500/30">

      {/* --- LOGIN FORM (Centered) --- */}
      <div className="w-full flex items-center justify-center p-6 relative">
        {/* Mobile Background Elements */}
        <div className="lg:hidden absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-indigo-900/20 rounded-full blur-[80px]"></div>
        </div>

        <div className={`w-full max-w-md transition-all duration-700 ${mounted ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>

          {/* Header */}
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl font-bold tracking-tight text-white">Service Provider</span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">
              {isLogin ? 'Welcome back' : 'Create an account'}
            </h1>
            <p className="text-gray-400">
              {isLogin ? 'Enter your details to access your account.' : 'Start your journey with us today.'}
            </p>
          </div>

          {/* Switcher Buttons */}
          <div className="flex p-1 bg-[#1a1a1a] rounded-xl mb-8 border border-white/5">
            <button
              onClick={() => toggleMode(true)}
              type="button"
              className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all duration-300 ${isLogin ? 'bg-[#2a2a2a] text-white shadow-sm' : 'text-gray-500 hover:text-gray-300'
                }`}
            >
              Sign In
            </button>
            <button
              onClick={() => toggleMode(false)}
              type="button"
              className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all duration-300 ${!isLogin ? 'bg-[#2a2a2a] text-white shadow-sm' : 'text-gray-500 hover:text-gray-300'
                }`}
            >
              Sign Up
            </button>
          </div>

          {/* Error Display */}
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-start gap-3">
              <div className="mt-0.5 min-w-[6px] h-1.5 rounded-full bg-red-500" />
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Username (Only for Register) */}
            <div className={`transition-all duration-300 overflow-hidden ${!isLogin ? 'h-20 opacity-100' : 'h-0 opacity-0'}`}>
              <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wider">Username</label>
              <div className="group relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-indigo-400 transition-colors">
                  <User size={18} />
                </div>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required={!isLogin}
                  className="w-full bg-[#1a1a1a] border border-[#2a2a2a] text-white rounded-xl py-3.5 pl-11 pr-4 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all placeholder-gray-600"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wider">Email</label>
              <div className="group relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-indigo-400 transition-colors">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@company.com"
                  required
                  className="w-full bg-[#1a1a1a] border border-[#2a2a2a] text-white rounded-xl py-3.5 pl-11 pr-4 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all placeholder-gray-600"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between mb-1.5">
                <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider">Password</label>
              </div>
              <div className="group relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-indigo-400 transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  className="w-full bg-[#1a1a1a] border border-[#2a2a2a] text-white rounded-xl py-3.5 pl-11 pr-4 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all placeholder-gray-600"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-medium py-3.5 rounded-xl transition-all shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2 mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : (
                <>
                  <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-500">
            By continuing, you agree to our <a href="#" className="text-gray-400 hover:text-white underline">Terms</a> and <a href="#" className="text-gray-400 hover:text-white underline">Privacy Policy</a>.
          </p>
        </div>
      </div>

      {/* Global Animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-10px, 10px); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.8; }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}