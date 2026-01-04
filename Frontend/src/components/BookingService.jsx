import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Check, ArrowRight, Loader2, LogOut, Sparkles } from 'lucide-react';

const SERVICE_PACKAGES = [
  {
    id: 1,
    packageName: "Basic Service",
    price: "$99",
    validity: "3 Months",
    status: "Available",
    services: ["Oil Change", "Car Wash", "General Inspection", "Tire Pressure Check"],
    gradient: "from-blue-600 to-blue-700"
  },
  {
    id: 2,
    packageName: "Premium Service",
    price: "$199",
    validity: "6 Months",
    status: "Available",
    services: ["All Basic Services", "AC Filter Replacement", "Brake Check", "Wheel Alignment"],
    gradient: "from-purple-600 to-purple-700"
  },
  {
    id: 3,
    packageName: "Gold Service",
    price: "$299",
    validity: "1 Year",
    status: "Available",
    services: ["All Premium Services", "Engine Tuning", "Interior Detailing", "Battery Replacement"],
    gradient: "from-yellow-600 to-yellow-700"
  }
];

function BookingService() {
  const navigate = useNavigate();
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [bookingForm, setBookingForm] = useState({
    customerName: '',
    vehicleType: ''
  });
  const [bookingStatus, setBookingStatus] = useState({ type: '', msg: '' });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handlePackageSelect = (pkg) => {
    setSelectedPackage(pkg);
    setBookingStatus({ type: '', msg: '' });
    // Scroll to form
    setTimeout(() => {
      document.getElementById('booking-form')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleBookService = async (e) => {
    e.preventDefault();
    setBookingStatus({ type: 'loading', msg: 'Processing your booking...' });

    try {
      const payload = {
        customerName: bookingForm.customerName,
        packageName: selectedPackage.packageName,
        vehicleType: bookingForm.vehicleType,
        price: selectedPackage.price
      };
      const response = await axios.post('http://localhost:8000/api/v1/bookings/bookService', payload);

      if (response.status === 201 || response.status === 200) {
        setBookingStatus({ type: 'success', msg: 'Booking Confirmed Successfully!' });
        setTimeout(() => {
          setSelectedPackage(null);
          setBookingForm({ customerName: '', vehicleType: '' });
          setBookingStatus({ type: '', msg: '' });
        }, 3000);
      }
    } catch (error) {
      setBookingStatus({
        type: 'error',
        msg: error.response?.data?.message || 'Failed to book service. Try again.'
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f11] text-white font-sans selection:bg-indigo-500/30">
      {/* Dynamic Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[40vw] h-[40vw] bg-indigo-800/10 rounded-full blur-[120px] animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-purple-900/10 rounded-full blur-[100px] animate-pulse-slow delay-1000"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
      </div>

      {/* Navbar */}
      <nav className="relative z-10 bg-[#1a1a1a]/80 backdrop-blur-xl border-b border-white/5 p-4 flex justify-between items-center sticky top-0">
        <div className="flex items-center gap-2">
          {/* <Sparkles size={24} className="text-indigo-500" /> */}
          <h1 className="text-2xl font-bold tracking-tight">
            AutoCare<span className="text-indigo-500">Pro</span>
          </h1>
        </div>
        <button
          onClick={() => navigate('/login')}
          className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 font-medium rounded-lg transition-all border border-red-500/20"
        >
          <LogOut size={18} />
          Logout
        </button>
      </nav>

      <div className="relative z-10 container mx-auto px-4 py-10">
        <div className={`text-center mb-12 transition-all duration-700 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Choose Your Service Package
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Select a package that suits your vehicle's needs. We offer comprehensive care for all vehicle types.
          </p>
        </div>

        {/* Service Packages Grid - Reduced Width */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 max-w-5xl mx-auto">
          {SERVICE_PACKAGES.map((pkg, index) => (
            <div
              key={pkg.id}
              onClick={() => handlePackageSelect(pkg)}
              className={`relative bg-[#1a1a1a] rounded-2xl cursor-pointer transform transition-all duration-500 hover:-translate-y-2 border ${selectedPackage?.id === pkg.id
                  ? 'border-indigo-500/50 shadow-2xl shadow-indigo-500/20 scale-105'
                  : 'border-white/5 hover:border-white/10'
                } ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Gradient Top Bar */}
              <div className={`h-1 rounded-t-2xl bg-gradient-to-r ${pkg.gradient}`}></div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-white">{pkg.packageName}</h3>
                  <span className="bg-green-500/10 text-green-400 text-xs px-2 py-1 rounded-full font-bold uppercase border border-green-500/20">
                    {pkg.status}
                  </span>
                </div>

                <div className="mb-6">
                  <div className="text-4xl font-extrabold text-white mb-1">
                    {pkg.price}
                    <span className="text-base text-gray-500 font-normal">/visit</span>
                  </div>
                  <p className="text-sm text-gray-500">Valid for {pkg.validity}</p>
                </div>

                <ul className="space-y-2.5 mb-6">
                  {pkg.services.map((service, idx) => (
                    <li key={idx} className="flex items-start text-gray-300 text-sm">
                      <Check size={16} className="mr-2 text-green-500 shrink-0 mt-0.5" />
                      <span>{service}</span>
                    </li>
                  ))}
                </ul>

                <button className={`w-full font-medium py-2.5 rounded-xl transition-all ${selectedPackage?.id === pkg.id
                    ? `bg-gradient-to-r ${pkg.gradient} text-white shadow-lg`
                    : 'bg-[#2a2a2a] text-gray-300 hover:bg-[#333333]'
                  }`}>
                  {selectedPackage?.id === pkg.id ? 'Selected ✓' : 'Select Package'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Booking Form - Reduced Width */}
        {selectedPackage && (
          <div
            id="booking-form"
            className="max-w-3xl mx-auto bg-[#1a1a1a] rounded-2xl border border-white/5 overflow-hidden animate-fade-in-up shadow-2xl"
          >
            <div className="md:flex">
              {/* Summary Sidebar */}
              <div className={`md:w-2/5 bg-gradient-to-br ${selectedPackage.gradient} p-8 text-white flex flex-col justify-center`}>
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Sparkles size={24} />
                  Booking Summary
                </h3>
                <div className="mb-6">
                  <p className="text-white/70 text-xs uppercase tracking-wider mb-1">Package</p>
                  <p className="text-xl font-semibold">{selectedPackage.packageName}</p>
                </div>
                <div className="mb-6">
                  <p className="text-white/70 text-xs uppercase tracking-wider mb-1">Price</p>
                  <p className="text-3xl font-bold">{selectedPackage.price}</p>
                </div>
                <div>
                  <p className="text-white/70 text-xs uppercase tracking-wider mb-1">Includes</p>
                  <p className="text-sm">{selectedPackage.services.length} Premium Services</p>
                </div>
              </div>

              {/* Form Section */}
              <div className="md:w-3/5 p-8">
                <h3 className="text-2xl font-bold text-white mb-6">Complete Your Booking</h3>

                {bookingStatus.msg && (
                  <div className={`p-4 mb-6 rounded-xl border ${bookingStatus.type === 'success'
                      ? 'bg-green-500/10 border-green-500/20 text-green-400'
                      : bookingStatus.type === 'error'
                        ? 'bg-red-500/10 border-red-500/20 text-red-400'
                        : 'bg-blue-500/10 border-blue-500/20 text-blue-400'
                    }`}>
                    {bookingStatus.msg}
                  </div>
                )}

                <form onSubmit={handleBookService} className="space-y-5">
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wider">
                      Customer Name
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full bg-[#0f0f11] border border-[#2a2a2a] text-white rounded-xl py-3.5 px-4 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all placeholder-gray-600"
                      placeholder="Enter your full name"
                      value={bookingForm.customerName}
                      onChange={(e) => setBookingForm({ ...bookingForm, customerName: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wider">
                      Vehicle Type
                    </label>
                    <select
                      required
                      className="w-full bg-[#0f0f11] border border-[#2a2a2a] text-white rounded-xl py-3.5 px-4 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all"
                      value={bookingForm.vehicleType}
                      onChange={(e) => setBookingForm({ ...bookingForm, vehicleType: e.target.value })}
                    >
                      <option value="" className="bg-[#1a1a1a]">Select Vehicle Type</option>
                      <option value="Sedan" className="bg-[#1a1a1a]">Sedan</option>
                      <option value="SUV" className="bg-[#1a1a1a]">SUV</option>
                      <option value="Hatchback" className="bg-[#1a1a1a]">Hatchback</option>
                      <option value="Truck" className="bg-[#1a1a1a]">Truck</option>
                      <option value="Bike" className="bg-[#1a1a1a]">Bike</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={bookingStatus.type === 'loading'}
                    className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-medium py-3.5 rounded-xl transition-all shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2 mt-6 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {bookingStatus.type === 'loading' ? (
                      <Loader2 className="animate-spin" size={20} />
                    ) : (
                      <>
                        <span>Confirm Booking</span>
                        <ArrowRight size={18} />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Animations */}
      <style>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.8; }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.5s ease-out;
        }
        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }
        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </div>
  );
}

export default BookingService;