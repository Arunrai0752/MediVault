import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../../../Configs/api';
import PatientProfile from './PatientProfile';



const SearchPatients = () => {
    const [patientId, setPatientId] = useState("");
    const [patientData, setPatientData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [isopenProfile, setIsOpenProfile] = useState(false)

    const handleChange = (e) => {
        setPatientId(e.target.value);
        if (patientData || error) {
            setPatientData(null);
            setError("");
        }
    }

    const handleOnSearch = async () => {
        if (!patientId.trim()) {
            setError("Please enter a patient ID");
            return;
        }
        
        setLoading(true);
        setError("");
        
        try {
            const response = await api.get(`/doctors/patient/${patientId}`);
            setPatientData(response.data.data);
        } catch (err) {
            console.error("Error fetching patient:", err);
            setError("Patient not found. Please check the ID and try again.");
            setPatientData(null);
        } finally {
            setLoading(false);
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleOnSearch();
        }
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    return (
        <motion.main 
            className='w-full min-h-screen bg-gray-50'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <motion.div 
                className='p-6 bg-gradient-to-r from-teal-500 to-emerald-600 shadow-md'
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
            >
                <h1 className='text-2xl font-bold text-white text-center'>Patient Search</h1>
            </motion.div>

            <motion.div 
                className='p-6 flex flex-col md:flex-row gap-4 justify-center items-center bg-white shadow-sm'
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.div className='w-full md:w-1/3' variants={itemVariants}>
                    <div className='relative'>
                        <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                            <svg className='w-5 h-5 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'></path>
                            </svg>
                        </div>
                        <input
                            type="text"
                            placeholder='Enter Patient ID'
                            onChange={handleChange}
                            onKeyPress={handleKeyPress}
                            value={patientId}
                            className='pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition'
                            disabled={loading}
                        />
                    </div>
                </motion.div>
                
                <motion.div className='w-full md:w-auto' variants={itemVariants}>
                    <button
                        onClick={handleOnSearch}
                        disabled={loading}
                        className={`w-full md:w-auto py-3 px-6 rounded-lg font-medium flex items-center justify-center gap-2 ${
                            loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-teal-600 hover:bg-teal-700'
                        } text-white transition-colors shadow-md`}
                    >
                        {loading ? (
                            <>
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Searching...
                            </>
                        ) : (
                            <>
                                <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'></path>
                                </svg>
                                Search Patient
                            </>
                        )}
                    </button>
                </motion.div>
            </motion.div>

            <AnimatePresence>
                {error && (
                    <motion.div 
                        className='mx-4 mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg'
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className='flex items-center'>
                            <svg className='w-6 h-6 mr-2' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'></path>
                            </svg>
                            {error}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className='p-4'>
                <AnimatePresence mode='wait'>
                    {loading ? (
                        <motion.div 
                            key="loading"
                            className='flex justify-center items-center py-12'
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className='animate-pulse flex flex-col items-center'>
                                <div className='rounded-full bg-teal-200 h-12 w-12 mb-3'></div>
                                <div className='h-4 bg-teal-200 rounded w-32'></div>
                            </div>
                        </motion.div>
                    ) : patientData ? (
                        <motion.div 
                            key="results"
                            className='w-full flex justify-center'
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className='w-full max-w-2xl bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100'>
                                <div className='bg-gradient-to-r from-teal-500 to-emerald-600 p-4 text-white'>
                                    <h2 className='text-xl font-bold'>Patient Information</h2>
                                    <p className='text-teal-100'>ID: {patientId}</p>
                                </div>
                                
                                <div className='p-6'>
                                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                                        <div>
                                            <h3 className='text-sm font-medium text-gray-500 uppercase'>Full Name</h3>
                                            <p className='text-lg font-semibold mt-1'>{patientData.fullName}</p>
                                        </div>
                                        
                                        <div>
                                            <h3 className='text-sm font-medium text-gray-500 uppercase'>Email Address</h3>
                                            <p className='text-lg mt-1 break-words'>{patientData.email}</p>
                                        </div>
                                        
                                        <div>
                                            <h3 className='text-sm font-medium text-gray-500 uppercase'>Verification Status</h3>
                                            <div className='flex items-center mt-1'>
                                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                                                    patientData.isVerified 
                                                        ? 'bg-green-100 text-green-800' 
                                                        : 'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                    {patientData.isVerified ? 'Verified' : 'Pending'}
                                                </span>
                                            </div>
                                        </div>
                                        
                                        <div className='md:col-span-2 flex justify-end mt-4'>
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => setIsOpenProfile(true)}
                                                className='flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white font-medium py-2 px-4 rounded-lg transition-colors'
                                            >
                                                <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'></path>
                                                </svg>
                                                View Full Profile
                                            </motion.button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div 
                            key="no-results"
                            className='flex flex-col items-center justify-center py-16 text-gray-500'
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <svg className='w-16 h-16 mb-4 text-gray-300' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'></path>
                            </svg>
                            <p className='text-lg'>Enter a patient ID to search</p>
                            <p className='text-sm mt-1'>Results will appear here</p>
                        </motion.div>
                    )}
                </AnimatePresence>


                <PatientProfile
                isOpen ={isopenProfile}
                onClose ={ () => {setIsOpenProfile(false)}}
                patientData ={patientData}
                />
            </div>
        </motion.main>
    )
}

export default SearchPatients;