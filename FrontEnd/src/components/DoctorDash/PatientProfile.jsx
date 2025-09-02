import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TbReportSearch } from "react-icons/tb";
import { CiSettings } from "react-icons/ci";
import { LuUserRound } from "react-icons/lu";



const PatientProfile = ({ isOpen, onClose, patientData }) => {
    if (!isOpen || !patientData) return null;

    // Format date of birth to a readable format
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    // Calculate age from date of birth
    const calculateAge = (dob) => {
        const birthDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        return age;
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.main
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                >
                    <motion.div
                        className="bg-white rounded-xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ type: "spring", damping: 20 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="bg-gradient-to-r from-blue-500 to-teal-400 p-6 text-white relative">
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            <div className="flex items-center space-x-4">
                                <div className="bg-white/20 p-3 rounded-full">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold">{patientData.fullName}'s Profile</h1>
                                    <p className="text-blue-100">Patient ID: {patientData.phone.substring(18)}</p>
                                </div>
                            </div>
                        </div>

                        <div className="overflow-y-auto p-6 flex-grow">
                            <div className="mb-8">
                                <h2 className="text-xl font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-200 flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    Personal Information
                                </h2>

                                <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-6 gap-4">
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <p className="text-sm text-gray-500">Full Name</p>
                                        <p className="font-medium">{patientData.fullName}</p>
                                    </div>

                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <p className="text-sm text-gray-500">Gender</p>
                                        <p className="font-medium">{patientData.gender}</p>
                                    </div>

                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <p className="text-sm text-gray-500">Date of Birth</p>
                                        <p className="font-medium">{formatDate(patientData.dob)}</p>
                                    </div>

                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <p className="text-sm text-gray-500">Age</p>
                                        <p className="font-medium">{calculateAge(patientData.dob)} years</p>
                                    </div>

                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <p className="text-sm text-gray-500">Aadhar Number</p>
                                        <p className="font-medium">{patientData.aadharNumber}</p>
                                    </div>

                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <p className="text-sm text-gray-500">Blood Group</p>
                                        <p className="font-medium">{patientData.bloodGroup}</p>
                                    </div>
                                </div>
                            </div>



                            <div className="mb-8">
                                <h2 className="text-xl font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-200 flex items-center">
                                    <LuUserRound className="  h-5 w-5 ml-2 text-blue-500" />
                                    Account Information
                                </h2>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <p className="text-sm text-gray-500">Verification Status</p>
                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${patientData.isVerified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                            {patientData.isVerified ? 'Verified' : 'Pending Verification'}
                                        </span>
                                    </div>

                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <p className="text-sm text-gray-500">Role</p>
                                        <p className="font-medium">{patientData.role}</p>
                                    </div>

                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <p className="text-sm text-gray-500">Member Since</p>
                                        <p className="font-medium">{formatDate(patientData.createdAt)}</p>
                                    </div>

                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <p className="text-sm text-gray-500">Last Updated</p>
                                        <p className="font-medium">{formatDate(patientData.updatedAt)}</p>
                                    </div>
                                </div>
                            </div>




                            <div className='mb-8'>
                                <h2 className="text-xl font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-200 flex items-center">
                                    <TbReportSearch className="  h-5 w-5 ml-2 text-blue-500" />
                                    Medical Information
                                </h2>

                                <motion.button
                                initial={{ x:-100 }}
                                animate={{ x:0 }}
                                transition={{ duration:1}}
                                 className='bg-gray-500/20 border-2 rounded-lg px-8 py-2'> Show </motion.button>

                            </div>



                        </div>



                        <div className="bg-gray-100 px-6 py-4 flex justify-end">
                            <button
                                onClick={onClose}
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors font-medium"
                            >
                                Close
                            </button>
                        </div>
                    </motion.div>
                </motion.main>
            )}
        </AnimatePresence>
    );
};

export default PatientProfile;