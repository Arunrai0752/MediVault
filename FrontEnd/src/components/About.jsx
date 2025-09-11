import React from 'react'

const About = () => {
  return (
    <main className='w-full min-h-screen bg-teal-50 py-40 px-4'>

      <div className='flex justify-center mb-12'>
        <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold text-gray-700 pb-4 border-b-4 border-teal-500'>
          About <span className='text-teal-600'>MediVault</span>
        </h1>
      </div>

      <div className='w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4'>

        <div className='bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-teal-100 hover:-translate-y-1'>
          <div className='h-60 bg-gradient-to-br from-teal-50 to-blue-50 flex items-center justify-center'>
            <svg className="w-24 h-24 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
            </svg>
          </div>
          <div className='p-6'>
            <h2 className='text-xl font-semibold text-gray-800 mb-2'>24/7 Doctor Connection</h2>
            <p className='text-gray-600'>
              Easily connect with qualified healthcare professionals anytime, anywhere through our seamless platform.
            </p>
          </div>
        </div>

        <div className='bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-teal-100 hover:-translate-y-1'>
          <div className='h-60 bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center'>
            <svg className="w-24 h-24 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
            </svg>
          </div>
          <div className='p-6'>
            <h2 className='text-xl font-semibold text-gray-800 mb-2'>Secure Digital Records</h2>
            <p className='text-gray-600'>
              All your medical documents, reports, and prescriptions securely stored and easily accessible online.
            </p>
          </div>
        </div>

        <div className='bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-teal-100 hover:-translate-y-1'>
          <div className='h-60 bg-gradient-to-br from-cyan-50 to-blue-50 flex items-center justify-center'>
            <svg className="w-24 h-24 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <div className='p-6'>
            <h2 className='text-xl font-semibold text-gray-800 mb-2'>Smart Reminders</h2>
            <p className='text-gray-600'>
              Never miss an appointment with our intelligent notification system that keeps you informed and prepared.
            </p>
          </div>
        </div>
      </div>

      <div className='mt-20 max-w-4xl min-h-[60vh]  flex  items-center mx-auto text-center px-4'>
        <div>

          <h2 className='text-3xl font-bold text-gray-800 mb-6'>Our Mission</h2>
          <p className='text-lg text-gray-600 leading-relaxed'>
            At MediVault, we're revolutionizing healthcare by bridging the gap between patients and doctors through technology.
            Our platform ensures seamless communication, secure medical record management, and timely healthcare services
            to empower both patients and medical professionals.
          </p>
        </div>
      </div>
    </main>
  )
}

export default About