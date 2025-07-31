import React, { useState } from 'react';
import { SiAsciidoctor } from "react-icons/si";
import { CiSearch, CiUser } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [panelOpen, setPanelOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm border-b border-teal-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          <Link to="/" className="flex-shrink-0 flex items-center">
            <SiAsciidoctor className="h-8 w-8 text-teal-600" />
            <span className="ml-2 text-xl font-bold text-teal-800 hidden sm:block">
              MediRecord
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-teal-900 hover:text-teal-600 px-3 py-2 text-sm font-medium transition-colors"
            >
              Home
            </Link>

            {/* Panel Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setPanelOpen(!panelOpen)}
                className="text-teal-900 hover:text-teal-600 px-3 py-2 text-sm font-medium transition-colors flex items-center"
              >
                Panel
                <svg 
                  className={`ml-1 h-4 w-4 transition-transform ${panelOpen ? 'transform rotate-180' : ''}`} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {panelOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                  <Link 
                    to="/doctordash" 
                    className="block px-4 py-2 text-sm text-teal-900 hover:bg-teal-50 hover:text-teal-600"
                    onClick={() => setPanelOpen(false)}
                  >
                    Doctor Panel
                  </Link>
                  <Link 
                    to="/patientdash" 
                    className="block px-4 py-2 text-sm text-teal-900 hover:bg-teal-50 hover:text-teal-600"
                    onClick={() => setPanelOpen(false)}
                  >
                    Patient Panel
                  </Link>
                </div>
              )}
            </div>
            
            {/* Search Button */}
            <div className="relative">
              <button 
                onClick={() => setSearchOpen(!searchOpen)}
                className="flex items-center text-teal-900 hover:text-teal-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                <CiSearch className="mr-1 h-5 w-5" />
                Find Doctor
              </button>
              
              {searchOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-md shadow-lg p-2 z-10">
                  <div className="flex items-center">
                    <input
                      type="text"
                      placeholder="Search doctors..."
                      className="flex-1 border border-teal-300 rounded-l-md px-3 py-1 focus:outline-none focus:ring-1 focus:ring-teal-500"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button 
                      className="bg-teal-600 text-white px-3 py-1 rounded-r-md hover:bg-teal-700 transition-colors"
                      onClick={() => {
                        // Handle search logic
                        setSearchOpen(false);
                      }}
                    >
                      Go
                    </button>
                    <button 
                      className="ml-2 text-gray-500 hover:text-gray-700"
                      onClick={() => setSearchOpen(false)}
                    >
                      <IoMdClose />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/register"
              className="bg-gradient-to-r from-teal-600 to-teal-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:from-teal-700 hover:to-teal-600 transition-all shadow-sm"
            >
             P Register
            </Link>
          
            <Link
              to="/doctorregister"
              className="bg-gradient-to-r from-teal-600 to-teal-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:from-teal-700 hover:to-teal-600 transition-all shadow-sm"
            >
             D Register
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 rounded-md text-teal-600 hover:text-teal-900 hover:bg-teal-50"
            >
              <CiSearch className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {searchOpen && (
        <div className="md:hidden bg-white p-4 border-t border-teal-100">
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Search doctors..."
              className="flex-1 border border-teal-300 rounded-l-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-teal-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button 
              className="bg-teal-600 text-white px-4 py-2 rounded-r-md hover:bg-teal-700 transition-colors"
              onClick={() => {
                // Handle search logic
                setSearchOpen(false);
              }}
            >
              Search
            </button>
            <button 
              className="ml-2 p-2 text-gray-500 hover:text-gray-700"
              onClick={() => setSearchOpen(false)}
            >
              <IoMdClose />
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;