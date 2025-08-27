import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHandHoldingMedical, FaHeartbeat, FaUserMd, FaUserInjured, FaClinicMedical, FaAmbulance, FaShieldAlt } from "react-icons/fa";
import { MdHealthAndSafety, MdSecurity, MdAccessibility } from "react-icons/md";
import About from '../components/About';

const Home = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const features = [
    {
      icon: <FaShieldAlt className="text-3xl text-blue-600" />,
      title: "Secure Health Records",
      description: "Your medical data is encrypted and securely stored with advanced security protocols."
    },
    {
      icon: <MdAccessibility className="text-3xl text-green-600" />,
      title: "Easy Access",
      description: "Access your health records anytime, anywhere with our user-friendly platform."
    },
    {
      icon: <FaClinicMedical className="text-3xl text-purple-600" />,
      title: "Doctor Connectivity",
      description: "Seamlessly connect with healthcare professionals for better treatment outcomes."
    },
    {
      icon: <FaAmbulance className="text-3xl text-red-500" />,
      title: "Emergency Access",
      description: "Critical health information available instantly in emergency situations."
    }
  ];

  const services = [
    {
      title: "For Healthcare Providers",
      description: "Manage patient records, appointments, and prescriptions efficiently.",
      icon: <FaUserMd className="text-4xl text-blue-600 mb-4" />,
      buttonText: "Doctor Portal",
      path: "/doctorregister",
      color: "blue"
    },
    {
      title: "For Patients",
      description: "Access your medical history, book appointments, and communicate with doctors.",
      icon: <FaUserInjured className="text-4xl text-green-600 mb-4" />,
      buttonText: "Patient Portal",
      path: "/register",
      color: "green"
    }
  ];

  return (
    <>
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 pt-20">
        {/* Hero Section */}
        <section className="py-12 md:py-20 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-blue-100 p-4 rounded-full">
                <FaHandHoldingMedical className="text-4xl text-blue-600" />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
              Welcome to <span className="text-blue-600">MediVault</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-8">
              Your trusted healthcare companion for secure medical records and seamless doctor-patient connectivity
            </p>
            
            <div className="w-32 h-2 bg-gradient-to-r from-blue-400 to-teal-400 mx-auto rounded-full mb-10"></div>
            
            <div className="flex flex-wrap justify-center gap-6 mb-16">
              <button 
                onClick={() => handleNavigation("/register")}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:-translate-y-1 flex items-center shadow-lg"
              >
                <FaUserInjured className="mr-2" />
                Get Started as Patient
              </button>
              
              <button 
                onClick={() => handleNavigation("/doctorregister")}
                className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:-translate-y-1 flex items-center shadow-lg"
              >
                <FaUserMd className="mr-2" />
                Join as Healthcare Provider
              </button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Why Choose <span className="text-blue-600">MediVault</span>?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We provide a comprehensive platform that revolutionizes how you manage your healthcare
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="bg-gradient-to-br from-white to-blue-50 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-blue-100">
                  <div className="flex justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 text-center mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-center">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16 bg-gradient-to-br from-teal-50 to-blue-50 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Our <span className="text-teal-600">Services</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Tailored solutions for both healthcare providers and patients
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {services.map((service, index) => (
                <div key={index} className={`bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl transform hover:-translate-y-2 border-t-4 ${service.color === 'blue' ? 'border-blue-500' : 'border-green-500'}`}>
                  <div className="p-8">
                    <div className="flex justify-center">
                      {service.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 text-center mb-4">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 text-center mb-6">
                      {service.description}
                    </p>
                    <div className="text-center">
                      <button 
                        onClick={() => handleNavigation(service.path)}
                        className={`${service.color === 'blue' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-green-600 hover:bg-green-700'} text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 inline-flex items-center`}
                      >
                        {service.buttonText}
                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-blue-600 text-white px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="p-6">
                <div className="text-4xl md:text-5xl font-bold mb-2">10,000+</div>
                <div className="text-xl">Patients Served</div>
              </div>
              <div className="p-6">
                <div className="text-4xl md:text-5xl font-bold mb-2">500+</div>
                <div className="text-xl">Healthcare Providers</div>
              </div>
              <div className="p-6">
                <div className="text-4xl md:text-5xl font-bold mb-2">99.9%</div>
                <div className="text-xl">Uptime Reliability</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-white px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Ready to Transform Your Healthcare Experience?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Join thousands of patients and healthcare providers who trust MediVault with their medical records
            </p>
            <button 
              onClick={() => handleNavigation("/register")}
              className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white font-semibold py-4 px-10 rounded-lg transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center mx-auto shadow-lg"
            >
              Get Started Today
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
              </svg>
            </button>
          </div>
        </section>

        <About />
      </main>
    </>
  );
};

export default Home;