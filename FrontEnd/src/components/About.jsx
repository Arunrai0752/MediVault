import React from 'react'

const About = () => {
  return (
    <main className='w-full min-h-screen bg-gray-50 pt-16 pb-20 px-4'>
     
      <div className='flex justify-center mb-12'>
        <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold text-gray-600 pb-4 border-b-4 border-blue-500'>
          About <span className='text-gray-800'>MediVault</span>
        </h1>
      </div>

     
      <div className='w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4'>
       
        <div className='bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300'>
          <img 
            src="ConnectDoctor.png" 
            alt="Doctor connection illustration" 
            className='w-full h-60 object-cover'
          />
          <div className='p-6'>
            <h2 className='text-xl font-semibold text-gray-800 mb-2'>24/7 Doctor Connection</h2>
            <p className='text-gray-600'>
              Easily connect with qualified healthcare professionals anytime, anywhere through our seamless platform.
            </p>
          </div>
        </div>

        
        <div className='bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300'>
          <img 
            src="OnlineDoc.jpg" 
            alt="Digital medical records illustration" 
            className='w-full h-60 object-cover'
          />
          <div className='p-6'>
            <h2 className='text-xl font-semibold text-gray-800 mb-2'>Secure Digital Records</h2>
            <p className='text-gray-600'>
              All your medical documents, reports, and prescriptions securely stored and easily accessible online.
            </p>
          </div>
        </div>

    
        <div className='bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300'>
          <img 
            src="Nottification.jpg" 
            alt="Appointment reminder illustration" 
            className='w-full h-60 object-cover'
          />
          <div className='p-6'>
            <h2 className='text-xl font-semibold text-gray-800 mb-2'>Smart Reminders</h2>
            <p className='text-gray-600'>
              Never miss an appointment with our intelligent notification system that keeps you informed and prepared.
            </p>
          </div>
        </div>
      </div>

      <div className='mt-20 max-w-4xl mx-auto text-center px-4'>
        <h2 className='text-3xl font-bold text-gray-700 mb-6'>Our Mission</h2>
        <p className='text-lg text-gray-600 leading-relaxed'>
          At MedicalDoc, we're revolutionizing healthcare by bridging the gap between patients and doctors through technology. 
          Our platform ensures seamless communication, secure medical record management, and timely healthcare services 
          to empower both patients and medical professionals.
        </p>
      </div>
    </main>
  )
}

export default About