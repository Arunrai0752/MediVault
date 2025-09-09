import React from 'react'

function PaymentReceipt() {
  return (
    <main className='min-h-[92vh] bg-gradient-to-br from-teal-50 via-blue-50 to-white w-full flex justify-center items-center p-6'>
      <div className='w-full max-w-2xl bg-white/90 backdrop-blur-sm rounded-2xl border border-teal-100 shadow-md p-6'>
        <h1 className='text-2xl font-bold text-gray-800 mb-4'>
          Payment <span className='text-teal-700'>Receipt</span>
        </h1>
        <div className='border-t border-gray-200 pt-4 text-gray-700'>
          <p>This is a placeholder for your payment receipt details.</p>
        </div>
      </div>
    </main>
  )
}

export default PaymentReceipt