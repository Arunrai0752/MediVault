import React, { useState } from 'react';
import { IoMdCloseCircleOutline } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import api from '../../Configs/api';
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const DoctorRegister = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    specialization: 'General Physician',
    experience: 0,
    hospital: '',
    licenseNumber: '',
    availability: '',
    photo: '',
    fee: 500,
    password: '',
    confirmPassword: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    // basic required fields check
    if (!formData.fullName || !formData.email || !formData.phone || !formData.licenseNumber) {
      toast.error("Please fill the required fields");
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await api.post("/doctors/register", formData);
      console.log("Registration successful:", response.data);
      toast.success("Doctor Registered Successfully");

      setFormData({
        fullName: '',
        email: '',
        phone: '',
        specialization: 'General Physician',
        experience: 0,
        hospital: '',
        licenseNumber: '',
        availability: '',
        photo: '',
        fee: 500,
        password: '',
        confirmPassword: ''
      });

      setTimeout(() => navigate('/'), 900);
    } catch (error) {
      console.error("Registration failed:", {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const specializations = [
    { key: "general_physician", label: "General Physician" },
    { key: "dentist", label: "Dentist" },
    { key: "cardiologist", label: "Cardiologist" },
    { key: "dermatologist", label: "Dermatologist" },
    { key: "ent", label: "ENT (Ear, Nose, Throat)" },
    { key: "orthopedic", label: "Orthopedic" },
    { key: "pediatrician", label: "Pediatrician" },
    { key: "psychiatrist", label: "Psychiatrist" },
    { key: "gynecologist", label: "Gynecologist" },
    { key: "neurologist", label: "Neurologist" },
    { key: "ophthalmologist", label: "Ophthalmologist" },
    { key: "oncologist", label: "Oncologist" },
    { key: "pulmonologist", label: "Pulmonologist" },
    { key: "urologist", label: "Urologist" },
    { key: "gastroenterologist", label: "Gastroenterologist" },
    { key: "nephrologist", label: "Nephrologist" },
    { key: "endocrinologist", label: "Endocrinologist" },
    { key: "hematologist", label: "Hematologist" },
    { key: "rheumatologist", label: "Rheumatologist" },
    { key: "plastic_surgeon", label: "Plastic Surgeon" },
    { key: "anesthesiologist", label: "Anesthesiologist" },
    { key: "radiologist", label: "Radiologist" },
    { key: "pathologist", label: "Pathologist" },
    { key: "other", label: "Other" }
  ];


  return (
    <main className='min-h-[91.4vh] bg-gradient-to-br from-teal-50 via-blue-50 to-indigo-100 w-full flex justify-center items-center p-4'>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className='w-full max-w-4xl bg-white/95 rounded-3xl p-8 flex flex-col shadow-2xl backdrop-blur-md border border-teal-200 overflow-y-auto max-h-[90vh]'
      >
        <div className='flex justify-between items-center border-b border-gradient-to-r from-teal-300 to-indigo-300 pb-6 mb-8'>
          <motion.h1
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className='text-3xl md:text-4xl font-bold bg-gradient-to-r from-teal-700 to-indigo-700 bg-clip-text text-transparent'
          >
            Doctor <span className='text-teal-600'>Registration</span>
          </motion.h1>
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => window.history.back()}
            className='text-3xl text-gray-500 hover:text-red-500 transition-all duration-300'
            aria-label="Close registration form"
          >
            <IoMdCloseCircleOutline />
          </motion.button>
        </div>

  <form onSubmit={handleSubmit} className='flex-1 w-full space-y-6'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className='bg-gradient-to-r from-teal-50 to-indigo-50 p-6 rounded-2xl shadow-lg border border-teal-100'
          >
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className='text-2xl font-bold text-teal-800 mb-6 pb-3 border-b border-teal-200 flex items-center'
            >
              <motion.span
                whileHover={{ scale: 1.1 }}
                className="bg-gradient-to-r from-teal-600 to-indigo-600 text-white p-2 rounded-lg mr-3 shadow-md"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </motion.span>
              Personal Information
            </motion.h2>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.3 }}
                className='w-full'
              >
                <label htmlFor="fullName" className='block text-gray-700 mb-3 font-semibold'>Full Name *</label>
                <motion.input
                  whileFocus={{ scale: 1.02, boxShadow: "0 0 0 3px rgba(20, 184, 166, 0.1)" }}
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className='w-full border-2 border-gray-200 rounded-xl p-4 outline-none focus:ring-0 focus:border-teal-500 transition-all duration-300 bg-white/80 backdrop-blur-sm'
                  placeholder="Dr. John Doe"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.3 }}
                className='w-full'
              >
                <label htmlFor="email" className='block text-gray-700 mb-3 font-semibold'>Email *</label>
                <motion.input
                  whileFocus={{ scale: 1.02, boxShadow: "0 0 0 3px rgba(20, 184, 166, 0.1)" }}
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className='w-full border-2 border-gray-200 rounded-xl p-4 outline-none focus:ring-0 focus:border-teal-500 transition-all duration-300 bg-white/80 backdrop-blur-sm'
                  placeholder="doctor@example.com"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.3 }}
                className='w-full'
              >
                <label htmlFor="phone" className='block text-gray-700 mb-3 font-semibold'>Phone Number *</label>
                <motion.input
                  whileFocus={{ scale: 1.02, boxShadow: "0 0 0 3px rgba(20, 184, 166, 0.1)" }}
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  pattern="[0-9]{10}"
                  required
                  className='w-full border-2 border-gray-200 rounded-xl p-4 outline-none focus:ring-0 focus:border-teal-500 transition-all duration-300 bg-white/80 backdrop-blur-sm'
                  placeholder="10-digit number"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.3 }}
                className='w-full'
              >
                <label htmlFor="specialization" className='block text-gray-700 mb-3 font-semibold'>Specialization *</label>
                <motion.select
                  whileFocus={{ scale: 1.02, boxShadow: "0 0 0 3px rgba(20, 184, 166, 0.1)" }}
                  id="specialization"
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleChange}
                  required
                  className='w-full border-2 border-gray-200 rounded-xl p-4 outline-none focus:ring-0 focus:border-teal-500 transition-all duration-300 bg-white/80 backdrop-blur-sm'
                >
                  {specializations.map(spec => (
                    <option key={spec.key} value={spec.label}>
                      {spec.label}
                    </option>
                  ))}
                </motion.select>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.5 }}
            className='bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-2xl shadow-lg border border-indigo-100'
          >
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.1, duration: 0.4 }}
              className='text-2xl font-bold text-indigo-800 mb-6 pb-3 border-b border-indigo-200 flex items-center'
            >
              <motion.span
                whileHover={{ scale: 1.1 }}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-2 rounded-lg mr-3 shadow-md"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                </svg>
              </motion.span>
              Professional Information
            </motion.h2>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.3 }}
                className='w-full'
              >
                <label htmlFor="experience" className='block text-gray-700 mb-3 font-semibold'>Years of Experience *</label>
                <motion.input
                  whileFocus={{ scale: 1.02, boxShadow: "0 0 0 3px rgba(99, 102, 241, 0.1)" }}
                  type="number"
                  id="experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  min="0"
                  required
                  className='w-full border-2 border-gray-200 rounded-xl p-4 outline-none focus:ring-0 focus:border-indigo-500 transition-all duration-300 bg-white/80 backdrop-blur-sm'
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3, duration: 0.3 }}
                className='w-full'
              >
                <label htmlFor="hospital" className='block text-gray-700 mb-3 font-semibold'>Hospital/Clinic</label>
                <motion.input
                  whileFocus={{ scale: 1.02, boxShadow: "0 0 0 3px rgba(99, 102, 241, 0.1)" }}
                  type="text"
                  id="hospital"
                  name="hospital"
                  value={formData.hospital}
                  onChange={handleChange}
                  className='w-full border-2 border-gray-200 rounded-xl p-4 outline-none focus:ring-0 focus:border-indigo-500 transition-all duration-300 bg-white/80 backdrop-blur-sm'
                  placeholder="Medical Center Name"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4, duration: 0.3 }}
                className='w-full'
              >
                <label htmlFor="licenseNumber" className='block text-gray-700 mb-3 font-semibold'>Medical License Number *</label>
                <motion.input
                  whileFocus={{ scale: 1.02, boxShadow: "0 0 0 3px rgba(99, 102, 241, 0.1)" }}
                  type="text"
                  id="licenseNumber"
                  name="licenseNumber"
                  value={formData.licenseNumber}
                  onChange={handleChange}
                  required
                  className='w-full border-2 border-gray-200 rounded-xl p-4 outline-none focus:ring-0 focus:border-indigo-500 transition-all duration-300 bg-white/80 backdrop-blur-sm'
                  placeholder="License ID"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.3 }}
                className='w-full'
              >
                <label htmlFor="fee" className='block text-gray-700 mb-3 font-semibold'>Consultation Fee (₹) *</label>
                <div className="relative">
                  <span className="absolute left-4 top-4 text-gray-500">₹</span>
                  <motion.input
                    whileFocus={{ scale: 1.02, boxShadow: "0 0 0 3px rgba(99, 102, 241, 0.1)" }}
                    type="number"
                    id="fee"
                    name="fee"
                    value={formData.fee}
                    onChange={handleChange}
                    min="0"
                    required
                    className='w-full border-2 border-gray-200 rounded-xl pl-10 p-4 outline-none focus:ring-0 focus:border-indigo-500 transition-all duration-300 bg-white/80 backdrop-blur-sm'
                  />
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 0.3 }}
              className='w-full mt-6'
            >
              <label htmlFor="availability" className='block text-gray-700 mb-3 font-semibold'>Availability *</label>
              <motion.textarea
                whileFocus={{ scale: 1.02, boxShadow: "0 0 0 3px rgba(99, 102, 241, 0.1)" }}
                id="availability"
                name="availability"
                value={formData.availability}
                onChange={handleChange}
                required
                placeholder="Example: Mon-Fri 9AM-5PM, Sat 9AM-1PM"
                className='w-full border-2 border-gray-200 rounded-xl p-4 outline-none focus:ring-0 focus:border-indigo-500 transition-all duration-300 bg-white/80 backdrop-blur-sm'
                rows="3"
              />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.7, duration: 0.5 }}
            className='bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-2xl shadow-lg border border-indigo-100'
          >
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.8, duration: 0.4 }}
              className='text-2xl font-bold text-indigo-800 mb-6 pb-3 border-b border-indigo-200 flex items-center'
            >
              <motion.span
                whileHover={{ scale: 1.1 }}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-2 rounded-lg mr-3 shadow-md"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              </motion.span>
              Account Security
            </motion.h2>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.9, duration: 0.3 }}
                className='w-full'
              >
                <label htmlFor="password" className='block text-gray-700 mb-3 font-semibold'>Password *</label>
                <motion.input
                  whileFocus={{ scale: 1.02, boxShadow: "0 0 0 3px rgba(99, 102, 241, 0.1)" }}
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength="6"
                  className='w-full border-2 border-gray-200 rounded-xl p-4 outline-none focus:ring-0 focus:border-indigo-500 transition-all duration-300 bg-white/80 backdrop-blur-sm'
                  placeholder="Minimum 6 characters"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.0, duration: 0.3 }}
                className='w-full'
              >
                <label htmlFor="confirmPassword" className='block text-gray-700 mb-3 font-semibold'>Confirm Password *</label>
                <motion.input
                  whileFocus={{ scale: 1.02, boxShadow: "0 0 0 3px rgba(99, 102, 241, 0.1)" }}
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className='w-full border-2 border-gray-200 rounded-xl p-4 outline-none focus:ring-0 focus:border-indigo-500 transition-all duration-300 bg-white/80 backdrop-blur-sm'
                  placeholder="Re-enter your password"
                />
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.1, duration: 0.5 }}
            className='mt-10 flex flex-col items-center space-y-6'
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(0,0,0,0.2)" }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={isSubmitting}
              className='w-full md:w-1/2 bg-gradient-to-r from-teal-600 to-indigo-600 hover:from-teal-700 hover:to-indigo-700 text-white text-xl font-bold py-4 px-8 rounded-2xl transition-all duration-300 shadow-lg disabled:opacity-60 disabled:cursor-not-allowed'
            >
              {isSubmitting ? 'Registering...' : 'Complete Registration'}
            </motion.button>
          </motion.div>
        </form>
      </motion.div>
    </main>
  );
};

export default DoctorRegister;