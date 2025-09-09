import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../../Configs/api';
import { useAuth } from '../Context/authContext';
import { motion, AnimatePresence } from 'framer-motion';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isDoc, setIsDoc] = useState(location.state?.isDocDefault || false);
  const [formData, setFormData] = useState({ email: '', password: '' });

  const { setIsDoctor, setIsPatient, setUser } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitDoctor = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/doctors/login', formData);
      toast.success(res.data.message);
      setFormData({ email: '', password: '' });
      setUser(res.data.data);
      setIsDoctor(true);
      sessionStorage.setItem('Medi_vaultUser', JSON.stringify(res.data.data));
      navigate('/doctordash');
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleSubmitPatients = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/patients/login', formData);
      toast.success(res.data.message);
      setFormData({ email: '', password: '' });
      setUser(res.data.data);
      setIsPatient(true);
      sessionStorage.setItem('Medi_vaultUser', JSON.stringify(res.data.data));
      navigate('/patientDashboard');
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    setFormData({ email: '', password: '' });
  }, [isDoc]);

  return (
    <main className="min-h-[92vh] w-full bg-gradient-to-br from-teal-50 via-blue-50 to-white flex justify-center items-center p-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="w-full max-w-md h-[60vh] bg-white/90 backdrop-blur-sm rounded-xl shadow-md overflow-hidden border border-teal-100"
      >
        <div className="flex border-b border-teal-200">
          <button
            className={`flex-1 py-4 flex items-center justify-center gap-2 transition-colors ${
              isDoc ? 'bg-teal-600 text-white' : 'bg-white text-teal-800'
            }`}
            onClick={() => setIsDoc(true)}
          >
            <span className="font-medium">Doctor</span>
          </button>

          <button
            className={`flex-1 py-4 flex items-center justify-center gap-2 transition-colors ${
              !isDoc ? 'bg-teal-600 text-white' : 'bg-white text-teal-800'
            }`}
            onClick={() => setIsDoc(false)}
          >
            <span className="font-medium">Patient</span>
          </button>
        </div>

        <AnimatePresence mode="wait">
          {isDoc ? (
            <motion.div
              key="doctor"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid w-full items-center px-10">
                <div className="grid p-4">
                  <label className="p-2 text-teal-700">Email :</label>
                  <input
                    type="email"
                    placeholder="Enter Your Email"
                    name="email"
                    onChange={handleChange}
                    value={formData.email}
                    className="border border-teal-200 outline-teal-500 rounded-lg p-2 bg-teal-50"
                  />
                </div>
                <div className="grid p-4">
                  <label className="p-2 text-teal-700">Password :</label>
                  <input
                    type="password"
                    placeholder="Enter Your Password"
                    name="password"
                    onChange={handleChange}
                    value={formData.password}
                    className="border border-teal-200 outline-teal-500 rounded-lg p-2 bg-teal-50"
                  />
                </div>
              </div>

              <div className="grid w-full justify-center items-center p-10">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="rounded-lg p-2 w-[200px] bg-teal-600 text-white hover:bg-teal-700 transition-colors"
                  onClick={handleSubmitDoctor}
                >
                  LogIn
                </motion.button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="patient"
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 100, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid w-full items-center px-10">
                <div className="grid p-4">
                  <label className="p-2 text-teal-700">Email :</label>
                  <input
                    type="email"
                    placeholder="Enter Your Email"
                    name="email"
                    onChange={handleChange}
                    value={formData.email}
                    className="border border-teal-200 outline-teal-500 rounded-lg p-2 bg-teal-50"
                  />
                </div>
                <div className="grid p-4">
                  <label className="p-2 text-teal-700">Password :</label>
                  <input
                    type="password"
                    placeholder="Enter Your Password"
                    name="password"
                    onChange={handleChange}
                    value={formData.password}
                    className="border border-teal-200 outline-teal-500 rounded-lg p-2 bg-teal-50"
                  />
                </div>
              </div>

              <div className="grid w-full justify-center items-center p-10">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="rounded-lg p-2 w-[200px] bg-teal-600 text-white hover:bg-teal-700 transition-colors"
                  onClick={handleSubmitPatients}
                >
                  LogIn
                </motion.button>
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-center text-teal-700 hover:text-teal-900 cursor-pointer transition-colors"
              >
                Forgot password ?
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </main>
  );
};

export default Login;
