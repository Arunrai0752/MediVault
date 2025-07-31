import React, { useState } from 'react';
import { IoMdCloseCircleOutline } from "react-icons/io";
import { Link } from 'react-router-dom';
import api from '../../Configs/api';
import toast from "react-hot-toast"


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
  try {
    const response = await api.post("/doctor/register", formData);
    console.log("Registration successful:", response.data);
    toast.success(response.message)


  } catch (error) {
    console.error("Registration failed:", {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });
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
    <main className='min-h-screen bg-blue-500/40 w-full flex justify-center items-center p-4'>
      <div className='h-auto min-h-[85vh] w-full md:w-[60vw] bg-white/70 rounded-lg mt-10 p-6 flex flex-col shadow-xl'>
        <div className='flex justify-between items-center border-b border-gray-200 pb-4 mb-6'>
          <h1 className='text-2xl md:text-3xl font-semibold text-gray-800'>
            Doctor <span className='text-blue-600'>Registration</span>
          </h1>
          <Link to="/" className='text-2xl text-gray-500 hover:text-red-600 transition-all duration-300'>
            <IoMdCloseCircleOutline />
          </Link>
        </div>

        <form onSubmit={handleSubmit} className='flex-1 w-full space-y-4'>
          {/* Personal Information */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <label htmlFor="fullName" className='block text-gray-700 mb-1'>Full Name*</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className='w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent'
              />
            </div>

            <div>
              <label htmlFor="email" className='block text-gray-700 mb-1'>Email*</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className='w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent'
              />
            </div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <label htmlFor="phone" className='block text-gray-700 mb-1'>Phone Number*</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                pattern="[0-9]{10}"
                required
                className='w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent'
              />
            </div>

            <div>
              <label htmlFor="specialization" className='block text-gray-700 mb-1'>Specialization*</label>
              <select
                id="specialization"
                name="specialization"
                value={formData.specialization}
                onChange={handleChange}
                required
                className='w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent'
              >
                {specializations.map(spec => (
                  <option key={spec} value={spec}>{spec}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Professional Information */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <label htmlFor="experience" className='block text-gray-700 mb-1'>Years of Experience*</label>
              <input
                type="number"
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                min="0"
                required
                className='w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent'
              />
            </div>

            <div>
              <label htmlFor="hospital" className='block text-gray-700 mb-1'>Hospital/Clinic</label>
              <input
                type="text"
                id="hospital"
                name="hospital"
                value={formData.hospital}
                onChange={handleChange}
                className='w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent'
              />
            </div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <label htmlFor="licenseNumber" className='block text-gray-700 mb-1'>Medical License Number*</label>
              <input
                type="text"
                id="licenseNumber"
                name="licenseNumber"
                value={formData.licenseNumber}
                onChange={handleChange}
                required
                className='w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent'
              />
            </div>

            <div>
              <label htmlFor="fee" className='block text-gray-700 mb-1'>Consultation Fee (₹)</label>
              <input
                type="number"
                id="fee"
                name="fee"
                value={formData.fee}
                onChange={handleChange}
                min="0"
                className='w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent'
              />
            </div>
          </div>

          <div>
            <label htmlFor="availability" className='block text-gray-700 mb-1'>Availability*</label>
            <textarea
              id="availability"
              name="availability"
              value={formData.availability}
              onChange={handleChange}
              required
              placeholder="Example: Mon-Fri 9AM-5PM, Sat 9AM-1PM"
              className='w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent'
              rows="3"
            />
          </div>

          {/* Account Security */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <label htmlFor="password" className='block text-gray-700 mb-1'>Password*</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength="6"
                className='w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent'
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className='block text-gray-700 mb-1'>Confirm Password*</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className='w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent'
              />
            </div>
          </div>

          <div className='mt-8 flex flex-col items-center space-y-4'>
            <button 
              type="submit"
              className='w-full md:w-1/2 bg-blue-600 hover:bg-blue-700 text-white text-xl font-medium py-3 px-6 rounded-lg transition duration-300 shadow-md hover:shadow-lg'
            >
              Complete Registration
            </button>  
            
            <p className='text-gray-600'>
              Already have an account?{' '}
              <Link to="/"   className='text-blue-600 hover:text-blue-800 font-medium'>
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