import React from 'react';
import { motion } from 'framer-motion';

const LoadingPage = ({isOpen ,  message = "Uploading your files..." }) => {

    if(!isOpen) return null
  return (
    <div className="fixed inset-0 bg-teal-900/30 backdrop-blur-sm z-50 flex items-center justify-center">
      <motion.div 
        className="bg-white/95 rounded-xl shadow-2xl p-8 max-w-md w-full mx-4 flex flex-col items-center border border-teal-100"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
      >        <motion.div 
          className="w-16 h-16 border-4 border-teal-200 border-t-teal-600 rounded-full mb-6"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Processing Upload</h3>
        <p className="text-gray-600 text-center mb-6">{message}</p>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
          <motion.div 
            className="bg-teal-600 h-2.5 rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: "80%" }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
          />
        </div>
        
        {/* Additional info */}
        <p className="text-sm text-gray-500 text-center">
          Please don't close this window while we process your files.
        </p>
      </motion.div>
    </div>
  );
};

export default LoadingPage;