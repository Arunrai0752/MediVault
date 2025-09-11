import React from 'react'
import { useState } from 'react';
import { IoMdCloseCircleOutline } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import api from '../../Configs/api';
import toast from 'react-hot-toast';
import {motion} from "framer-motion"

const Register = () => {
  const [patientsData, setPatientsdata] = useState({
    fullName: "",
    aadharNumber: "",
    email: "",
    phone: "",
    dob: "",
    password: "",
    confirmPassword: "",
  });

  const handelChange = (e) => {
    const { name, value } = e.target;
    setPatientsdata(prev => ({ ...prev, [name]: value }));
  }

  const handelOnSubmit = async (e) => {
    e.preventDefault();

    if (!patientsData.fullName || !patientsData.aadharNumber ||
      !patientsData.email || !patientsData.phone || !patientsData.dob
      || !patientsData.password || !patientsData.confirmPassword) {

      toast.error("All fields are required");
      return;
    }

    if (patientsData.password !== patientsData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const { confirmPassword, ...registrationData } = patientsData;
      const res = await api.post("/patients/pregister", registrationData);
      toast.success(res.data.message);
      setPatientsdata({
        fullName: "",
        aadharNumber: "",
        email: "",
        phone: "",
        dob: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      toast.error("Registration failed: " + (error.response?.data?.message || error.message));
    }
  }

  const navigate = useNavigate();
  
  return (
    <main className='min-h-[100vh] bg-gradient-to-br from-teal-50 via-blue-50 to-white w-full flex justify-center items-center p-4'>
      <motion.div
      animate={{ x:[-2,2,-2,0]}} 
      transition={{ duration: 0.2}}
      className='h-auto w-full max-w-4xl bg-white/90 rounded-2xl mt-10 p-6 flex flex-col shadow-2xl backdrop-blur-sm border border-teal-100'>
        <div className='flex justify-between items-center border-b border-gray-300 pb-4 mb-6'>
          <h1 className='text-2xl md:text-3xl font-bold text-gray-800'>
            Patient <span className='text-teal-700'>Registration</span>
          </h1>
          <button
            onClick={() => navigate("/")}
            className='text-2xl text-gray-600 hover:text-red-600 transition-all duration-300 transform hover:rotate-90'
            aria-label="Close registration form"
          >
            <IoMdCloseCircleOutline />
          </button>
        </div>

        <form onSubmit={handelOnSubmit} className='flex-1 w-full'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
            {/* Personal Information Section */}
            <div className='md:col-span-2'>
              <h2 className='text-xl font-semibold text-gray-800 mb-3 pb-2 border-b border-gray-300'>
                Personal Information
              </h2>
            </div>
            
            <div className='w-full'>
              <label htmlFor="fullName" className='block text-gray-700 mb-1 font-medium'>Full Name *</label>
              <input
                type="text"
                id="fullName"
                onChange={handelChange}
                value={patientsData.fullName}
                name='fullName'
                required
                placeholder='Enter your name (must match Aadhar Card)'
                className='w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent transition-all'
              />
            </div>

            <div className='w-full'>
              <label htmlFor="aadharNumber" className='block text-gray-700 mb-1 font-medium'>Aadhar Card Number *</label>
              <input
                type="text"
                id="aadharNumber"
                onChange={handelChange}
                value={patientsData.aadharNumber}
                name='aadharNumber'
                required
                placeholder='Enter 12-digit Aadhar number'
                maxLength="12"
                pattern="[0-9]{12}"
                className='w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent transition-all'
              />
            </div>

            <div className='w-full'>
              <label htmlFor="email" className='block text-gray-700 mb-1 font-medium'>Email Address *</label>
              <input
                type="email"
                id="email"
                onChange={handelChange}
                name='email'
                value={patientsData.email}
                required
                placeholder='Enter your email address'
                className='w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent transition-all'
              />
            </div>

            <div className='w-full'>
              <label htmlFor="phone" className='block text-gray-700 mb-1 font-medium'>Phone Number *</label>
              <input
                type="tel"
                id="phone"
                name='phone'
                onChange={handelChange}
                value={patientsData.phone}
                required
                placeholder='Enter 10-digit phone number'
                maxLength="10"
                pattern="[0-9]{10}"
                className='w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent transition-all'
              />
            </div>

            <div className='w-full'>
              <label htmlFor="dob" className='block text-gray-700 mb-1 font-medium'>Date of Birth *</label>
              <input
                type="date"
                id="dob"
                name='dob'
                onChange={handelChange}
                value={patientsData.dob}
                required
                className='w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent transition-all text-gray-700'
              />
            </div>
          </div>

          {/* Security Section */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-6'>
            <div className='md:col-span-2'>
              <h2 className='text-xl font-semibold text-gray-800 mb-3 pb-2 border-b border-gray-300'>
                Account Security
              </h2>
            </div>
            
            <div className='w-full'>
              <label htmlFor="password" className='block text-gray-700 mb-1 font-medium'>Password *</label>
              <input
                type="password"
                id="password"
                value={patientsData.password}
                name='password'
                onChange={handelChange}
                required
                minLength="6"
                placeholder='Create a strong password (min. 6 characters)'
                className='w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent transition-all'
              />
            </div>

            <div className='w-full'>
              <label htmlFor="confirmPassword" className='block text-gray-700 mb-1 font-medium'>Confirm Password *</label>
              <input
                type="password"
                id="confirmPassword"
                value={patientsData.confirmPassword}
                name='confirmPassword'
                onChange={handelChange}
                required
                placeholder='Re-enter your password'
                className='w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent transition-all'
              />
            </div>
          </div>

          <div className='mt-8 flex flex-col items-center space-y-4'>
            <button
              type="submit"
              className='w-full md:w-1/2 bg-teal-700 hover:bg-teal-800 text-white text-xl font-medium py-3 px-6 rounded-lg transition duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1'
            >
              Create Account
            </button>

            <p className='text-gray-600 text-center'>
              Already have an account?{' '}
              <Link to="/" className='text-teal-700 hover:text-teal-900 font-medium underline'>
                Login here
              </Link>
            </p>
          </div>
        </form>
      </motion.div>
    </main>
  )
}

export default Register