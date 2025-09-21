import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import api from "../../../Configs/api";
import PatientProfile from "./PatientProfile";
import { useAuth } from "../../Context/authContext";


const SearchPatients = () => {
  const [patientId, setPatientId] = useState("");
  const [patientData, setPatientData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isopenProfile, setIsOpenProfile] = useState(false);


  
const specializationThemes = {
  "General Physician": {
    primary: "bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 shadow-lg",
    secondary: "bg-emerald-50 text-emerald-800 border-emerald-200",
    accent: "text-emerald-600",
    border: "border-emerald-200",
    gradient: "from-emerald-50 via-green-50 to-teal-50",
    text: "text-emerald-700",
    lightBg: "bg-emerald-50",
    mediumBg: "bg-emerald-100"
  },
  "Dentist": {
    primary: "bg-gradient-to-r from-blue-500 to-sky-600 hover:from-blue-600 hover:to-sky-700 shadow-lg",
    secondary: "bg-blue-50 text-blue-800 border-blue-200",
    accent: "text-blue-600",
    border: "border-blue-200",
    gradient: "from-blue-50 via-sky-50 to-cyan-50",
    text: "text-blue-700",
    lightBg: "bg-blue-50",
    mediumBg: "bg-blue-100"
  },
  "Cardiologist": {
    primary: "bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 shadow-lg",
    secondary: "bg-red-50 text-red-800 border-red-200",
    accent: "text-red-600",
    border: "border-red-200",
    gradient: "from-red-50 via-rose-50 to-pink-50",
    text: "text-red-700",
    lightBg: "bg-red-50",
    mediumBg: "bg-red-100"
  },
  "Dermatologist": {
    primary: "bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 shadow-lg",
    secondary: "bg-pink-50 text-pink-800 border-pink-200",
    accent: "text-pink-600",
    border: "border-pink-200",
    gradient: "from-pink-50 via-rose-50 to-fuchsia-50",
    text: "text-pink-700",
    lightBg: "bg-pink-50",
    mediumBg: "bg-pink-100"
  },
  "ENT": {
    primary: "bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 shadow-lg",
    secondary: "bg-amber-50 text-amber-800 border-amber-200",
    accent: "text-amber-600",
    border: "border-amber-200",
    gradient: "from-amber-50 via-yellow-50 to-orange-50",
    text: "text-amber-700",
    lightBg: "bg-amber-50",
    mediumBg: "bg-amber-100"
  },
  "Orthopedic": {
    primary: "bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 shadow-lg",
    secondary: "bg-purple-50 text-purple-800 border-purple-200",
    accent: "text-purple-600",
    border: "border-purple-200",
    gradient: "from-purple-50 via-violet-50 to-indigo-50",
    text: "text-purple-700",
    lightBg: "bg-purple-50",
    mediumBg: "bg-purple-100"
  },
  "Pediatrician": {
    primary: "bg-gradient-to-r from-cyan-500 to-sky-600 hover:from-cyan-600 hover:to-sky-700 shadow-lg",
    secondary: "bg-cyan-50 text-cyan-800 border-cyan-200",
    accent: "text-cyan-600",
    border: "border-cyan-200",
    gradient: "from-cyan-50 via-sky-50 to-blue-50",
    text: "text-cyan-700",
    lightBg: "bg-cyan-50",
    mediumBg: "bg-cyan-100"
  },
  "Psychiatrist": {
    primary: "bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 shadow-lg",
    secondary: "bg-indigo-50 text-indigo-800 border-indigo-200",
    accent: "text-indigo-600",
    border: "border-indigo-200",
    gradient: "from-indigo-50 via-blue-50 to-purple-50",
    text: "text-indigo-700",
    lightBg: "bg-indigo-50",
    mediumBg: "bg-indigo-100"
  },
  "Gynecologist": {
    primary: "bg-gradient-to-r from-fuchsia-500 to-pink-600 hover:from-fuchsia-600 hover:to-pink-700 shadow-lg",
    secondary: "bg-fuchsia-50 text-fuchsia-800 border-fuchsia-200",
    accent: "text-fuchsia-600",
    border: "border-fuchsia-200",
    gradient: "from-fuchsia-50 via-pink-50 to-rose-50",
    text: "text-fuchsia-700",
    lightBg: "bg-fuchsia-50",
    mediumBg: "bg-fuchsia-100"
  },
  "Neurologist": {
    primary: "bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 shadow-lg",
    secondary: "bg-violet-50 text-violet-800 border-violet-200",
    accent: "text-violet-600",
    border: "border-violet-200",
    gradient: "from-violet-50 via-purple-50 to-indigo-50",
    text: "text-violet-700",
    lightBg: "bg-violet-50",
    mediumBg: "bg-violet-100"
  },
  "Ophthalmologist": {
    primary: "bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 shadow-lg",
    secondary: "bg-amber-50 text-amber-800 border-amber-200",
    accent: "text-amber-600",
    border: "border-amber-200",
    gradient: "from-amber-50 via-yellow-50 to-lime-50",
    text: "text-amber-700",
    lightBg: "bg-amber-50",
    mediumBg: "bg-amber-100"
  },
  "Oncologist": {
    primary: "bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 shadow-lg",
    secondary: "bg-rose-50 text-rose-800 border-rose-200",
    accent: "text-rose-600",
    border: "border-rose-200",
    gradient: "from-rose-50 via-pink-50 to-red-50",
    text: "text-rose-700",
    lightBg: "bg-rose-50",
    mediumBg: "bg-rose-100"
  },
  "Pulmonologist": {
    primary: "bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 shadow-lg",
    secondary: "bg-teal-50 text-teal-800 border-teal-200",
    accent: "text-teal-600",
    border: "border-teal-200",
    gradient: "from-teal-50 via-emerald-50 to-green-50",
    text: "text-teal-700",
    lightBg: "bg-teal-50",
    mediumBg: "bg-teal-100"
  },
  "Urologist": {
    primary: "bg-gradient-to-r from-lime-500 to-green-600 hover:from-lime-600 hover:to-green-700 shadow-lg",
    secondary: "bg-lime-50 text-lime-800 border-lime-200",
    accent: "text-lime-600",
    border: "border-lime-200",
    gradient: "from-lime-50 via-green-50 to-emerald-50",
    text: "text-lime-700",
    lightBg: "bg-lime-50",
    mediumBg: "bg-lime-100"
  },
  "Gastroenterologist": {
    primary: "bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-lg",
    secondary: "bg-emerald-50 text-emerald-800 border-emerald-200",
    accent: "text-emerald-600",
    border: "border-emerald-200",
    gradient: "from-emerald-50 via-teal-50 to-cyan-50",
    text: "text-emerald-700",
    lightBg: "bg-emerald-50",
    mediumBg: "bg-emerald-100"
  },
  "Nephrologist": {
    primary: "bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 shadow-lg",
    secondary: "bg-sky-50 text-sky-800 border-sky-200",
    accent: "text-sky-600",
    border: "border-sky-200",
    gradient: "from-sky-50 via-blue-50 to-indigo-50",
    text: "text-sky-700",
    lightBg: "bg-sky-50",
    mediumBg: "bg-sky-100"
  },
  "Endocrinologist": {
    primary: "bg-gradient-to-r from-fuchsia-500 to-purple-600 hover:from-fuchsia-600 hover:to-purple-700 shadow-lg",
    secondary: "bg-fuchsia-50 text-fuchsia-800 border-fuchsia-200",
    accent: "text-fuchsia-600",
    border: "border-fuchsia-200",
    gradient: "from-fuchsia-50 via-purple-50 to-violet-50",
    text: "text-fuchsia-700",
    lightBg: "bg-fuchsia-50",
    mediumBg: "bg-fuchsia-100"
  },
  "Hematologist": {
    primary: "bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 shadow-lg",
    secondary: "bg-red-50 text-red-800 border-red-200",
    accent: "text-red-600",
    border: "border-red-200",
    gradient: "from-red-50 via-rose-50 to-pink-50",
    text: "text-red-700",
    lightBg: "bg-red-50",
    mediumBg: "bg-red-100"
  },
  "Rheumatologist": {
    primary: "bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 shadow-lg",
    secondary: "bg-purple-50 text-purple-800 border-purple-200",
    accent: "text-purple-600",
    border: "border-purple-200",
    gradient: "from-purple-50 via-violet-50 to-indigo-50",
    text: "text-purple-700",
    lightBg: "bg-purple-50",
    mediumBg: "bg-purple-100"
  },
  "Plastic Surgeon": {
    primary: "bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 shadow-lg",
    secondary: "bg-pink-50 text-pink-800 border-pink-200",
    accent: "text-pink-600",
    border: "border-pink-200",
    gradient: "from-pink-50 via-rose-50 to-fuchsia-50",
    text: "text-pink-700",
    lightBg: "bg-pink-50",
    mediumBg: "bg-pink-100"
  },
  "Anesthesiologist": {
    primary: "bg-gradient-to-r from-slate-500 to-gray-600 hover:from-slate-600 hover:to-gray-700 shadow-lg",
    secondary: "bg-slate-50 text-slate-800 border-slate-200",
    accent: "text-slate-600",
    border: "border-slate-200",
    gradient: "from-slate-50 via-gray-50 to-zinc-50",
    text: "text-slate-700",
    lightBg: "bg-slate-50",
    mediumBg: "bg-slate-100"
  },
  "Radiologist": {
    primary: "bg-gradient-to-r from-blue-500 to-sky-600 hover:from-blue-600 hover:to-sky-700 shadow-lg",
    secondary: "bg-blue-50 text-blue-800 border-blue-200",
    accent: "text-blue-600",
    border: "border-blue-200",
    gradient: "from-blue-50 via-sky-50 to-cyan-50",
    text: "text-blue-700",
    lightBg: "bg-blue-50",
    mediumBg: "bg-blue-100"
  },
  "Pathologist": {
    primary: "bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 shadow-lg",
    secondary: "bg-indigo-50 text-indigo-800 border-indigo-200",
    accent: "text-indigo-600",
    border: "border-indigo-200",
    gradient: "from-indigo-50 via-blue-50 to-purple-50",
    text: "text-indigo-700",
    lightBg: "bg-indigo-50",
    mediumBg: "bg-indigo-100"
  }
};

  const { user } = useAuth();
  const specialization = user?.specialization || "General Physician";
  const theme = specializationThemes[specialization];

  const handleChange = (e) => {
    setPatientId(e.target.value);
    if (patientData || error) {
      setPatientData(null);
      setError("");
    }
  };

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
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleOnSearch();
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <motion.main
      className="w-full min-h-screen bg-white/80 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <motion.div
        className={`p-6 bg-gradient-to-r ${theme.gradient} shadow-md`}
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
  <h1 className={`text-2xl font-bold text-center ${theme.text}` }>
          Patient Search
        </h1>
      </motion.div>

      {/* Search Box */}
      <motion.div
        className="p-6 flex flex-col md:flex-row gap-4 justify-center items-center bg-white shadow-sm"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="w-full md:w-1/3" variants={itemVariants}>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Enter Patient ID"
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              value={patientId}
              className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-offset-2 outline-none transition"
              disabled={loading}
            />
          </div>
        </motion.div>

        <motion.div className="w-full md:w-auto" variants={itemVariants}>
          <button
            onClick={handleOnSearch}
            disabled={loading}
            className={`w-full md:w-auto py-3 px-6 rounded-lg font-medium flex items-center justify-center gap-2 shadow-md text-white ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : `${theme.primary}`
            }`}
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 
                     5.291A7.962 7.962 0 014 12H0c0 
                     3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Searching...
              </>
            ) : (
              <>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 
                       12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Search Patient
              </>
            )}
          </button>
        </motion.div>
      </motion.div>

      {/* Error */}
      <AnimatePresence>
        {error && (
          <motion.div
            className="mx-4 mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center">{error}</div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results */}
      <div className="p-4">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              className="flex justify-center items-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="animate-pulse flex flex-col items-center">
                <div className={`rounded-full ${theme.secondary} h-12 w-12 mb-3`}></div>
                <div className={`h-4 ${theme.secondary} rounded w-32`}></div>
              </div>
            </motion.div>
          ) : patientData ? (
            <motion.div
              key="results"
              className="w-full flex justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
                <div className={`p-4 text-white bg-gradient-to-r ${theme.gradient}`}>
                  <h2 className="text-xl font-bold">Patient Information</h2>
                  <p className="opacity-80">ID: {patientId}</p>
                </div>

                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 uppercase">
                        Full Name
                      </h3>
                      <p className="text-lg font-semibold mt-1">
                        {patientData.fullName}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-gray-500 uppercase">
                        Email Address
                      </h3>
                      <p className="text-lg mt-1 break-words">
                        {patientData.email}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-gray-500 uppercase">
                        Verification Status
                      </h3>
                      <div className="flex items-center mt-1">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                            patientData.isVerified
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {patientData.isVerified ? "Verified" : "Pending"}
                        </span>
                      </div>
                    </div>

                    <div className="md:col-span-2 flex justify-end mt-4">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsOpenProfile(true)}
                        className={`flex items-center gap-2 ${theme.primary} text-white font-medium py-2 px-4 rounded-lg transition-colors`}
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M16 7a4 4 0 11-8 0 4 4 0 
                               018 0zM12 14a7 7 0 00-7 7h14a7 
                               7 0 00-7-7z"
                          />
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
              className="flex flex-col items-center justify-center py-16 text-gray-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-lg">Enter a patient ID to search</p>
              <p className="text-sm mt-1">Results will appear here</p>
            </motion.div>
          )}
        </AnimatePresence>

        <PatientProfile
          isOpen={isopenProfile}
          onClose={() => {
            setIsOpenProfile(false);
          }}
          patientData={patientData}
        />
      </div>
    </motion.main>
  );
};

export default SearchPatients;
