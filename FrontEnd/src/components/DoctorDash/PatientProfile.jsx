import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TbReportSearch, TbEye, TbEyeOff, TbDownload } from "react-icons/tb";
import { LuUserRound } from "react-icons/lu";
import api from '../../../Configs/api';
import { MdOutlineFileUpload } from "react-icons/md";
import { FileText, Calendar, User, ExternalLink } from 'lucide-react';
import LoadingPage from './loadingpage';

const PatientProfile = ({ isOpen, onClose, patientData }) => {
    if (!isOpen || !patientData) return null;
    const [showReports, setShowReports] = useState(false);
    const [showMedical, setShowMedical] = useState(false);
    const [medicalData, setMedicalData] = useState([]);
    const [reportData, setReportData] = useState([]);
    const [preview, setPreview] = useState(null);
    const [prescription, setPrescription] = useState(null);
    const [prescriptionNotes, setPrescriptionNotes] = useState("");
    const [reports, setReports] = useState([]);
    const [reportTypes, setReportTypes] = useState({});
    const [showPrescriptionForm, setShowPrescriptionForm] = useState(false);
    const [showReportsForm, setShowReportsForm] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
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

    const getFileType = (fileUrl) => {
        if (!fileUrl) return 'Unknown';
        const extension = fileUrl.split('.').pop().toLowerCase();
        if (['jpg', 'jpeg', 'png', 'gif', 'bmp'].includes(extension)) return 'Image';
        if (['pdf'].includes(extension)) return 'PDF';
        if (['doc', 'docx'].includes(extension)) return 'Document';
        return 'File';
    };

    const handleDownload = (fileUrl, fileName) => {
        const link = document.createElement('a');
        link.href = fileUrl;
        link.target = "_Blank";
        link.setAttribute('download', fileName || 'medical-report');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleMedical = async () => {
        if (showMedical) {
            setShowMedical(false);
            return;
        }
        try {
            const Appointments = await api.get(`/doctors/PatientAppointments/${patientData._id}`);
            setMedicalData(Appointments.data.data);
            setShowMedical(true);
        } catch (error) {
            console.log("Error in Medical: ", error);
        }
    };

    const handleReports = async () => {
        if (showReports) {
            setShowReports(false);
            return;
        }
        try {
            const Reports = await api.get(`/doctors/PatientReports/${patientData._id}`);
            setReportData(Reports.data.data || []);
            setShowReports(true);
        } catch (error) {
            console.log("Error in Reports: ", error);
        }
    };

    const handlePrescription = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setPreview(URL.createObjectURL(file));
        setPrescription(file);
        setShowPrescriptionForm(true);
    };

    const handleReport = (e) => {
        const files = Array.from(e.target.files);
        if (!files.length) return;

        const newReportTypes = { ...reportTypes };
        files.forEach(file => {
            if (!newReportTypes[file.name]) {
                newReportTypes[file.name] = '';
            }
        });
        setReportTypes(newReportTypes);

        setReports(files);
        setShowReportsForm(true);
    };

    const handleReportTypeChange = (fileName, value) => {
        setReportTypes(prev => ({
            ...prev,
            [fileName]: value
        }));
    };

    const uploadPrescription = async () => {
        if (!prescription) return alert("No file selected");
        if (!prescriptionNotes.trim()) return alert("Please add notes/instructions for the prescription");

        const formData = new FormData();
        formData.append("file", prescription);
        formData.append("notes", prescriptionNotes);

        setPrescription(null);
        setPrescriptionNotes("");
        setShowPrescriptionForm(false);

        try {
            const res = await api.post(
                `/upload/prescription/${patientData._id}`,
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );

            alert("Prescription Upload Success ✅");
            console.log(res.data);
        } catch (error) {
            console.error("Upload failed:", error);
            alert("Prescription Upload Failed ❌");
        }
    };

    const uploadReports = async () => {
        if (!reports.length) return alert("No files selected");

        const missingTypes = reports.filter(file => !reportTypes[file.name]?.trim());
        if (missingTypes.length > 0) {
            return alert("Please specify report types for all files");
        }

        const formData = new FormData();
        reports.forEach((file, index) => {
            formData.append("files", file);
            formData.append("reportTypes", reportTypes[file.name]);
        });

        setReports([]);
        setReportTypes({});
        setShowReportsForm(false);

        try {
            setIsLoading(true);
            const res = await api.post(
                `/upload/reports/${patientData._id}`,
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );

            alert("Reports Upload Success ✅");
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            console.error("Upload failed:", error);
            alert("Reports Upload Failed ❌");
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
                                <div className="flex gap-4 relative">
                                    <label className="flex gap-2 items-center cursor-pointer bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg font-medium transition">
                                        <input type="file" name='file' className="hidden" onChange={handlePrescription} accept="image/*,.pdf,.doc,.docx" />
                                        <MdOutlineFileUpload className="text-xl" />Prescription
                                    </label>

                                    <label className="flex gap-2 items-center cursor-pointer bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg font-medium transition">
                                        <input type="file" name='files' className="hidden" multiple onChange={handleReport} accept="image/*,.pdf,.doc,.docx" />
                                        <MdOutlineFileUpload className="text-xl" />Reports
                                    </label>
                                </div>
                            </div>
                        </div>

                        {showPrescriptionForm && (
                            <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
                                <div className="bg-white rounded-lg p-6 w-full max-w-md">
                                    <h3 className="text-xl font-bold mb-4">Upload Prescription</h3>

                                    {preview && (
                                        <div className="mb-4">
                                            <p className="text-sm font-medium mb-2">Preview:</p>
                                            <img
                                                src={preview}
                                                alt="Prescription preview"
                                                className="w-full h-48 object-contain border rounded"
                                            />
                                        </div>
                                    )}

                                    <div className="mb-4">
                                        <label className="block text-sm font-medium mb-2">Doctor's Notes/Instructions:</label>
                                        <textarea
                                            value={prescriptionNotes}
                                            onChange={(e) => setPrescriptionNotes(e.target.value)}
                                            rows="4"
                                            className="w-full p-2 border rounded-md"
                                            placeholder="Enter instructions for the patient..."
                                            required
                                        />
                                    </div>

                                    <div className="flex justify-end gap-3">
                                        <button
                                            onClick={() => {
                                                setPrescription(null);
                                                setPrescriptionNotes("");
                                                setShowPrescriptionForm(false);
                                            }}
                                            className="px-4 py-2 bg-gray-300 rounded-md"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={uploadPrescription}
                                            className="px-4 py-2 bg-blue-600 text-white rounded-md"
                                        >
                                            Upload
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {showReportsForm && (
                            <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
                                <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
                                    <h3 className="text-xl font-bold mb-4">Upload Reports</h3>

                                    <div className="space-y-4 mb-4">
                                        {reports.map((file, index) => (
                                            <div key={index} className="border rounded-md p-3">
                                                <div className="flex items-center justify-between mb-2">
                                                    <div className="flex items-center">
                                                        {file.type.startsWith("image/") ? (
                                                            <img
                                                                src={URL.createObjectURL(file)}
                                                                alt="Preview"
                                                                className="w-12 h-12 object-cover rounded mr-3"
                                                            />
                                                        ) : (
                                                            <FileText className="w-10 w-10 text-gray-500 mr-3" />
                                                        )}
                                                        <div>
                                                            <p className="font-medium">{file.name}</p>
                                                            <p className="text-sm text-gray-500">{(file.size / 1024).toFixed(1)} KB</p>
                                                        </div>
                                                    </div>
                                                    <button
                                                        onClick={() => {
                                                            const newReports = reports.filter((_, i) => i !== index);
                                                            setReports(newReports);
                                                            if (newReports.length === 0) {
                                                                setShowReportsForm(false);
                                                            }
                                                        }}
                                                        className="text-red-500 hover:text-red-700"
                                                    >
                                                        ✕
                                                    </button>
                                                </div>

                                                <div className="mt-2">
                                                    <label className="block text-sm font-medium mb-1">Report Type:</label>
                                                    <input
                                                        type="text"
                                                        value={reportTypes[file.name] || ''}
                                                        onChange={(e) => handleReportTypeChange(file.name, e.target.value)}
                                                        className="w-full p-2 border rounded-md"
                                                        placeholder="e.g., Blood Test, X-Ray, MRI..."
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex justify-end gap-3">
                                        <button
                                            onClick={() => {
                                                setReports([]);
                                                setReportTypes({});
                                                setShowReportsForm(false);
                                            }}
                                            className="px-4 py-2 bg-gray-300 rounded-md"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={uploadReports}
                                            className="px-4 py-2 bg-blue-600 text-white rounded-md"
                                        >
                                            Upload All
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

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
                                    Medical Reports
                                    <motion.button
                                        onClick={handleReports}
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ duration: 0.2 }}
                                        className='bg-blue-100 text-blue-700 hover:bg-blue-200 border border-blue-300 rounded-lg px-4 py-1 ml-6 flex items-center'
                                    >
                                        {showReports ? (
                                            <>
                                                <TbEyeOff className="h-4 w-4 mr-1" />
                                                Hide Reports
                                            </>
                                        ) : (
                                            <>
                                                <TbEye className="h-4 w-4 mr-1" />
                                                Show Reports
                                            </>
                                        )}
                                    </motion.button>
                                </h2>
                            </div>

                            {showReports && (
                                <div className="mb-8">
                                    {reportData.length > 0 ? (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {reportData.map((report, index) => (
                                                <motion.div
                                                    key={report._id || index}
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                                    className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow"
                                                >
                                                    <div className="p-5">
                                                        <div className="flex justify-between items-start mb-4">
                                                            <div className="flex items-center">
                                                                <div className="bg-blue-100 p-2 rounded-lg mr-4">
                                                                    <FileText className="h-5 w-5 text-blue-600" />
                                                                </div>
                                                                <div>
                                                                    <p className="text-sm text-gray-500">Report Date</p>
                                                                    <p className="font-semibold text-gray-800">
                                                                        {formatDate(report.createdAt)}
                                                                    </p>
                                                                </div>


                                                            </div>
                                                            <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                                                                {getFileType(report.fileUrl)}
                                                            </span>
                                                        </div>

                                                        <div className="grid grid-cols-1 gap-3 mb-4">
                                                            <div className="flex items-center">
                                                                <User className="h-4 w-4 text-gray-500 mr-2" />
                                                                <div>
                                                                    <p className="text-xs text-gray-500">Doctor</p>
                                                                    <p className="font-medium text-gray-900">
                                                                        {report.doctorId?.fullName || "N/A"}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <p className="text-xs text-gray-500">Specialization</p>
                                                                <p className="font-medium text-gray-900">
                                                                    {report.doctorId?.specialization || "N/A"}
                                                                </p>
                                                            </div>
                                                           

                                                            <div>
                                                                <p className="text-sm text-gray-500">Report Type</p>
                                                                <p className="font-semibold text-gray-800">
                                                                    {report.reportType}
                                                                </p>
                                                            </div>
                                                        </div>

                                                        <div className="flex justify-between items-center">
                                                            <a
                                                                href={report.fileUrl}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
                                                            >
                                                                <ExternalLink className="h-4 w-4 mr-1" />
                                                                View Report
                                                            </a>
                                                            <button
                                                                onClick={() => handleDownload(report.fileUrl, `medical-report-${report.reportType}`)}
                                                                className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                                                            >
                                                                <TbDownload className="h-4 w-4 mr-1" />
                                                                Download
                                                            </button>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-10 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                                            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                                            <p className="text-gray-500 text-lg">No reports found</p>
                                            <p className="text-gray-400 text-sm mt-1">Medical reports will appear here</p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        <div className="bg-gray-100 px-6 py-4 flex justify-end">
                            <button
                                onClick={onClose}
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors font-medium"
                            >
                                Close
                            </button>
                            <LoadingPage isOpen={isLoading} />
                        </div>
                    </motion.div>
                </motion.main>
            )}
        </AnimatePresence>
    );
};

export default PatientProfile;