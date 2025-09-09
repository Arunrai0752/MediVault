import React from 'react'

const MedicalReports = () => {
  return (
    <main className='min-h-[92vh] bg-gradient-to-br from-teal-50 via-blue-50 to-white w-full flex justify-center items-start p-6'>
      <div className='w-full max-w-6xl mx-auto'>
        <div className='mb-6 flex items-end justify-between'>
          <h1 className='text-3xl md:text-4xl font-bold text-gray-800'>
            Medical <span className='text-teal-700'>Reports</span>
          </h1>
          <button className='bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg shadow-sm'>
            Upload Report
          </button>
        </div>

        <div className='bg-white/90 backdrop-blur-sm rounded-2xl border border-teal-100 shadow-md p-6'>
          <p className='text-gray-600'>
            Your medical reports will appear here. Use the upload button to add new reports.
          </p>
        </div>
      </div>
    </main>
  )
}

export default MedicalReports