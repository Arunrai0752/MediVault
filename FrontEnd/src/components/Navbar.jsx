import React, { useState } from 'react';
import { SiAsciidoctor } from "react-icons/si";
import { CiSearch, CiUser } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

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
             Register
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