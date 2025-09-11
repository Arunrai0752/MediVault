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
  const {user} = useAuth();

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
    <nav className="absolute fixed w-screen top-0 z-50 bg-white/70 backdrop-blur-md shadow-md border-b border-teal-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center space-x-6">
            <Link 
              to="/" 
              className="flex-shrink-0 flex items-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="flex items-center bg-gradient-to-r from-teal-50 to-blue-50 p-2 rounded-xl border border-teal-100">
                <SiAsciidoctor className="h-8 w-8 text-teal-600" />
                <span className="ml-2 text-xl font-bold text-teal-700 hidden sm:block">
                  MediVault
                </span>
              </div>
            </Link>

            <div className="hidden md:flex items-center space-x-6">
              <Link
                to="/"
                className="relative text-gray-700 hover:text-teal-700 px-3 py-2 text-sm font-medium transition-colors flex items-center group"
              >
                <FaStethoscope className="mr-1 text-teal-600" />
                Home
                <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-teal-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-full"></span>
              </Link>

              <Link
                to="/service"
                className="relative text-gray-700 hover:text-teal-700 px-3 py-2 text-sm font-medium transition-colors flex items-center group"
              >
                <RiServiceLine className="mr-1 text-teal-600" />
                Services
                <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-teal-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-full"></span>
              </Link>

              <Link
                to="/doctors"
                className="relative text-gray-700 hover:text-teal-700 px-3 py-2 text-sm font-medium transition-colors flex items-center group"
              >
                <FaUserMd className="mr-1 text-teal-600" />
                Doctors
                <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-teal-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-full"></span>
              </Link>

            
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-3">
            {!isLoggedIn ? (
              <>
                <Link
                  to="/login"
                  className="flex items-center bg-teal-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-teal-700 transition-all shadow-sm"
                >
                  <CiLogin className="mr-2" />
                  Login
                </Link>
                
                <div className="flex space-x-2">
                  <Link
                    to="/doctorregister"
                    className="flex items-center bg-white text-teal-700 px-3 py-2 rounded-md text-sm font-medium hover:bg-teal-50 transition-all border border-teal-200"
                  >
                    <FaUserMd className="mr-1" />
                    Doctor
                  </Link>
                  <Link
                    to="/register"
                    className="flex items-center bg-blue-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-all shadow-sm"
                  >
                    <FaUserInjured className="mr-1" />
                    Patient
                  </Link>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <div className="flex items-center bg-teal-50 px-3 py-1 rounded-full border border-teal-100">
                  <CiUser className="text-teal-700 mr-2" />
                  <span className="text-sm text-teal-800">
                  Dr.  {userData?.fullName || userData?.email}
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
                  className="relative text-gray-700 hover:text-teal-700 px-3 py-2 text-sm font-medium transition-colors flex items-center group"
                >
                  <CiUser className="mr-1 h-5 w-5" />
                  Dashboard
                  <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-teal-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-full"></span>
                </Link>
              )}
          </div>

          

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-teal-700 hover:text-teal-900 hover:bg-teal-50"
            >
              <IoMdMenu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white/90 backdrop-blur-sm border-t border-teal-100 shadow-inner">
          <div className="px-4 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-teal-700 hover:bg-teal-50"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            
            <Link
              to="/service"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-teal-700 hover:bg-teal-50"
              onClick={() => setMobileMenuOpen(false)}
            >
              Services
            </Link>

            <Link
              to="/doctors"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-teal-700 hover:bg-teal-50"
              onClick={() => setMobileMenuOpen(false)}
            >
              Doctors
            </Link>
            
            {!isLoggedIn ? (
              <>
                <Link
                  to="/login"
                  className="flex items-center px-3 py-2 rounded-md text-base font-medium text-teal-700 hover:text-teal-800 hover:bg-teal-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <CiLogin className="mr-2" />
                  Login
                </Link>
                
                <div className="border-t border-teal-100 pt-2 mt-2">
                  <div className="px-3 py-1 text-xs text-teal-600 uppercase font-semibold">Register as:</div>
                  <Link
                    to="/doctorregister"
                    className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-teal-700 hover:bg-teal-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <FaUserMd className="mr-2" />
                    Doctor
                  </Link>
                  <Link
                    to="/register"
                    className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-teal-700 hover:bg-teal-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <FaUserInjured className="mr-2" />
                    Patient
                  </Link>
                </div>
              </>
            ) : (
              <>
                <div className="px-3 py-2 text-sm text-teal-700 border-b border-teal-100">
                  Welcome, {userData?.fullNAme || userData?.email}
                </div>
                <Link
                  to={userData?.role === "Doctor" ? "/doctordash" : "/patientDashboard"}
                  className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-teal-700 hover:bg-teal-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <CiUser className="mr-2" />
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-teal-700 hover:bg-teal-50"
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