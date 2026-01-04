import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SERVICE_PACKAGES = [
  {
    id: 1,
    packageName: "Basic Service",
    price: "$99",
    validity: "3 Months",
    status: "Available",
    services: ["Oil Change", "Car Wash", "General Inspection", "Tire Pressure Check"],
    color: "bg-blue-500"
  },
  {
    id: 2,
    packageName: "Premium Service",
    price: "$199",
    validity: "6 Months",
    status: "Available",
    services: ["All Basic Services", "AC Filter Replacement", "Brake Check", "Wheel Alignment"],
    color: "bg-purple-600"
  },
  {
    id: 3,
    packageName: "Gold Service",
    price: "$299",
    validity: "1 Year",
    status: "Available",
    services: ["All Premium Services", "Engine Tuning", "Interior Detailing", "Battery Replacement"],
    color: "bg-yellow-500"
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
        vehicleType: bookingForm.vehicleType
      };

      const response = await axios.post('http://localhost:8000/api/v1/bookings/book', payload);

      if (response.status === 201 || response.status === 200) {
        setBookingStatus({ type: 'success', msg: 'Booking Confirmed Successfully!' });
        // Reset form after 2 seconds
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
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Navbar */}
      <nav className="bg-white shadow-sm p-4 flex justify-between items-center sticky top-0 z-50">
        <h1 className="text-2xl font-bold text-gray-800 tracking-tight">AutoCare<span className="text-blue-600">Pro</span></h1>
        <button 
          onClick={() => navigate('/login')} 
          className="text-red-500 hover:text-red-700 font-medium transition-colors"
        >
          Logout
        </button>
      </nav>

      <div className="container mx-auto px-4 py-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Choose Your Service Package</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Select a package that suits your vehicle's needs. We offer comprehensive care for all vehicle types.</p>
        </div>

        {/* 1. Display Packages Array */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {SERVICE_PACKAGES.map((pkg) => (
            <div 
              key={pkg.id}
              onClick={() => handlePackageSelect(pkg)}
              className={`relative bg-white rounded-2xl shadow-lg cursor-pointer transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl border-2 ${selectedPackage?.id === pkg.id ? 'border-blue-500 scale-105' : 'border-transparent'}`}
            >
              <div className={`${pkg.color} h-2 rounded-t-2xl`}></div>
              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold text-gray-800">{pkg.packageName}</h3>
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-bold uppercase">{pkg.status}</span>
                </div>
                <div className="text-4xl font-extrabold text-gray-900 mb-2">{pkg.price}<span className="text-lg text-gray-500 font-normal">/visit</span></div>
                <p className="text-sm text-gray-500 mb-6">Valid for {pkg.validity}</p>
                
                <ul className="space-y-3 mb-8">
                  {pkg.services.map((service, index) => (
                    <li key={index} className="flex items-center text-gray-600 text-sm">
                      <svg className="w-4 h-4 mr-2 text-green-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                      {service}
                    </li>
                  ))}
                </ul>

                <button className="w-full bg-gray-100 text-gray-800 font-bold py-3 rounded-lg hover:bg-gray-200 transition-colors">
                    {selectedPackage?.id === pkg.id ? 'Selected' : 'View Details'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* 2. Show Package Details on Selection */}
        {selectedPackage && (
          <div id="booking-form" className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden animate-fade-in-up">
            <div className="md:flex">
              <div className="md:w-1/3 bg-gray-900 p-8 text-white flex flex-col justify-center">
                <h3 className="text-2xl font-bold mb-4">Booking Summary</h3>
                <div className="mb-6">
                    <p className="text-gray-400 text-sm uppercase">Package</p>
                    <p className="text-xl font-semibold">{selectedPackage.packageName}</p>
                </div>
                <div className="mb-6">
                    <p className="text-gray-400 text-sm uppercase">Price</p>
                    <p className="text-3xl font-bold text-blue-400">{selectedPackage.price}</p>
                </div>
                <div className="mb-0">
                    <p className="text-gray-400 text-sm uppercase">Includes</p>
                    <p className="text-sm text-gray-300">{selectedPackage.services.length} Premium Services</p>
                </div>
              </div>

              <div className="md:w-2/3 p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Complete Your Booking</h3>
                
                {bookingStatus.msg && (
                    <div className={`p-4 mb-6 rounded-lg ${bookingStatus.type === 'success' ? 'bg-green-100 text-green-700' : bookingStatus.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>
                        {bookingStatus.msg}
                    </div>
                )}

                <form onSubmit={handleBookService}>
                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Customer Name</label>
                      <input 
                        type="text" 
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        placeholder="Enter your full name"
                        value={bookingForm.customerName}
                        onChange={(e) => setBookingForm({...bookingForm, customerName: e.target.value})}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Type</label>
                      <select 
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        value={bookingForm.vehicleType}
                        onChange={(e) => setBookingForm({...bookingForm, vehicleType: e.target.value})}
                      >
                        <option value="">Select Vehicle Type</option>
                        <option value="Sedan">Sedan</option>
                        <option value="SUV">SUV</option>
                        <option value="Hatchback">Hatchback</option>
                        <option value="Truck">Truck</option>
                        <option value="Bike">Bike</option>
                      </select>
                    </div>

                    <button 
                      type="submit" 
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-lg shadow-md transition-all transform active:scale-95 mt-4"
                    >
                      Confirm Booking
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BookingService;