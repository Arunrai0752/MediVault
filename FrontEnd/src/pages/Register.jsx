import React from 'react'
import { IoMdCloseCircleOutline } from "react-icons/io";
import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <main className='min-h-screen bg-blue-500/40 w-full flex justify-center items-center p-4'>
      <div className='h-auto min-h-[85vh] w-full md:w-[50vw] bg-white/70 rounded-lg mt-10 p-6 flex flex-col shadow-xl'>
        <div className='flex justify-between items-center border-b border-gray-200 pb-4 mb-6'>
          <h1 className='text-2xl md:text-3xl font-semibold text-gray-800'>
            Patient <span className='text-blue-600'>Registration</span>
          </h1>
          <button 
            className='text-2xl text-gray-500 hover:text-red-600 transition-all duration-300 transform hover:rotate-90'
            aria-label="Close registration form"
          >
            <IoMdCloseCircleOutline />
          </button>
        </div>

        <div className='flex-1 w-full space-y-4'>
          <div className='w-full'>
            <label htmlFor="fullName" className='block text-gray-700 mb-1'>Full Name</label>
            <input
              type="text"
              id="fullName"
              placeholder='Enter your name (must match Aadhar Card)'
              className='w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent'
            />
          </div>

          <div className='w-full'>
            <label htmlFor="aadharNumber" className='block text-gray-700 mb-1'>Aadhar Card Number</label>
            <input
              type="text"
              id="aadharNumber"
              placeholder='Enter 12-digit Aadhar number'
              maxLength="12"
              className='w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent'
            />
          </div>

          <div className='w-full'>
            <label htmlFor="dob" className='block text-gray-700 mb-1'>Date of Birth</label>
            <input
              type="date"
              id="dob"
              className='w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent'
            />
          </div>

          <div className='w-full'>
            <label htmlFor="password" className='block text-gray-700 mb-1'>Password</label>
            <input
              type="password"
              id="password"
              placeholder='Create a password'
              className='w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent'
            />
          </div>

          <div className='w-full'>
            <label htmlFor="confirmPassword" className='block text-gray-700 mb-1'>Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              placeholder='Re-enter your password'
              className='w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent'
            />
          </div>
        </div>

        <div className='mt-8 flex flex-col items-center space-y-4'>
          <button 
            className='w-full md:w-1/2 bg-blue-600 hover:bg-blue-700 text-white text-xl font-medium py-3 px-6 rounded-lg transition duration-300 shadow-md hover:shadow-lg'
          >
            Register
          </button>  
          
          <p className='text-gray-600'>
            Already have an account?{' '}
            <Link to="/login" className='text-blue-600 hover:text-blue-800 font-medium'>
              Login
            </Link>
          </p>  
        </div>
      </div>
    </main>
  )
}

export default Register