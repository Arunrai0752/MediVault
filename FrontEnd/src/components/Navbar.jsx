import React, { useEffect, useState } from 'react';
import { SiAsciidoctor } from "react-icons/si";
import { CiUser, CiLogout, CiLogin } from "react-icons/ci";
import { IoMdMenu } from "react-icons/io";
import { FaUserMd, FaUserInjured, FaStethoscope } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";
import { useAuth } from '../Context/authContext';


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
        console.error("Error parsing user data:", error);
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
    <nav className="sticky top-0 z-50 bg-white shadow-md border-b border-teal-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo and Navigation */}
          <div className="flex items-center space-x-6">
            {/* Logo */}
            <Link 
              to="/" 
              className="flex-shrink-0 flex items-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="flex items-center bg-teal-50 p-2 rounded-lg">
                <SiAsciidoctor className="h-8 w-8 text-teal-600" />
                <span className="ml-2 text-xl font-bold text-teal-700 hidden sm:block">
                  MediVault
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <Link
                to="/"
                className="text-teal-800 hover:text-teal-600 px-3 py-2 text-sm font-medium transition-colors flex items-center"
              >
                <FaStethoscope className="mr-1 text-teal-600" />
                Home
              </Link>

              {isLoggedIn && (
                <Link
                  to={userData?.role === "Doctor" ? "/doctordash" : "/patientDashboard"}
                  className="text-teal-800 hover:text-teal-600 px-3 py-2 text-sm font-medium transition-colors flex items-center"
                >
                  <CiUser className="mr-1 h-5 w-5" />
                  My Dashboard
                </Link>
              )}
            </div>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            {!isLoggedIn ? (
              <>
                <Link
                  to="/login"
                  className="flex items-center bg-teal-50 text-teal-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-teal-100 transition-all border border-teal-200"
                >
                  <CiLogin className="mr-2" />
                  Login
                </Link>

              
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <div className="flex items-center bg-teal-50 px-3 py-1 rounded-full">
                  <CiUser className="text-teal-600 mr-2" />
                  <span className="text-sm text-teal-700">
                    {userData?.name || userData?.email}
                  </span>
                </div>
                
                <button
                  onClick={handleLogout}
                  className="flex items-center bg-gray-100 text-gray-700 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-200 transition-all"
                  title="Logout"
                >
                  <CiLogout className="h-5 w-5" />
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-teal-600 hover:text-teal-800 hover:bg-teal-50"
            >
              <IoMdMenu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-teal-100 shadow-inner">
          <div className="px-4 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-teal-800 hover:text-teal-600 hover:bg-teal-50"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            
            {!isLoggedIn ? (
              <>
                <Link
                  to="/login"
                  className="flex items-center px-3 py-2 rounded-md text-base font-medium text-teal-700 hover:text-teal-600 hover:bg-teal-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <CiLogin className="mr-2" />
                  Login
                </Link>
                
                <div className="border-t border-teal-100 pt-2 mt-2">
                  <div className="px-3 py-1 text-xs text-teal-500 uppercase font-semibold">Register as:</div>
                  <Link
                    to="/doctorregister"
                    className="flex items-center px-3 py-2 rounded-md text-base font-medium text-teal-700 hover:text-teal-600 hover:bg-teal-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <FaUserMd className="mr-2" />
                    Doctor
                  </Link>
                  <Link
                    to="/register"
                    className="flex items-center px-3 py-2 rounded-md text-base font-medium text-teal-700 hover:text-teal-600 hover:bg-teal-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <FaUserInjured className="mr-2" />
                    Patient
                  </Link>
                </div>
              </>
            ) : (
              <>
                <div className="px-3 py-2 text-sm text-teal-600 border-b border-teal-100">
                  Welcome, {userData?.name || userData?.email}
                </div>
                <Link
                  to={userData?.role === "Doctor" ? "/doctordash" : "/patientDashboard"}
                  className="flex items-center px-3 py-2 rounded-md text-base font-medium text-teal-800 hover:text-teal-600 hover:bg-teal-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <CiUser className="mr-2" />
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full text-left px-3 py-2 rounded-md text-base font-medium text-teal-800 hover:text-teal-600 hover:bg-teal-50"
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