import React, { useState } from 'react';
import { IoMdCloseCircleOutline } from "react-icons/io";
import { Link } from 'react-router-dom';
import api from '../../Configs/api';
import toast from "react-hot-toast";

const DoctorRegister = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    specialization: 'General Physician',
    experience: 0,
    hospital: '',
    licenseNumber: '',
    availability: '',
    photo: '',
    fee: 500,
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    
    try {
      const response = await api.post("/doctors/register", formData);
      console.log("Registration successful:", response.data);
      toast.success("Doctor Registered Successfully");
    } catch (error) {
      console.error("Registration failed:", {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };

  const specializations = [
    "Cardiologist",
    "Neurologist",
    "Dermatologist",
    "ENT",
    "Orthopedic",
    "General Physician",
    "Pediatrician",
    "Psychiatrist",
    "Gynecologist",
    "Other"
  ];

  return (
    <main className="h-screen bg-gradient-to-br from-teal-50 via-blue-50 to-white w-full flex justify-center items-center p-2 overflow-hidden">
      <div className="h-[95vh] w-full max-w-5xl bg-white/90 rounded-2xl p-3 flex flex-col shadow-2xl backdrop-blur-sm border border-teal-100 overflow-y-auto">
        <div className="flex justify-between items-center border-b border-gray-200 pb-2 mb-3">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-800">
              Doctor <span className="text-teal-700">Registration</span>
            </h1>
            <p className="text-gray-600 text-sm mt-1">
              Join our network of healthcare professionals
            </p>
          </div>
          <Link 
            to="/" 
            className="text-xl text-gray-500 hover:text-red-600 transition-all duration-300 transform hover:scale-110"
          >
            <IoMdCloseCircleOutline />
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 w-full space-y-3">
          <div className="bg-teal-50 p-3 rounded-xl">
            <h2 className="text-lg font-semibold text-teal-800 mb-3 flex items-center">
              <span className="bg-teal-700 text-white p-1 rounded mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </span>
              Personal Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label htmlFor="fullName" className="block text-gray-700 mb-1 font-medium">Full Name *</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg p-2 outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent transition-all"
                  placeholder="Dr. John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-gray-700 mb-1 font-medium">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg p-2 outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent transition-all"
                  placeholder="doctor@example.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
              <div>
                <label htmlFor="phone" className="block text-gray-700 mb-1 font-medium">Phone Number *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  pattern="[0-9]{10}"
                  required
                  className="w-full border border-gray-300 rounded-lg p-2 outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent transition-all"
                  placeholder="10-digit number"
                />
              </div>

              <div>
                <label htmlFor="specialization" className="block text-gray-700 mb-1 font-medium">Specialization *</label>
                <select
                  id="specialization"
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg p-2 outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent transition-all"
                >
                  {specializations.map(spec => (
                    <option key={spec} value={spec}>{spec}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="bg-teal-50 p-3 rounded-xl">
            <h2 className="text-lg font-semibold text-teal-800 mb-3 flex items-center">
              <span className="bg-teal-700 text-white p-1 rounded mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                </svg>
              </span>
              Professional Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label htmlFor="experience" className="block text-gray-700 mb-1 font-medium">Years of Experience *</label>
                <input
                  type="number"
                  id="experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  min="0"
                  required
                  className="w-full border border-gray-300 rounded-lg p-2 outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label htmlFor="hospital" className="block text-gray-700 mb-1 font-medium">Hospital/Clinic</label>
                <input
                  type="text"
                  id="hospital"
                  name="hospital"
                  value={formData.hospital}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-2 outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent transition-all"
                  placeholder="Medical Center Name"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
              <div>
                <label htmlFor="licenseNumber" className="block text-gray-700 mb-1 font-medium">Medical License Number *</label>
                <input
                  type="text"
                  id="licenseNumber"
                  name="licenseNumber"
                  value={formData.licenseNumber}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg p-2 outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent transition-all"
                  placeholder="License ID"
                />
              </div>

              <div>
                <label htmlFor="fee" className="block text-gray-700 mb-1 font-medium">Consultation Fee (₹) *</label>
                <div className="relative">
                  <span className="absolute left-2 top-2 text-gray-500">₹</span>
                  <input
                    type="number"
                    id="fee"
                    name="fee"
                    value={formData.fee}
                    onChange={handleChange}
                    min="0"
                    required
                    className="w-full border border-gray-300 rounded-lg pl-6 p-2 outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="mt-3">
              <label htmlFor="availability" className="block text-gray-700 mb-1 font-medium">Availability *</label>
              <textarea
                id="availability"
                name="availability"
                value={formData.availability}
                onChange={handleChange}
                required
                placeholder="Example: Mon-Fri 9AM-5PM, Sat 9AM-1PM"
                className="w-full border border-gray-300 rounded-lg p-2 outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent transition-all"
                rows="2"
              />
            </div>
          </div>

          <div className="bg-teal-50 p-3 rounded-xl">
            <h2 className="text-lg font-semibold text-teal-800 mb-3 flex items-center">
              <span className="bg-teal-700 text-white p-1 rounded mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              </span>
              Account Security
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label htmlFor="password" className="block text-gray-700 mb-1 font-medium">Password *</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength="6"
                  className="w-full border border-gray-300 rounded-lg p-2 outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent transition-all"
                  placeholder="Minimum 6 characters"
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-gray-700 mb-1 font-medium">Confirm Password *</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg p-2 outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent transition-all"
                  placeholder="Re-enter your password"
                />
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-col items-center space-y-2">
            <button
              type="submit"
              className="w-full md:w-1/2 bg-teal-700 hover:bg-teal-800 text-white text-lg font-medium py-2 px-4 rounded-lg transition duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
            >
              Complete Registration
            </button>

            <p className="text-gray-600 text-sm">
              Already have an account?{' '}
              <Link to="/" className="text-teal-700 hover:text-teal-900 font-medium underline">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </main>
  );
};

export default DoctorRegister;