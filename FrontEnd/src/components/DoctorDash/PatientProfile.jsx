import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TbReportSearch, TbEye, TbEyeOff, TbDownload } from "react-icons/tb";
import { LuUserRound } from "react-icons/lu";
import api from '../../../Configs/api';
import { MdOutlineFileUpload } from "react-icons/md";
import { FileText, Calendar, User, ExternalLink } from 'lucide-react';
import LoadingPage from './loadingpage';
import { useAuth } from '../../Context/authContext';


const specializationThemes = {
  "General Physician": {
    primary: "bg-green-600 hover:bg-green-700",
    secondary: "bg-green-50 text-green-800 border-green-200",
    accent: "text-green-600",
    border: "border-green-200",
    gradient: "from-green-50 via-green-100 to-green-200",
    text: "text-green-700",
    lightBg: "bg-green-100",
    mediumBg: "bg-green-200"
  },
  "Dentist": {
    primary: "bg-blue-600 hover:bg-blue-700",
    secondary: "bg-blue-50 text-blue-800 border-blue-200",
    accent: "text-blue-600",
    border: "border-blue-200",
    gradient: "from-blue-50 via-blue-100 to-blue-200",
    text: "text-blue-700",
    lightBg: "bg-blue-100",
    mediumBg: "bg-blue-200"
  },
  "Cardiologist": {
    primary: "bg-red-600 hover:bg-red-700",
    secondary: "bg-red-50 text-red-800 border-red-200",
    accent: "text-red-600",
    border: "border-red-200",
    gradient: "from-red-50 via-red-100 to-red-200",
    text: "text-red-700",
    lightBg: "bg-red-100",
    mediumBg: "bg-red-200"
  },
  "Dermatologist": {
    primary: "bg-pink-600 hover:bg-pink-700",
    secondary: "bg-pink-50 text-pink-800 border-pink-200",
    accent: "text-pink-600",
    border: "border-pink-200",
    gradient: "from-pink-50 via-pink-100 to-pink-200",
    text: "text-pink-700",
    lightBg: "bg-pink-100",
    mediumBg: "bg-pink-200"
  },
  "ENT": {
    primary: "bg-yellow-600 hover:bg-yellow-700",
    secondary: "bg-yellow-50 text-yellow-800 border-yellow-200",
    accent: "text-yellow-600",
    border: "border-yellow-200",
    gradient: "from-yellow-50 via-yellow-100 to-yellow-200",
    text: "text-yellow-700",
    lightBg: "bg-yellow-100",
    mediumBg: "bg-yellow-200"
  },
  "Orthopedic": {
    primary: "bg-purple-600 hover:bg-purple-700",
    secondary: "bg-purple-50 text-purple-800 border-purple-200",
    accent: "text-purple-600",
    border: "border-purple-200",
    gradient: "from-purple-50 via-purple-100 to-purple-200",
    text: "text-purple-700",
    lightBg: "bg-purple-100",
    mediumBg: "bg-purple-200"
  },
  "Pediatrician": {
    primary: "bg-cyan-600 hover:bg-cyan-700",
    secondary: "bg-cyan-50 text-cyan-800 border-cyan-200",
    accent: "text-cyan-600",
    border: "border-cyan-200",
    gradient: "from-cyan-50 via-cyan-100 to-cyan-200",
    text: "text-cyan-700",
    lightBg: "bg-cyan-100",
    mediumBg: "bg-cyan-200"
  },
  "Psychiatrist": {
    primary: "bg-teal-600 hover:bg-teal-700",
    secondary: "bg-teal-50 text-teal-800 border-teal-200",
    accent: "text-teal-600",
    border: "border-teal-200",
    gradient: "from-teal-50 via-teal-100 to-teal-200",
    text: "text-teal-700",
    lightBg: "bg-teal-100",
    mediumBg: "bg-teal-200"
  },
  "Gynecologist": {
    primary: "bg-fuchsia-600 hover:bg-fuchsia-700",
    secondary: "bg-fuchsia-50 text-fuchsia-800 border-fuchsia-200",
    accent: "text-fuchsia-600",
    border: "border-fuchsia-200",
    gradient: "from-fuchsia-50 via-fuchsia-100 to-fuchsia-200",
    text: "text-fuchsia-700",
    lightBg: "bg-fuchsia-100",
    mediumBg: "bg-fuchsia-200"
  },
  "Neurologist": {
    primary: "bg-violet-600 hover:bg-violet-700",
    secondary: "bg-violet-50 text-violet-800 border-violet-200",
    accent: "text-violet-600",
    border: "border-violet-200",
    gradient: "from-violet-50 via-violet-100 to-violet-200",
    text: "text-violet-700",
    lightBg: "bg-violet-100",
    mediumBg: "bg-violet-200"
  },
  "Ophthalmologist": {
    primary: "bg-amber-600 hover:bg-amber-700",
    secondary: "bg-amber-50 text-amber-800 border-amber-200",
    accent: "text-amber-600",
    border: "border-amber-200",
    gradient: "from-amber-50 via-amber-100 to-amber-200",
    text: "text-amber-700",
    lightBg: "bg-amber-100",
    mediumBg: "bg-amber-200"
  },
  "Oncologist": {
    primary: "bg-rose-600 hover:bg-rose-700",
    secondary: "bg-rose-50 text-rose-800 border-rose-200",
    accent: "text-rose-600",
    border: "border-rose-200",
    gradient: "from-rose-50 via-rose-100 to-rose-200",
    text: "text-rose-700",
    lightBg: "bg-rose-100",
    mediumBg: "bg-rose-200"
  },
  "Pulmonologist": {
    primary: "bg-emerald-600 hover:bg-emerald-700",
    secondary: "bg-emerald-50 text-emerald-800 border-emerald-200",
    accent: "text-emerald-600",
    border: "border-emerald-200",
    gradient: "from-emerald-50 via-emerald-100 to-emerald-200",
    text: "text-emerald-700",
    lightBg: "bg-emerald-100",
    mediumBg: "bg-emerald-200"
  },
  "Urologist": {
    primary: "bg-lime-600 hover:bg-lime-700",
    secondary: "bg-lime-50 text-lime-800 border-lime-200",
    accent: "text-lime-600",
    border: "border-lime-200",
    gradient: "from-lime-50 via-lime-100 to-lime-200",
    text: "text-lime-700",
    lightBg: "bg-lime-100",
    mediumBg: "bg-lime-200"
  },
  "Gastroenterologist": {
    primary: "bg-sky-600 hover:bg-sky-700",
    secondary: "bg-sky-50 text-sky-800 border-sky-200",
    accent: "text-sky-600",
    border: "border-sky-200",
    gradient: "from-sky-50 via-sky-100 to-sky-200",
    text: "text-sky-700",
    lightBg: "bg-sky-100",
    mediumBg: "bg-sky-200"
  },
  "Nephrologist": {
    primary: "bg-orange-600 hover:bg-orange-700",
    secondary: "bg-orange-50 text-orange-800 border-orange-200",
    accent: "text-orange-600",
    border: "border-orange-200",
    gradient: "from-orange-50 via-orange-100 to-orange-200",
    text: "text-orange-700",
    lightBg: "bg-orange-100",
    mediumBg: "bg-orange-200"
  },
  "Endocrinologist": {
    primary: "bg-fuchsia-600 hover:bg-fuchsia-700",
    secondary: "bg-fuchsia-50 text-fuchsia-800 border-fuchsia-200",
    accent: "text-fuchsia-600",
    border: "border-fuchsia-200",
    gradient: "from-fuchsia-50 via-fuchsia-100 to-fuchsia-200",
    text: "text-fuchsia-700",
    lightBg: "bg-fuchsia-100",
    mediumBg: "bg-fuchsia-200"
  },
  "Hematologist": {
    primary: "bg-red-600 hover:bg-red-700",
    secondary: "bg-red-50 text-red-800 border-red-200",
    accent: "text-red-600",
    border: "border-red-200",
    gradient: "from-red-50 via-red-100 to-red-200",
    text: "text-red-700",
    lightBg: "bg-red-100",
    mediumBg: "bg-red-200"
  },
  "Rheumatologist": {
    primary: "bg-purple-600 hover:bg-purple-700",
    secondary: "bg-purple-50 text-purple-800 border-purple-200",
    accent: "text-purple-600",
    border: "border-purple-200",
    gradient: "from-purple-50 via-purple-100 to-purple-200",
    text: "text-purple-700",
    lightBg: "bg-purple-100",
    mediumBg: "bg-purple-200"
  },
  "Plastic Surgeon": {
    primary: "bg-pink-600 hover:bg-pink-700",
    secondary: "bg-pink-50 text-pink-800 border-pink-200",
    accent: "text-pink-600",
    border: "border-pink-200",
    gradient: "from-pink-50 via-pink-100 to-pink-200",
    text: "text-pink-700",
    lightBg: "bg-pink-100",
    mediumBg: "bg-pink-200"
  },
  "Anesthesiologist": {
    primary: "bg-gray-600 hover:bg-gray-700",
    secondary: "bg-gray-50 text-gray-800 border-gray-200",
    accent: "text-gray-600",
    border: "border-gray-200",
    gradient: "from-gray-50 via-gray-100 to-gray-200",
    text: "text-gray-700",
    lightBg: "bg-gray-100",
    mediumBg: "bg-gray-200"
  },
  "Radiologist": {
    primary: "bg-blue-600 hover:bg-blue-700",
    secondary: "bg-blue-50 text-blue-800 border-blue-200",
    accent: "text-blue-600",
    border: "border-blue-200",
    gradient: "from-blue-50 via-blue-100 to-blue-200",
    text: "text-blue-700",
    lightBg: "bg-blue-100",
    mediumBg: "bg-blue-200"
  },
  "Pathologist": {
    primary: "bg-indigo-600 hover:bg-indigo-700",
    secondary: "bg-indigo-50 text-indigo-800 border-indigo-200",
    accent: "text-indigo-600",
    border: "border-indigo-200",
    gradient: "from-indigo-50 via-indigo-100 to-indigo-200",
    text: "text-indigo-700",
    lightBg: "bg-indigo-100",
    mediumBg: "bg-indigo-200"
  }
};


