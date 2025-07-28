import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHandHoldingMedical } from "react-icons/fa";
import About from '../components/About';



const Home = () => {
  const navigate = useNavigate();

  const handleNavigation = (isDoctor) => {
    navigate("/login", { state: { isDoctorDefault: isDoctor } });
  };

  return (
    <>
      <main className='min-h-screen bg-gradient-to-br from-blue-50 to-blue-100  pt-40 '>


        <span className="w-full max-w-4xl text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4 flex justify-center gap-3">
            <span> Welcome to </span>
            <span className="text-blue-600">MedicalDoc</span>
            <FaHandHoldingMedical className='text-blue-700' />
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-6">
            Your trusted healthcare companion connecting patients and doctors seamlessly
          </p>
          <div className="w-24 h-1 bg-blue-400 mx-auto rounded-full"></div>
        </span>

        <div className="flex items-center justify-center p-4">


          <div className="container mx-auto flex flex-col md:flex-row justify-center gap-8 md:gap-12 lg:gap-16 p-4">

            <div
              className="flex flex-col items-center cursor-pointer transition-all duration-300 hover:scale-105"
              onClick={() => handleNavigation(true)}
              role="button"
              tabIndex={0}
              aria-label="Doctor login"
              onKeyDown={(e) => e.key === 'Enter' && handleNavigation(true)}
            >
              <div className="relative h-96 w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden border-2 border-blue-200 hover:border-blue-400">
                <div className="absolute inset-0 bg-blue-500/10 backdrop-blur-sm" />
                <div className="relative h-full flex flex-col">
                  <div className="flex-1 flex items-end p-4">
                    <img
                      src="Doctor.png"
                      alt="Doctor"
                      className="w-full h-auto object-contain max-h-70 px-10"
                      loading="lazy"
                    />
                  </div>
                  <div className="bg-white/80 p-4 text-center">
                    <h2 className="text-3xl md:text-4xl  text-gray-800">
                      Doctor <span className="text-blue-600">Login</span>
                    </h2>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="flex flex-col items-center cursor-pointer transition-all duration-300 hover:scale-105"
              onClick={() => handleNavigation(false)}
              role="button"
              tabIndex={0}
              aria-label="Patient login"
              onKeyDown={(e) => e.key === 'Enter' && handleNavigation(false)}
            >
              <div className="relative h-96 w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden border-2 border-green-200 hover:border-green-400">
                <div className="absolute inset-0 bg-green-500/10 backdrop-blur-sm" />
                <div className="relative h-full flex flex-col">
                  <div className="flex-1 flex items-end p-4">
                    <img
                      src="Patient.png"
                      alt="Patient"
                      className="w-full h-auto object-contain max-h-80"
                      loading="lazy"
                    />
                  </div>
                  <div className="bg-white/80 p-4 text-center">
                    <h2 className="text-3xl md:text-4xl  text-gray-800">
                      Patient <span className="text-green-600">Login</span>
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <About/>
        
      </main>
    </>
  );
};

export default Home;