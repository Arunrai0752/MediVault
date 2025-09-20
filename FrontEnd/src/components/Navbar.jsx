import React, { useEffect, useState } from 'react';
import { SiAsciidoctor } from "react-icons/si";
import { CiUser, CiLogout, CiLogin } from "react-icons/ci";
import { IoMdMenu } from "react-icons/io";
import { FaUserMd, FaUserInjured, FaStethoscope } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";
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
    primary: "bg-green-600 hover:bg-green-700",
    secondary: "bg-green-50 text-green-800 border-green-200",
    accent: "text-green-600",
    border: "border-green-200",
    gradient: "from-green-50 via-green-100 to-green-200",
    text: "text-green-700"
  },
  "Dentist": {
    primary: "bg-blue-600 hover:bg-blue-700",
    secondary: "bg-blue-50 text-blue-800 border-blue-200",
    accent: "text-blue-600",
    border: "border-blue-200",
    gradient: "from-blue-50 via-blue-100 to-blue-200",
    text: "text-blue-700"
  },
  "Cardiologist": {
    primary: "bg-red-600 hover:bg-red-700",
    secondary: "bg-red-50 text-red-800 border-red-200",
    accent: "text-red-600",
    border: "border-red-200",
    gradient: "from-red-50 via-red-100 to-red-200",
    text: "text-red-700"
  },
  "Dermatologist": {
    primary: "bg-pink-600 hover:bg-pink-700",
    secondary: "bg-pink-50 text-pink-800 border-pink-200",
    accent: "text-pink-600",
    border: "border-pink-200",
    gradient: "from-pink-50 via-pink-100 to-pink-200",
    text: "text-pink-700"
  },
  "ENT": {
    primary: "bg-yellow-600 hover:bg-yellow-700",
    secondary: "bg-yellow-50 text-yellow-800 border-yellow-200",
    accent: "text-yellow-600",
    border: "border-yellow-200",
    gradient: "from-yellow-50 via-yellow-100 to-yellow-200",
    text: "text-yellow-700"
  },
  "Orthopedic": {
    primary: "bg-purple-600 hover:bg-purple-700",
    secondary: "bg-purple-50 text-purple-800 border-purple-200",
    accent: "text-purple-600",
    border: "border-purple-200",
    gradient: "from-purple-50 via-purple-100 to-purple-200",
    text: "text-purple-700"
  },
  "Pediatrician": {
    primary: "bg-cyan-600 hover:bg-cyan-700",
    secondary: "bg-cyan-50 text-cyan-800 border-cyan-200",
    accent: "text-cyan-600",
    border: "border-cyan-200",
    gradient: "from-cyan-50 via-cyan-100 to-cyan-200",
    text: "text-cyan-700"
  },
  "Psychiatrist": {
    primary: "bg-teal-600 hover:bg-teal-700",
    secondary: "bg-teal-50 text-teal-800 border-teal-200",
    accent: "text-teal-600",
    border: "border-teal-200",
    gradient: "from-teal-50 via-teal-100 to-teal-200",
    text: "text-teal-700"
  },
  "Gynecologist": {
    primary: "bg-fuchsia-600 hover:bg-fuchsia-700",
    secondary: "bg-fuchsia-50 text-fuchsia-800 border-fuchsia-200",
    accent: "text-fuchsia-600",
    border: "border-fuchsia-200",
    gradient: "from-fuchsia-50 via-fuchsia-100 to-fuchsia-200",
    text: "text-fuchsia-700"
  },
  "Neurologist": {
    primary: "bg-violet-600 hover:bg-violet-700",
    secondary: "bg-violet-50 text-violet-800 border-violet-200",
    accent: "text-violet-600",
    border: "border-violet-200",
    gradient: "from-violet-50 via-violet-100 to-violet-200",
    text: "text-violet-700"
  },
  "Ophthalmologist": {
    primary: "bg-amber-600 hover:bg-amber-700",
    secondary: "bg-amber-50 text-amber-800 border-amber-200",
    accent: "text-amber-600",
    border: "border-amber-200",
    gradient: "from-amber-50 via-amber-100 to-amber-200",
    text: "text-amber-700"
  },
  "Oncologist": {
    primary: "bg-rose-600 hover:bg-rose-700",
    secondary: "bg-rose-50 text-rose-800 border-rose-200",
    accent: "text-rose-600",
    border: "border-rose-200",
    gradient: "from-rose-50 via-rose-100 to-rose-200",
    text: "text-rose-700"
  },
  "Pulmonologist": {
    primary: "bg-emerald-600 hover:bg-emerald-700",
    secondary: "bg-emerald-50 text-emerald-800 border-emerald-200",
    accent: "text-emerald-600",
    border: "border-emerald-200",
    gradient: "from-emerald-50 via-emerald-100 to-emerald-200",
    text: "text-emerald-700"
  },
  "Urologist": {
    primary: "bg-lime-600 hover:bg-lime-700",
    secondary: "bg-lime-50 text-lime-800 border-lime-200",
    accent: "text-lime-600",
    border: "border-lime-200",
    gradient: "from-lime-50 via-lime-100 to-lime-200",
    text: "text-lime-700"
  },
  "Gastroenterologist": {
    primary: "bg-sky-600 hover:bg-sky-700",
    secondary: "bg-sky-50 text-sky-800 border-sky-200",
    accent: "text-sky-600",
    border: "border-sky-200",
    gradient: "from-sky-50 via-sky-100 to-sky-200",
    text: "text-sky-700"
  },
  "Nephrologist": {
    primary: "bg-orange-600 hover:bg-orange-700",
    secondary: "bg-orange-50 text-orange-800 border-orange-200",
    accent: "text-orange-600",
    border: "border-orange-200",
    gradient: "from-orange-50 via-orange-100 to-orange-200",
    text: "text-orange-700"
  },
  "Endocrinologist": {
    primary: "bg-fuchsia-600 hover:bg-fuchsia-700",
    secondary: "bg-fuchsia-50 text-fuchsia-800 border-fuchsia-200",
    accent: "text-fuchsia-600",
    border: "border-fuchsia-200",
    gradient: "from-fuchsia-50 via-fuchsia-100 to-fuchsia-200",
    text: "text-fuchsia-700"
  },
  "Hematologist": {
    primary: "bg-red-600 hover:bg-red-700",
    secondary: "bg-red-50 text-red-800 border-red-200",
    accent: "text-red-600",
    border: "border-red-200",
    gradient: "from-red-50 via-red-100 to-red-200",
    text: "text-red-700"
  },
  "Rheumatologist": {
    primary: "bg-purple-600 hover:bg-purple-700",
    secondary: "bg-purple-50 text-purple-800 border-purple-200",
    accent: "text-purple-600",
    border: "border-purple-200",
    gradient: "from-purple-50 via-purple-100 to-purple-200",
    text: "text-purple-700"
  },
  "Plastic Surgeon": {
    primary: "bg-pink-600 hover:bg-pink-700",
    secondary: "bg-pink-50 text-pink-800 border-pink-200",
    accent: "text-pink-600",
    border: "border-pink-200",
    gradient: "from-pink-50 via-pink-100 to-pink-200",
    text: "text-pink-700"
  },
  "Anesthesiologist": {
    primary: "bg-gray-600 hover:bg-gray-700",
    secondary: "bg-gray-50 text-gray-800 border-gray-200",
    accent: "text-gray-600",
    border: "border-gray-200",
    gradient: "from-gray-50 via-gray-100 to-gray-200",
    text: "text-gray-700"
  },
  "Radiologist": {
    primary: "bg-blue-600 hover:bg-blue-700",
    secondary: "bg-blue-50 text-blue-800 border-blue-200",
    accent: "text-blue-600",
    border: "border-blue-200",
    gradient: "from-blue-50 via-blue-100 to-blue-200",
    text: "text-blue-700"
  },
  "Pathologist": {
    primary: "bg-indigo-600 hover:bg-indigo-700",
    secondary: "bg-indigo-50 text-indigo-800 border-indigo-200",
    accent: "text-indigo-600",
    border: "border-indigo-200",
    gradient: "from-indigo-50 via-indigo-100 to-indigo-200",
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
    toast.success("Logged out successfully");
    navigate("/");
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

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