const PatientProfile = ({ isOpen, onClose, patientData }) => {
    if (!isOpen || !patientData) return null;
    const [showReports, setShowReports] = useState(false);
    const [showMedical, setShowMedical] = useState(false);
    const [medicalData, setMedicalData] = useState([]);
    const [reportData, setReportData] = useState([]);
    const [reports, setReports] = useState([]);
    const [reportTypes, setReportTypes] = useState({});
    const [showPrescriptionForm, setShowPrescriptionForm] = useState(false);
    const [showReportsForm, setShowReportsForm] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [diagnosis, setDiagnosis] = useState("");
    const [medicines, setMedicines] = useState([{ name: "", dose: "", duration: "" }]);
    const [prescriptionNotes, setPrescriptionNotes] = useState("");
    const [nextVisit, setNextVisit] = useState("");
    const { user } = useAuth();

    const specialization = user.specialization || "General Physician";
    const theme = specializationThemes[specialization] || specializationThemes["General Physician"];

 
    
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
    fetch(fileUrl, { mode: 'cors' })
      .then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName || 'medical-report';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      })
      .catch(error => {
        console.error('Download failed:', error);
      });
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


    const handleMedicineChange = (index, field, value) => {
        const updated = [...medicines];
        updated[index][field] = value;
        setMedicines(updated);
    };

    const addMedicineField = () => {
        setMedicines([...medicines, { name: "", dose: "", duration: "" }]);
    };


    const savePrescription = async () => {
        try {
            if (!diagnosis || medicines.length === 0) {
                alert("Please fill all required fields");
                return;
            }

            const payload = {
                diagnosis,
                medicines,
                notes : prescriptionNotes,
                nextVisit,
            };

            const res = await api.post(`/upload/prescription/${patientData._id}`, payload);


            console.log("Prescription saved:", res.data.message);

            alert("Prescription saved successfully!");
            setShowPrescriptionForm(false);
            setDiagnosis("");
            setMedicines([]);
            setPrescriptionNotes("");
            setNextVisit("");
        } catch (err) {
            console.error(err);
            alert("Error saving prescription");
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
                        <div className={`p-6 text-white relative rounded-xl shadow-lg bg-gradient-to-r ${theme.gradient}`}>
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
                                        <h1 className={`text-2xl font-bold ${theme.text}`}>{patientData.fullName}'s Profile</h1>
                                        <p className={`text-blue-100 text-sm ${theme.text}`}>
                                            Patient ID: <span className="font-semibold">{patientData.phone}</span>
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-4 relative">
                                    <button
                                        onClick={() => setShowPrescriptionForm(true)}
                                        className={`flex gap-2 items-center cursor-pointer ${theme.secondary} px-4 py-2 rounded-lg font-medium transition ${theme.text}`}
                                    >
                                        <MdOutlineFileUpload className="text-xl" />
                                        New Prescription
                                    </button>

                                    <label className={`flex gap-2 items-center cursor-pointer ${theme.secondary}   px-4 py-2 rounded-lg font-medium transition ${theme.text}`}>
                                        <input type="file" name='files' className="hidden" multiple onChange={handleReport} accept="image/*,.pdf,.doc,.docx" />
                                        <MdOutlineFileUpload className="text-xl" />Reports
                                    </label>
                                </div>
                            </div>
                        </div>

                        {showPrescriptionForm && (
                            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                                <div className="bg-white rounded-lg p-6 w-full max-w-lg">
                                    <h3 className="text-xl font-bold mb-4">Write Prescription</h3>

                                    {/* Diagnosis */}
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium mb-2">Diagnosis</label>
                                        <input
                                            type="text"
                                            value={diagnosis}
                                            onChange={(e) => setDiagnosis(e.target.value)}
                                            className="w-full p-2 border rounded-md"
                                            placeholder="Enter diagnosis..."
                                            required
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label className="block text-sm font-medium mb-2">Medicines</label>
                                        {medicines.map((med, index) => (
                                            <div key={index} className="flex gap-2 mb-2">
                                                <input
                                                    value={med.name}
                                                    onChange={(e) => handleMedicineChange(index, "name", e.target.value)}
                                                    placeholder="Medicine"
                                                    className="flex-1 p-2 border rounded-md"
                                                    required
                                                />
                                                <input
                                                    value={med.dose}
                                                    onChange={(e) => handleMedicineChange(index, "dose", e.target.value)}
                                                    placeholder="Dose (e.g. 1-0-1)"
                                                    className="w-28 p-2 border rounded-md"
                                                    required
                                                />
                                                <input
                                                    value={med.duration}
                                                    onChange={(e) => handleMedicineChange(index, "duration", e.target.value)}
                                                    placeholder="Days"
                                                    className="w-20 p-2 border rounded-md"
                                                    required
                                                />
                                            </div>
                                        ))}
                                        <button
                                            type="button"
                                            onClick={addMedicineField}
                                            className={`text-sm underline ${theme.text}`}
                                        >
                                            + Add Medicine
                                        </button>
                                    </div>

                                    {/* Notes */}
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium mb-2">Doctor's Notes / Advice</label>
                                        <textarea
                                            value={prescriptionNotes}
                                            onChange={(e) => setPrescriptionNotes(e.target.value)}
                                            rows="3"
                                            className="w-full p-2 border rounded-md"
                                            placeholder="Enter instructions..."
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label className="block text-sm font-medium mb-2">Next Visit</label>
                                        <input
                                            type="date"
                                            value={nextVisit}
                                            onChange={(e) => setNextVisit(e.target.value)}
                                            className="w-full p-2 border rounded-md"
                                        />
                                    </div>

                                    {/* Buttons */}
                                    <div className="flex justify-end gap-3">
                                        <button
                                            onClick={() => {
                                                setDiagnosis("");
                                                setMedicines([{ name: "", dose: "", duration: "" }]);
                                                setPrescriptionNotes("");
                                                setNextVisit("");
                                                setShowPrescriptionForm(false);
                                            }}
                                            className="px-4 py-2 bg-gray-300 rounded-md"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={savePrescription}
                                            className={`px-4 py-2 text-white rounded-md ${theme.primary}`}
                                        >
                                            Save
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Apply theme to reports form */}
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
                                            className={`px-4 py-2 text-white rounded-md ${theme.primary}`}
                                        >
                                            Upload All
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="overflow-y-auto p-6 flex-grow">
                            {/* Apply theme to section headers */}
                            <div className="mb-8">
                                <h2 className={`text-xl font-semibold mb-4 pb-2 border-b flex items-center ${theme.text}`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    Personal Information
                                </h2>

                                <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-6 gap-4">
                                    <div className={`p-4 rounded-lg ${theme.lightBg}`}>
                                        <p className="text-sm text-gray-500">Full Name</p>
                                        <p className="font-medium">{patientData.fullName}</p>
                                    </div>

                                    <div className={`p-4 rounded-lg ${theme.lightBg}`}>
                                        <p className="text-sm text-gray-500">Gender</p>
                                        <p className="font-medium">{patientData.gender}</p>
                                    </div>

                                    <div className={`p-4 rounded-lg ${theme.lightBg}`}>
                                        <p className="text-sm text-gray-500">Date of Birth</p>
                                        <p className="font-medium">{formatDate(patientData.dob)}</p>
                                    </div>

                                    <div className={`p-4 rounded-lg ${theme.lightBg}`}>
                                        <p className="text-sm text-gray-500">Age</p>
                                        <p className="font-medium">{calculateAge(patientData.dob)} years</p>
                                    </div>

                                    <div className={`p-4 rounded-lg ${theme.lightBg}`}>
                                        <p className="text-sm text-gray-500">Aadhar Number</p>
                                        <p className="font-medium">{patientData.aadharNumber}</p>
                                    </div>
                                    <div className={`p-4 rounded-lg ${theme.lightBg}`}>
                                        <p className="text-sm text-gray-500">Blood Group</p>
                                        <p className="font-medium">{patientData.bloodGroup}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-8">
                                <h2 className={`text-xl font-semibold mb-4 pb-2 border-b flex items-center ${theme.text}`}>
                                    <LuUserRound className="h-5 w-5 ml-2" />
                                    Account Information
                                </h2>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <div className={`p-4 rounded-lg ${theme.lightBg}`}>
                                        <p className="text-sm text-gray-500">Verification Status</p>
                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${patientData.isVerified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                            {patientData.isVerified ? 'Verified' : 'Pending Verification'}
                                        </span>
                                    </div>

                                    <div className={`p-4 rounded-lg ${theme.lightBg}`}>
                                        <p className="text-sm text-gray-500">Role</p>
                                        <p className="font-medium">{patientData.role}</p>
                                    </div>

                                    <div className={`p-4 rounded-lg ${theme.lightBg}`}>
                                        <p className="text-sm text-gray-500">Member Since</p>
                                        <p className="font-medium">{formatDate(patientData.createdAt)}</p>
                                    </div>

                                    <div className={`p-4 rounded-lg ${theme.lightBg}`}>
                                        <p className="text-sm text-gray-500">Last Updated</p>
                                        <p className="font-medium">{formatDate(patientData.updatedAt)}</p>
                                    </div>
                                </div>
                            </div>

                            <div className='mb-8'>
                                <h2 className={`text-xl font-semibold mb-4 pb-2 border-b flex items-center ${theme.text}`}>
                                    <TbReportSearch className="h-6 w-6 mr-3" />
                                    Medical History
                                    <motion.button
                                        onClick={handleMedical}
                                        animate={{ scale: showMedical ? 0.95 : 1 }}
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ duration: 0.2 }}
                                        className={`border rounded-lg px-4 py-1 ml-6 flex items-center ${theme.secondary}`}
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
                                                            <div className={`p-2 rounded-lg mr-4 ${theme.lightBg}`}>
                                                                <Calendar className={`h-5 w-5 ${theme.accent}`} />
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
                                <h2 className={`text-xl font-semibold mb-4 pb-2 border-b flex items-center ${theme.text}`}>
                                    <TbReportSearch className="h-5 w-5 ml-2" />
                                    Medical Reports
                                    <motion.button
                                        onClick={handleReports}
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ duration: 0.2 }}
                                        className={`border rounded-lg px-4 py-1 ml-6 flex items-center ${theme.secondary}`}
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
                                                                <div className={`p-2 rounded-lg mr-4 ${theme.lightBg}`}>
                                                                    <FileText className={`h-5 w-5 ${theme.accent}`} />
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
                                                                className={`flex items-center text-sm font-medium ${theme.text} hover:underline`}
                                                            >
                                                                <ExternalLink className="h-4 w-4 mr-1" />
                                                                View Report
                                                            </a>
                                                            <button
                                                                onClick={() => handleDownload(report.fileUrl, `medical-report-${report.reportType}`)}
                                                                className={`flex items-center text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors ${theme.primary}`}
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