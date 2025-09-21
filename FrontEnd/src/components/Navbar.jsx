import React, { useEffect, useState } from 'react';
import { SiAsciidoctor } from "react-icons/si";
import { CiUser, CiLogout, CiLogin } from "react-icons/ci";
import { IoMdMenu } from "react-icons/io";
import { FaUserMd, FaUserInjured, FaStethoscope } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/authContext';
import { RiServiceLine } from "react-icons/ri";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const { user } = useAuth();

const  specialization =  user.specialization ||  "General Physician" ;
const specializationThemes = {
  "General Physician": {
    primary: "bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 shadow-lg",
    secondary: "bg-emerald-50 text-emerald-800 border-emerald-200",
    accent: "text-emerald-600",
    border: "border-emerald-200",
    gradient: "from-emerald-50 via-green-50 to-teal-50",
    text: "text-emerald-700"
  },
  "Dentist": {
    primary: "bg-gradient-to-r from-blue-500 to-sky-600 hover:from-blue-600 hover:to-sky-700 shadow-lg",
    secondary: "bg-blue-50 text-blue-800 border-blue-200",
    accent: "text-blue-600",
    border: "border-blue-200",
    gradient: "from-blue-50 via-sky-50 to-cyan-50",
    text: "text-blue-700"
  },
  "Cardiologist": {
    primary: "bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 shadow-lg",
    secondary: "bg-red-50 text-red-800 border-red-200",
    accent: "text-red-600",
    border: "border-red-200",
    gradient: "from-red-50 via-rose-50 to-pink-50",
    text: "text-red-700"
  },
  "Dermatologist": {
    primary: "bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 shadow-lg",
    secondary: "bg-pink-50 text-pink-800 border-pink-200",
    accent: "text-pink-600",
    border: "border-pink-200",
    gradient: "from-pink-50 via-rose-50 to-fuchsia-50",
    text: "text-pink-700"
  },
  "ENT": {
    primary: "bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 shadow-lg",
    secondary: "bg-amber-50 text-amber-800 border-amber-200",
    accent: "text-amber-600",
    border: "border-amber-200",
    gradient: "from-amber-50 via-yellow-50 to-orange-50",
    text: "text-amber-700"
  },
  "Orthopedic": {
    primary: "bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 shadow-lg",
    secondary: "bg-purple-50 text-purple-800 border-purple-200",
    accent: "text-purple-600",
    border: "border-purple-200",
    gradient: "from-purple-50 via-violet-50 to-indigo-50",
    text: "text-purple-700"
  },
  "Pediatrician": {
    primary: "bg-gradient-to-r from-cyan-500 to-sky-600 hover:from-cyan-600 hover:to-sky-700 shadow-lg",
    secondary: "bg-cyan-50 text-cyan-800 border-cyan-200",
    accent: "text-cyan-600",
    border: "border-cyan-200",
    gradient: "from-cyan-50 via-sky-50 to-blue-50",
    text: "text-cyan-700"
  },
  "Psychiatrist": {
    primary: "bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 shadow-lg",
    secondary: "bg-indigo-50 text-indigo-800 border-indigo-200",
    accent: "text-indigo-600",
    border: "border-indigo-200",
    gradient: "from-indigo-50 via-blue-50 to-purple-50",
    text: "text-indigo-700"
  },
  "Gynecologist": {
    primary: "bg-gradient-to-r from-fuchsia-500 to-pink-600 hover:from-fuchsia-600 hover:to-pink-700 shadow-lg",
    secondary: "bg-fuchsia-50 text-fuchsia-800 border-fuchsia-200",
    accent: "text-fuchsia-600",
    border: "border-fuchsia-200",
    gradient: "from-fuchsia-50 via-pink-50 to-rose-50",
    text: "text-fuchsia-700"
  },
  "Neurologist": {
    primary: "bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 shadow-lg",
    secondary: "bg-violet-50 text-violet-800 border-violet-200",
    accent: "text-violet-600",
    border: "border-violet-200",
    gradient: "from-violet-50 via-purple-50 to-indigo-50",
    text: "text-violet-700"
  },
  "Ophthalmologist": {
    primary: "bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 shadow-lg",
    secondary: "bg-amber-50 text-amber-800 border-amber-200",
    accent: "text-amber-600",
    border: "border-amber-200",
    gradient: "from-amber-50 via-yellow-50 to-lime-50",
    text: "text-amber-700"
  },
  "Oncologist": {
    primary: "bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 shadow-lg",
    secondary: "bg-rose-50 text-rose-800 border-rose-200",
    accent: "text-rose-600",
    border: "border-rose-200",
    gradient: "from-rose-50 via-pink-50 to-red-50",
    text: "text-rose-700"
  },
  "Pulmonologist": {
    primary: "bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 shadow-lg",
    secondary: "bg-teal-50 text-teal-800 border-teal-200",
    accent: "text-teal-600",
    border: "border-teal-200",
    gradient: "from-teal-50 via-emerald-50 to-green-50",
    text: "text-teal-700"
  },
  "Urologist": {
    primary: "bg-gradient-to-r from-lime-500 to-green-600 hover:from-lime-600 hover:to-green-700 shadow-lg",
    secondary: "bg-lime-50 text-lime-800 border-lime-200",
    accent: "text-lime-600",
    border: "border-lime-200",
    gradient: "from-lime-50 via-green-50 to-emerald-50",
    text: "text-lime-700"
  },
  "Gastroenterologist": {
    primary: "bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-lg",
    secondary: "bg-emerald-50 text-emerald-800 border-emerald-200",
    accent: "text-emerald-600",
    border: "border-emerald-200",
    gradient: "from-emerald-50 via-teal-50 to-cyan-50",
    text: "text-emerald-700"
  },
  "Nephrologist": {
    primary: "bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 shadow-lg",
    secondary: "bg-sky-50 text-sky-800 border-sky-200",
    accent: "text-sky-600",
    border: "border-sky-200",
    gradient: "from-sky-50 via-blue-50 to-indigo-50",
    text: "text-sky-700"
  },
  "Endocrinologist": {
    primary: "bg-gradient-to-r from-fuchsia-500 to-purple-600 hover:from-fuchsia-600 hover:to-purple-700 shadow-lg",
    secondary: "bg-fuchsia-50 text-fuchsia-800 border-fuchsia-200",
    accent: "text-fuchsia-600",
    border: "border-fuchsia-200",
    gradient: "from-fuchsia-50 via-purple-50 to-violet-50",
    text: "text-fuchsia-700"
  },
  "Hematologist": {
    primary: "bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 shadow-lg",
    secondary: "bg-red-50 text-red-800 border-red-200",
    accent: "text-red-600",
    border: "border-red-200",
    gradient: "from-red-50 via-rose-50 to-pink-50",
    text: "text-red-700"
  },
  "Rheumatologist": {
    primary: "bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 shadow-lg",
    secondary: "bg-purple-50 text-purple-800 border-purple-200",
    accent: "text-purple-600",
    border: "border-purple-200",
    gradient: "from-purple-50 via-violet-50 to-indigo-50",
    text: "text-purple-700"
  },
  "Plastic Surgeon": {
    primary: "bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 shadow-lg",
    secondary: "bg-pink-50 text-pink-800 border-pink-200",
    accent: "text-pink-600",
    border: "border-pink-200",
    gradient: "from-pink-50 via-rose-50 to-fuchsia-50",
    text: "text-pink-700"
  },
  "Anesthesiologist": {
    primary: "bg-gradient-to-r from-slate-500 to-gray-600 hover:from-slate-600 hover:to-gray-700 shadow-lg",
    secondary: "bg-slate-50 text-slate-800 border-slate-200",
    accent: "text-slate-600",
    border: "border-slate-200",
    gradient: "from-slate-50 via-gray-50 to-zinc-50",
    text: "text-slate-700"
  },
  "Radiologist": {
    primary: "bg-gradient-to-r from-blue-500 to-sky-600 hover:from-blue-600 hover:to-sky-700 shadow-lg",
    secondary: "bg-blue-50 text-blue-800 border-blue-200",
    accent: "text-blue-600",
    border: "border-blue-200",
    gradient: "from-blue-50 via-sky-50 to-cyan-50",
    text: "text-blue-700"
  },
  "Pathologist": {
    primary: "bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 shadow-lg",
    secondary: "bg-indigo-50 text-indigo-800 border-indigo-200",
    accent: "text-indigo-600",
    border: "border-indigo-200",
    gradient: "from-indigo-50 via-blue-50 to-purple-50",
    text: "text-indigo-700"
  }
};


  const theme = specializationThemes[specialization] || specializationThemes["General Physician"];

  const checkLoginStatus = () => {
    if (user) {
      try {
        setUserData(user);
        setIsLoggedIn(true);
      } catch (error) {
        sessionStorage.removeItem("Medi_vaultUser");
      }
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("Medi_vaultUser");
    setIsLoggedIn(false);
    setUserData(null);
    setMobileMenuOpen(false);
    navigate("/");
  };

  useEffect(() => {
    checkLoginStatus();
  }, [user]);

  return (
    <nav className={`sticky w-screen top-0 z-50 bg-white/70 backdrop-blur-md shadow-md border-b ${theme.border}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center space-x-6">
            <Link
              to="/"
              className="flex-shrink-0 flex items-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className={`flex items-center bg-gradient-to-r ${theme.gradient} p-2 rounded-xl border ${theme.border}`}>
                <SiAsciidoctor className={`h-8 w-8 ${theme.accent}`} />
                <span className={`ml-2 text-xl font-bold ${theme.text} hidden sm:block`}>
                  MediVault
                </span>
              </div>
            </Link>

            <div className="hidden md:flex items-center space-x-6">
              <Link
                to="/"
                className={`relative text-gray-700 hover:${theme.text} px-3 py-2 text-sm font-medium transition-colors flex items-center group`}
              >
                <FaStethoscope className={`mr-1 ${theme.accent}`} />
                Home
                <span className={`absolute bottom-0 left-3 right-3 h-0.5 ${theme.primary.split(' ')[0]} scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-full`}></span>
              </Link>

              <Link
                to="/service"
                className={`relative text-gray-700 hover:${theme.text} px-3 py-2 text-sm font-medium transition-colors flex items-center group`}
              >
                <RiServiceLine className={`mr-1 ${theme.accent}`} />
                Services
                <span className={`absolute bottom-0 left-3 right-3 h-0.5 ${theme.primary.split(' ')[0]} scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-full`}></span>
              </Link>

              {user?.role === "Patient" && 
                <Link
                  to="/doctors"
                  className={`relative text-gray-700 hover:${theme.text} px-3 py-2 text-sm font-medium transition-colors flex items-center group`}
                >
                  <FaUserMd className={`mr-1 ${theme.accent}`} />
                  Doctors
                  <span className={`absolute bottom-0 left-3 right-3 h-0.5 ${theme.primary.split(' ')[0]} scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-full`}></span>
                </Link>
              } 
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-3">
            {!isLoggedIn ? (
              <>
                <Link
                  to="/login"
                  className={`flex items-center ${theme.primary} text-white px-4 py-2 rounded-md text-sm font-medium transition-all shadow-sm`}
                >
                  <CiLogin className="mr-2" />
                  Login
                </Link>

                <div className="flex space-x-2">
                  <Link
                    to="/doctorregister"
                    className={`flex items-center bg-white ${theme.text} px-3 py-2 rounded-md text-sm font-medium hover:${theme.secondary.split(' ')[0]} transition-all border ${theme.border}`}
                  >
                    <FaUserMd className="mr-1" />
                    Doctor
                  </Link>
                  <Link
                    to="/register"
                    className={`flex items-center ${theme.primary} text-white px-3 py-2 rounded-md text-sm font-medium transition-all shadow-sm`}
                  >
                    <FaUserInjured className="mr-1" />
                    Patient
                  </Link>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <div className={`flex items-center ${theme.secondary} px-3 py-1 rounded-full border ${theme.border}`}>
                  <CiUser className={`${theme.accent} mr-2`} />
                  <span className={`text-sm ${theme.text}`}>
                    {userData?.fullName || userData?.email}
                  </span>
                </div>

                <button
                  onClick={handleLogout}
                  className="flex items-center bg-gray-100 text-gray-700 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-200 transition-all shadow-sm"
                >
                  <CiLogout className="h-5 w-5" />
                </button>
              </div>
            )}

            {isLoggedIn && (
              <Link
                to={userData?.role === "Doctor" ? "/doctordash" : "/patientDashboard"}
                className={`relative text-gray-700 hover:${theme.text} px-3 py-2 text-sm font-medium transition-colors flex items-center group`}
              >
                <CiUser className="mr-1 h-5 w-5" />
                Dashboard
                <span className={`absolute bottom-0 left-3 right-3 h-0.5 ${theme.primary.split(' ')[0]} scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-full`}></span>
              </Link>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-md ${theme.text} hover:${theme.primary.split(' ')[0]} hover:bg-opacity-10`}
            >
              <IoMdMenu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className={`md:hidden bg-white/90 backdrop-blur-sm border-t ${theme.border} shadow-inner`}>
          <div className="px-4 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className={`block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:${theme.text} hover:${theme.secondary.split(' ')[0]}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>

            <Link
              to="/service"
              className={`block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:${theme.text} hover:${theme.secondary.split(' ')[0]}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Services
            </Link>

            <Link
              to="/doctors"
              className={`block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:${theme.text} hover:${theme.secondary.split(' ')[0]}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Doctors
            </Link>

            {!isLoggedIn ? (
              <>
                <Link
                  to="/login"
                  className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${theme.text} hover:${theme.secondary.split(' ')[0]}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <CiLogin className="mr-2" />
                  Login
                </Link>

                <div className={`border-t ${theme.border} pt-2 mt-2`}>
                  <div className={`px-3 py-1 text-xs ${theme.text} uppercase font-semibold`}>Register as:</div>
                  <Link
                    to="/doctorregister"
                    className={`flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:${theme.text} hover:${theme.secondary.split(' ')[0]}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <FaUserMd className="mr-2" />
                    Doctor
                  </Link>
                  <Link
                    to="/register"
                    className={`flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:${theme.text} hover:${theme.secondary.split(' ')[0]}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <FaUserInjured className="mr-2" />
                    Patient
                  </Link>
                </div>
              </>
            ) : (
              <>
                <div className={`px-3 py-2 text-sm ${theme.text} border-b ${theme.border}`}>
                  Welcome, {userData?.fullName || userData?.email}
                </div>
                <Link
                  to={userData?.role === "Doctor" ? "/doctordash" : "/patientDashboard"}
                  className={`flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:${theme.text} hover:${theme.secondary.split(' ')[0]}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <CiUser className="mr-2" />
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className={`flex items-center w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:${theme.text} hover:${theme.secondary.split(' ')[0]}`}
                >
                  <CiLogout className="mr-2" />
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;