import React, { useEffect, useState } from 'react';
import { SiAsciidoctor } from "react-icons/si";
import { CiUser, CiLogout, CiLogin, CiSettings } from "react-icons/ci";
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

  const getProfileRoute = (specialization) => {
    switch (specialization) {
      case "General Physician":
        return "/GpProfile";
      case "Dentist":
        return "/DentistProfile";
      case "Cardiologist":
        return "/CardiologistProfile";
      case "Dermatologist":
        return "/DermatologistProfile";
      case "ENT":
        return "/ENTProfile";
      case "Orthopedic":
        return "/OrthopedicProfile";
      case "Pediatrician":
        return "/PediatricianProfile";
      case "Psychiatrist":
        return "/PsychiatristProfile";
      case "Gynecologist":
        return "/GynecologistProfile";
      case "Neurologist":
        return "/NeurologistProfile";
      case "Ophthalmologist":
        return "/OphthalmologistProfile";
      case "Oncologist":
        return "/OncologistProfile";
      case "Pulmonologist":
        return "/PulmonologistProfile";
      case "Urologist":
        return "/UrologistProfile";
      case "Gastroenterologist":
        return "/GastroenterologistProfile";
      case "Nephrologist":
        return "/NephrologistProfile";
      case "Endocrinologist":
        return "/EndocrinologistProfile";
      case "Hematologist":
        return "/HematologistProfile";
      case "Rheumatologist":
        return "/RheumatologistProfile";
      case "Plastic Surgeon":
        return "/PlasticSurgeonProfile";
      case "Anesthesiologist":
        return "/AnesthesiologistProfile";
      case "Radiologist":
        return "/RadiologistProfile";
      case "Pathologist":
        return "/PathologistProfile";
      case "Other":
        return "/DoctorProfile";
      default:
        return "/DoctorProfile";
    }
  };

  const handleProfileClick = () => {
    if (userData?.role === "Doctor") {
      const profileRoute = getProfileRoute(userData?.specialization);
      navigate(profileRoute);
    } else {
      navigate("/patientProfile");
    }
    setMobileMenuOpen(false);
  };

  const handleDashboard = () => {
    if (userData?.role === "Doctor") {
      navigate("/GpDashboard");
    } else {
      navigate("/patientDashboard");
    }
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    checkLoginStatus();
  }, [user]);

  return (
    <nav className="sticky w-screen top-0 z-50 bg-white/70 backdrop-blur-md shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center space-x-6">
            <Link
              to="/"
              className="flex-shrink-0 flex items-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="flex items-center bg-gradient-to-r from-blue-50 to-cyan-50 p-2 rounded-xl border border-blue-100">
                <SiAsciidoctor className="h-8 w-8 text-blue-600" />
                <span className="ml-2 text-xl font-bold text-blue-700 hidden sm:block">
                  MediVault
                </span>
              </div>
            </Link>

            <div className="hidden md:flex items-center space-x-6">
              <Link
                to="/"
                className="relative text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors flex items-center group"
              >
                <FaStethoscope className="mr-1 text-blue-500" />
                Home
                <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-full"></span>
              </Link>

              <Link
                to="/service"
                className="relative text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors flex items-center group"
              >
                <RiServiceLine className="mr-1 text-blue-500" />
                Services
                <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-full"></span>
              </Link>

              {user?.role === "Patient" && 
                <Link
                  to="/doctors"
                  className="relative text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors flex items-center group"
                >
                  <FaUserMd className="mr-1 text-blue-500" />
                  Doctors
                  <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-full"></span>
                </Link>
              } 
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-3">
            {!isLoggedIn ? (
              <>
                <Link
                  to="/login"
                  className="flex items-center bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-all shadow-sm shadow-blue-200"
                >
                  <CiLogin className="mr-2" />
                  Login
                </Link>

                <div className="flex space-x-2">
                  <Link
                    to="/doctorregister"
                    className="flex items-center bg-white text-blue-700 px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-50 transition-all border border-blue-200"
                  >
                    <FaUserMd className="mr-1" />
                    Doctor
                  </Link>
                  <Link
                    to="/register"
                    className="flex items-center bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white px-3 py-2 rounded-md text-sm font-medium transition-all shadow-sm shadow-blue-200"
                  >
                    <FaUserInjured className="mr-1" />
                    Patient
                  </Link>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <div className="flex items-center bg-blue-50 text-blue-800 px-3 py-1 rounded-full border border-blue-200">
                  <CiUser className="text-blue-600 mr-2" />
                  <span className="text-sm text-blue-700">
                    {userData?.fullName || userData?.email}
                  </span>
                </div>

                <button
                  onClick={handleProfileClick}
                  className="flex items-center bg-blue-50 text-blue-700 px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-100 transition-all border border-blue-200 shadow-sm"
                >
                  <CiSettings className="mr-2 text-blue-600" />
                  Profile
                </button>

                <button
                  onClick={handleDashboard}
                  className="flex items-center bg-blue-500 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-600 transition-all shadow-sm"
                >
                  <CiUser className="mr-2" />
                  Dashboard
                </button>

                <button
                  onClick={handleLogout}
                  className="flex items-center bg-gray-100 text-gray-700 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-200 transition-all shadow-sm"
                >
                  <CiLogout className="h-5 w-5" />
                </button>
              </div>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-blue-600 hover:bg-blue-50"
            >
              <IoMdMenu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white/90 backdrop-blur-sm border-t border-blue-200 shadow-inner">
          <div className="px-4 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>

            <Link
              to="/service"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50"
              onClick={() => setMobileMenuOpen(false)}
            >
              Services
            </Link>

            <Link
              to="/doctors"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50"
              onClick={() => setMobileMenuOpen(false)}
            >
              Doctors
            </Link>

            {!isLoggedIn ? (
              <>
                <Link
                  to="/login"
                  className="flex items-center px-3 py-2 rounded-md text-base font-medium text-blue-700 hover:bg-blue-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <CiLogin className="mr-2" />
                  Login
                </Link>

                <div className="border-t border-blue-200 pt-2 mt-2">
                  <div className="px-3 py-1 text-xs text-blue-600 uppercase font-semibold">Register as:</div>
                  <Link
                    to="/doctorregister"
                    className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <FaUserMd className="mr-2" />
                    Doctor
                  </Link>
                  <Link
                    to="/register"
                    className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <FaUserInjured className="mr-2" />
                    Patient
                  </Link>
                </div>
              </>
            ) : (
              <>
                <div className="px-3 py-2 text-sm text-blue-700 border-b border-blue-200">
                  <div>Welcome, {userData?.fullName || userData?.email}</div>
                  {userData?.specialization && (
                    <div className="text-xs text-blue-600 mt-1 bg-blue-100 px-2 py-1 rounded-full inline-block">
                      {userData.specialization}
                    </div>
                  )}
                </div>
                
                <button
                  onClick={handleProfileClick}
                  className="flex items-center w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                >
                  <CiSettings className="mr-2" />
                  Profile
                </button>

                <button
                  onClick={handleDashboard}
                  className="flex items-center w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                >
                  <CiUser className="mr-2" />
                  Dashboard
                </button>

                <button
                  onClick={handleLogout}
                  className="flex items-center w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50"
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