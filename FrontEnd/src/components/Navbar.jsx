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
    <nav className="sticky top-0 z-50 bg-white shadow-md border-b border-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center space-x-6">
            <Link 
              to="/" 
              className="flex-shrink-0 flex items-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="flex items-center bg-blue-50 p-2 rounded-lg">
                <SiAsciidoctor className="h-8 w-8 text-blue-600" />
                <span className="ml-2 text-xl font-bold text-blue-700 hidden sm:block">
                  MediVault
                </span>
              </div>
            </Link>

            <div className="hidden md:flex items-center space-x-6">
              <Link
                to="/"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors flex items-center"
              >
                <FaStethoscope className="mr-1 text-blue-500" />
                Home
              </Link>

              <Link
                to="/service"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors flex items-center"
              >
                <RiServiceLine className="mr-1 text-blue-500" />
                Services
              </Link>

              {isLoggedIn && (
                <Link
                  to={userData?.role === "Doctor" ? "/doctordash" : "/patientDashboard"}
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors flex items-center"
                >
                  <CiUser className="mr-1 h-5 w-5" />
                  Dashboard
                </Link>
              )}
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-3">
            {!isLoggedIn ? (
              <>
                <Link
                  to="/login"
                  className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-all"
                >
                  <CiLogin className="mr-2" />
                  Login
                </Link>
                
                <div className="flex space-x-2">
                  <Link
                    to="/doctorregister"
                    className="flex items-center bg-white text-blue-600 px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-50 transition-all border border-blue-200"
                  >
                    <FaUserMd className="mr-1" />
                    Doctor
                  </Link>
                  <Link
                    to="/register"
                    className="flex items-center bg-teal-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-teal-700 transition-all"
                  >
                    <FaUserInjured className="mr-1" />
                    Patient
                  </Link>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <div className="flex items-center bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                  <CiUser className="text-blue-600 mr-2" />
                  <span className="text-sm text-blue-700">
                    {userData?.name || userData?.email}
                  </span>
                </div>
                
                <button
                  onClick={handleLogout}
                  className="flex items-center bg-gray-100 text-gray-700 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-200 transition-all"
                >
                  <CiLogout className="h-5 w-5" />
                </button>
              </div>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-blue-600 hover:text-blue-800 hover:bg-blue-50"
            >
              <IoMdMenu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-blue-100 shadow-inner">
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
            
            {!isLoggedIn ? (
              <>
                <Link
                  to="/login"
                  className="flex items-center px-3 py-2 rounded-md text-base font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <CiLogin className="mr-2" />
                  Login
                </Link>
                
                <div className="border-t border-blue-100 pt-2 mt-2">
                  <div className="px-3 py-1 text-xs text-blue-500 uppercase font-semibold">Register as:</div>
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
                <div className="px-3 py-2 text-sm text-blue-600 border-b border-blue-100">
                  Welcome, {userData?.name || userData?.email}
                </div>
                <Link
                  to={userData?.role === "Doctor" ? "/doctordash" : "/patientDashboard"}
                  className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <CiUser className="mr-2" />
                  Dashboard
                </Link>
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