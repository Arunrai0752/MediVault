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
    <main className='min-h-[91.4vh] bg-gradient-to-br from-teal-50 via-blue-50 to-indigo-100 w-full flex justify-center items-center p-4'>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className='w-full max-w-4xl bg-white/95 rounded-3xl p-8 flex flex-col shadow-2xl backdrop-blur-md border border-teal-200 overflow-y-auto max-h-[90vh]'
      >
        <div className='flex justify-between items-center border-b border-gradient-to-r from-teal-300 to-indigo-300 pb-6 mb-8'>
          <motion.h1
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className='text-3xl md:text-4xl font-bold bg-gradient-to-r from-teal-700 to-indigo-700 bg-clip-text text-transparent'
          >
            Patient <span className='text-teal-600'>Registration</span>
          </motion.h1>
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate("/")}
            className='text-3xl text-gray-500 hover:text-red-500 transition-all duration-300'
            aria-label="Close registration form"
          >
            <IoMdCloseCircleOutline />
          </motion.button>
        </div>

        <form onSubmit={handelOnSubmit} className='flex-1 w-full space-y-6'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className='bg-gradient-to-r from-teal-50 to-indigo-50 p-6 rounded-2xl shadow-lg border border-teal-100'
          >
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className='text-2xl font-bold text-teal-800 mb-6 pb-3 border-b border-teal-200 flex items-center'
            >
              <motion.span
                whileHover={{ scale: 1.1 }}
                className="bg-gradient-to-r from-teal-600 to-indigo-600 text-white p-2 rounded-lg mr-3 shadow-md"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </motion.span>
              Personal Information
            </motion.h2>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.3 }}
                className='w-full'
              >
                <label htmlFor="fullName" className='block text-gray-700 mb-3 font-semibold'>Full Name *</label>
                <motion.input
                  whileFocus={{ scale: 1.02, boxShadow: "0 0 0 3px rgba(20, 184, 166, 0.1)" }}
                  type="text"
                  id="fullName"
                  onChange={handelChange}
                  value={patientsData.fullName}
                  name='fullName'
                  required
                  placeholder='Enter your name (must match Aadhar Card)'
                  className='w-full border-2 border-gray-200 rounded-xl p-4 outline-none focus:ring-0 focus:border-teal-500 transition-all duration-300 bg-white/80 backdrop-blur-sm'
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.3 }}
                className='w-full'
              >
                <label htmlFor="aadharNumber" className='block text-gray-700 mb-3 font-semibold'>Aadhar Card Number *</label>
                <motion.input
                  whileFocus={{ scale: 1.02, boxShadow: "0 0 0 3px rgba(20, 184, 166, 0.1)" }}
                  type="text"
                  id="aadharNumber"
                  onChange={handelChange}
                  value={patientsData.aadharNumber}
                  name='aadharNumber'
                  required
                  placeholder='Enter 12-digit Aadhar number'
                  maxLength="12"
                  pattern="[0-9]{12}"
                  className='w-full border-2 border-gray-200 rounded-xl p-4 outline-none focus:ring-0 focus:border-teal-500 transition-all duration-300 bg-white/80 backdrop-blur-sm'
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.3 }}
                className='w-full'
              >
                <label htmlFor="email" className='block text-gray-700 mb-3 font-semibold'>Email Address *</label>
                <motion.input
                  whileFocus={{ scale: 1.02, boxShadow: "0 0 0 3px rgba(20, 184, 166, 0.1)" }}
                  type="email"
                  id="email"
                  onChange={handelChange}
                  name='email'
                  value={patientsData.email}
                  required
                  placeholder='Enter your email address'
                  className='w-full border-2 border-gray-200 rounded-xl p-4 outline-none focus:ring-0 focus:border-teal-500 transition-all duration-300 bg-white/80 backdrop-blur-sm'
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.3 }}
                className='w-full'
              >
                <label htmlFor="phone" className='block text-gray-700 mb-3 font-semibold'>Phone Number *</label>
                <motion.input
                  whileFocus={{ scale: 1.02, boxShadow: "0 0 0 3px rgba(20, 184, 166, 0.1)" }}
                  type="tel"
                  id="phone"
                  name='phone'
                  onChange={handelChange}
                  value={patientsData.phone}
                  required
                  placeholder='Enter 10-digit phone number'
                  maxLength="10"
                  pattern="[0-9]{10}"
                  className='w-full border-2 border-gray-200 rounded-xl p-4 outline-none focus:ring-0 focus:border-teal-500 transition-all duration-300 bg-white/80 backdrop-blur-sm'
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 0.3 }}
                className='w-full md:col-span-2'
              >
                <label htmlFor="dob" className='block text-gray-700 mb-3 font-semibold'>Date of Birth *</label>
                <motion.input
                  whileFocus={{ scale: 1.02, boxShadow: "0 0 0 3px rgba(20, 184, 166, 0.1)" }}
                  type="date"
                  id="dob"
                  name='dob'
                  onChange={handelChange}
                  value={patientsData.dob}
                  required
                  className='w-full border-2 border-gray-200 rounded-xl p-4 outline-none focus:ring-0 focus:border-teal-500 transition-all duration-300 bg-white/80 backdrop-blur-sm text-gray-700'
                />
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.5 }}
            className='bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-2xl shadow-lg border border-indigo-100'
          >
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2, duration: 0.4 }}
              className='text-2xl font-bold text-indigo-800 mb-6 pb-3 border-b border-indigo-200 flex items-center'
            >
              <motion.span
                whileHover={{ scale: 1.1 }}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-2 rounded-lg mr-3 shadow-md"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              </motion.span>
              Account Security
            </motion.h2>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3, duration: 0.3 }}
                className='w-full'
              >
                <label htmlFor="password" className='block text-gray-700 mb-3 font-semibold'>Password *</label>
                <motion.input
                  whileFocus={{ scale: 1.02, boxShadow: "0 0 0 3px rgba(99, 102, 241, 0.1)" }}
                  type="password"
                  id="password"
                  value={patientsData.password}
                  name='password'
                  onChange={handelChange}
                  required
                  minLength="6"
                  placeholder='Create a strong password (min. 6 characters)'
                  className='w-full border-2 border-gray-200 rounded-xl p-4 outline-none focus:ring-0 focus:border-indigo-500 transition-all duration-300 bg-white/80 backdrop-blur-sm'
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4, duration: 0.3 }}
                className='w-full'
              >
                <label htmlFor="confirmPassword" className='block text-gray-700 mb-3 font-semibold'>Confirm Password *</label>
                <motion.input
                  whileFocus={{ scale: 1.02, boxShadow: "0 0 0 3px rgba(99, 102, 241, 0.1)" }}
                  type="password"
                  id="confirmPassword"
                  value={patientsData.confirmPassword}
                  name='confirmPassword'
                  onChange={handelChange}
                  required
                  placeholder='Re-enter your password'
                  className='w-full border-2 border-gray-200 rounded-xl p-4 outline-none focus:ring-0 focus:border-indigo-500 transition-all duration-300 bg-white/80 backdrop-blur-sm'
                />
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.5 }}
            className='mt-10 flex flex-col items-center space-y-6'
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(0,0,0,0.2)" }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className='w-full md:w-1/2 bg-gradient-to-r from-teal-600 to-indigo-600 hover:from-teal-700 hover:to-indigo-700 text-white text-xl font-bold py-4 px-8 rounded-2xl transition-all duration-300 shadow-lg'
            >
              Create Account
            </motion.button>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6, duration: 0.4 }}
              className='text-gray-600 text-center text-lg'
            >
              Already have an account?{' '}
              <motion.span
                whileHover={{ scale: 1.05 }}
                className='text-indigo-600 hover:text-indigo-800 font-semibold underline cursor-pointer'
              >
                <Link to="/">Login here</Link>
              </motion.span>
            </motion.p>
          </motion.div>
        </form>
      </motion.div>
    </main>
  )
}

export default Register
