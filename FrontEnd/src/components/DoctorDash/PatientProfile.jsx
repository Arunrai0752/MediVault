import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TbReportSearch, TbEye, TbEyeOff } from "react-icons/tb";
import { CiSettings } from "react-icons/ci";
import { LuUserRound } from "react-icons/lu";
import api from '../../../Configs/api';
import { MdOutlineFileUpload } from "react-icons/md";
import { FileText, Calendar } from 'lucide-react';

const PatientProfile = ({ isOpen, onClose, patientData }) => {
    if (!isOpen || !patientData) return null;
    const [showReports, setShowReport] = useState(false)
    const [showMedical, setShowMedical] = useState(false)
    const [medicalData, setMedicalData] = useState("")
    const [preview, setPreview] = useState(null);
    const [priscription, setPriscription] = useState(null);
    const [reports, setReports] = useState([]);


    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

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



    const handleMedical = async () => {
        try {
            const Appoinments = await api.get(`/doctors/PatientAppoinments/${patientData._id}`)
            setMedicalData(Appoinments.data.data);
            setShowMedical(!showMedical)
        } catch (error) {
            console.log("Error : in Medical ");
        }
    }


    const handlePrescription = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setPreview(URL.createObjectURL(file));
        setPriscription(file);
    };

    const handleReport = (e) => {
        const files = Array.from(e.target.files);
        if (!files.length) return;
        files.map((file) => {
            console.log(file);

        })
        setReports(files);
    };


    const uploadPrescription = async () => {
        if (!priscription) return alert("No file selected");

        const formData = new FormData();
        formData.append("file", priscription); // "file" backend ke multer.single("file") se match hona chahiye
        formData.append("notes", "Doctor note yaha daalo"); // optional
        setPriscription(null)

        try {
            const res = await api.post(
                `/upload/prescription/${patientData._id}`,
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );

            alert("Upload Success ✅");
            console.log(res.data);
        } catch (error) {
            console.error("Upload failed:", error);
            alert("Upload Failed ❌");
        }
    };


    const uploadReports = async () => {
        if (!reports.length) return alert("No file selected");

        const formData = new FormData();
        reports.forEach((file) => {
            formData.append("files", file); // ek ek karke append karna hoga
        });

        setReports([]);

        try {
            const res = await api.post(
                `/upload/reports/${patientData._id}`,
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );

            alert("Upload Success ✅");
            console.log(res.data);
        } catch (error) {
            console.error("Upload failed:", error);
            alert("Upload Failed ❌");
        }
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
                        <div className="bg-gradient-to-r from-blue-600 to-teal-500 p-6 text-white relative rounded-xl shadow-lg">
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>

                            <div className="flex justify-between items-center px-4">
                                <div className="flex items-center space-x-4">
                                    <div className="bg-white/20 p-3 rounded-full">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-10 w-10"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <h1 className="text-2xl font-bold">{patientData.fullName}'s Profile</h1>
                                        <p className="text-blue-100 text-sm">
                                            Patient ID: <span className="font-semibold">{patientData.phone}</span>
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-4 relative ">
                                    <label className="flex gap-2 items-center cursor-pointer bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg font-medium transition">
                                        <input type="file" name='file' className="hidden" onChange={handlePrescription} />
                                        <MdOutlineFileUpload className="text-xl" />Prescription
                                    </label>

                                    {priscription && (
                                        <div className="absolute top-full left-0 mt-2 w-60 h-75 border rounded-lg overflow-hidden shadow-md  ">
                                            <img
                                                src={preview}
                                                alt="Prescription Preview"
                                                className="w-full h-[85%]  object-cover"
                                            />

                                            <div className='flex justify-center items-center  gap-2'>
                                                <button
                                                    onClick={() => setPriscription(null)}
                                                    className='bg-gray-600  h-10 w-20 hover:bg-gray-400'>Cancel</button>
                                                <button
                                                    onClick={uploadPrescription}
                                                    className='bg-blue-600  h-10 w-20 hover:bg-blue-400'>Upload</button>
                                            </div>
                                        </div>
                                    )}


                                    <label className="flex gap-2 items-center cursor-pointer bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg font-medium transition">
                                        <input type="file" name='files' className="hidden" multiple onChange={handleReport} />
                                        <MdOutlineFileUpload className="text-xl" />Reports
                                    </label>

                                    {reports.length > 0 && (
                                        <div className="absolute top-full text-black left-0 mt-2 w-70  max-h-80 border rounded-lg overflow-y-auto shadow-md bg-white">
                                            <div className="p-2">
                                                {reports.map((file, idx) => (
                                                    <div
                                                        key={idx}
                                                        className="flex items-center justify-between gap-2 p-2 w-full border-b"
                                                    >
                                                        {file.type.startsWith("image/") ? (
                                                            <img
                                                                src={URL.createObjectURL(file)}
                                                                alt="Report Preview"
                                                                className="w-12 h-12 object-cover  rounded"
                                                            />
                                                        ) : (
                                                            <FileText className="w-10 h-10 text-gray-500" />
                                                        )}

                                                        <div className="flex-1">
                                                            <p className="text-sm font-medium truncate">{file.name}</p>
                                                            <p className="text-xs text-gray-500">
                                                                {(file.size / 1024).toFixed(1)} KB
                                                            </p>
                                                        </div>

                                                        <button
                                                            onClick={() =>
                                                                setReports((prev) => prev.filter((_, i) => i !== idx))
                                                            }
                                                            className="text-red-500 hover:text-red-700 text-sm"
                                                        >
                                                            ✕
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="flex justify-center items-center gap-2 p-2 border-t">
                                                <button
                                                    onClick={() => setReports([])}
                                                    className="bg-gray-600 text-white px-4 py-1 rounded hover:bg-gray-400"
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    onClick={uploadReports}
                                                    className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-400"
                                                >
                                                    Upload
                                                </button>
                                            </div>
                                        </div>
                                    )}

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
                                    <LuUserRound className="h-5 w-5 ml-2 text-blue-500" />
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
                                <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-300 flex items-center">
                                    <TbReportSearch className="h-6 w-6 mr-3 text-blue-600" />
                                    Medical History
                                    <motion.button
                                        onClick={handleMedical}
                                        animate={{ scale: showMedical ? 0.95 : 1 }}
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ duration: 0.2 }}
                                        className='bg-blue-100 text-blue-700 hover:bg-blue-200 border border-blue-300 rounded-lg px-4 py-1 ml-6 flex items-center'
                                    >
                                        {showMedical ? (
                                            <>
                                                <TbEyeOff className="h-4 w-4 mr-1" />
                                                Hide
                                            </>
                                        ) : (
                                            <>
                                                <TbEye className="h-4 w-4 mr-1" />
                                                Show
                                            </>
                                        )}
                                    </motion.button>
                                </h2>
                            </div>

                            {showMedical && (
                                <div className="space-y-4">
                                    {medicalData.length > 0 ? (
                                        medicalData.map((item, idx) => (
                                            <motion.div
                                                key={idx}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.3, delay: idx * 0.1 }}
                                                className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200"
                                            >
                                                <div className="p-6">
                                                    <div className="flex justify-between items-start mb-4">
                                                        <div className="flex items-center">
                                                            <div className="bg-blue-100 p-2 rounded-lg mr-4">
                                                                <Calendar className="h-5 w-5 text-blue-600" />
                                                            </div>
                                                            <div>
                                                                <p className="text-sm text-gray-500">Date</p>
                                                                <p className="font-semibold text-gray-800">{formatDate(item.date)}</p>
                                                            </div>
                                                        </div>

                                                        <div className={`px-3 py-1 rounded-full text-sm font-medium ${item.status === 'Completed' ? 'bg-green-100 text-green-800' :
                                                            item.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                                                item.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                                                                    'bg-blue-100 text-blue-800'
                                                            }`}>
                                                            {item.status}
                                                        </div>
                                                    </div>

                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                        <div className="space-y-4">
                                                            <div>
                                                                <p className="text-sm text-gray-500 mb-1">Doctor</p>
                                                                <p className="font-medium text-gray-900">{item.doctorId?.fullName || "N/A"}</p>
                                                            </div>

                                                            <div>
                                                                <p className="text-sm text-gray-500 mb-1">Specialization</p>
                                                                <p className="font-medium text-gray-900">{item.doctorId?.specialization || "N/A"}</p>
                                                            </div>
                                                        </div>

                                                        <div className="space-y-4">
                                                            <div>
                                                                <p className="text-sm text-gray-500 mb-1">Email</p>
                                                                <p className="font-medium text-gray-900 break-words">{item.doctorId?.email || "N/A"}</p>
                                                            </div>

                                                            <div>
                                                                <p className="text-sm text-gray-500 mb-1">Reason for Visit</p>
                                                                <p className="font-medium text-gray-900">{item.reason}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))
                                    ) : (
                                        <div className="text-center py-10 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                                            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                                            <p className="text-gray-500 text-lg">No medical records found</p>
                                            <p className="text-gray-400 text-sm mt-1">Your medical history will appear here</p>
                                        </div>
                                    )}
                                </div>
                            )}

                            <div className='mb-8'>
                                <h2 className="text-xl font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-200 flex items-center">
                                    <TbReportSearch className="h-5 w-5 ml-2 text-blue-500" />
                                    Reports <motion.button
                                        onClick={handleReport}
                                        animate={{ x: [0, 2, 2, 0, 2, 2, 0, 2, 2, 0] }}
                                        transition={{ duration: 1 }}
                                        className='bg-gray-500/20 border-2 rounded-lg px-4 ml-6 '> {showReports ? "Hide" : "Show"}
                                    </motion.button>
                                </h2>
                            </div>

                            {showReports ? (
                                <div>
                                    bjdsbjs
                                </div>
                            ) : null}
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