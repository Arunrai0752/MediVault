import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUserMd,
  FaUserInjured,
  FaClinicMedical,
  FaAmbulance,
  FaShieldAlt,
  FaStethoscope,
  FaNotesMedical,
  FaCalendarCheck,
  FaChartLine
} from "react-icons/fa";
import { MdAccessibility, MdHealthAndSafety } from "react-icons/md";
import { RiCustomerService2Fill } from "react-icons/ri";
import About from "../components/About";
import { motion } from "framer-motion"; 

const Home = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const features = [
    {
      icon: <FaShieldAlt className="text-4xl text-teal-600" />,
      title: "Secure Health Records",
      description: "Your medical data is encrypted and securely stored with advanced security protocols.",
      gradient: "from-teal-50 to-teal-100"
    },
    {
      icon: <MdAccessibility className="text-4xl text-emerald-600" />,
      title: "Easy Access",
      description: "Access your health records anytime, anywhere with our user-friendly platform.",
      gradient: "from-emerald-50 to-emerald-100"
    },
    {
      icon: <FaClinicMedical className="text-4xl text-cyan-600" />,
      title: "Doctor Connectivity",
      description: "Seamlessly connect with healthcare professionals for better treatment outcomes.",
      gradient: "from-cyan-50 to-blue-50"
    },
    {
      icon: <FaAmbulance className="text-4xl text-red-500" />,
      title: "Emergency Access",
      description: "Critical health information available instantly in emergency situations.",
      gradient: "from-red-50 to-red-100"
    },
    {
      icon: <FaNotesMedical className="text-4xl text-teal-600" />,
      title: "Digital Prescriptions",
      description: "Get and manage your prescriptions digitally without paper hassle.",
      gradient: "from-teal-50 to-teal-100"
    },
    {
      icon: <FaCalendarCheck className="text-4xl text-sky-600" />,
      title: "Appointment Management",
      description: "Schedule, reschedule, and manage your doctor appointments with ease.",
      gradient: "from-sky-50 to-blue-50"
    }
  ];

  const services = [
    {
      title: "For Healthcare Providers",
      description: "Manage patient records, appointments, and prescriptions efficiently with our comprehensive tools.",
      icon: <FaUserMd className="text-5xl text-blue-600 mb-4" />,
      buttonText: "Doctor Portal",
      path: "/doctorregister",
      color: "blue",
      features: ["Patient Management", "Appointment Scheduling", "E-Prescriptions", "Analytics Dashboard"]
    },
    {
      title: "For Patients",
      description: "Access your medical history, book appointments, and communicate with doctors seamlessly.",
      icon: <FaUserInjured className="text-5xl text-teal-600 mb-4" />,
      buttonText: "Patient Portal",
      path: "/register",
      color: "teal",
      features: ["Health Records", "Appointment Booking", "Prescription Access", "Doctor Communication"]
    }
  ];



  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-teal-50 via-blue-50 to-white overflow-hidden">
      <section className="relative bg-[url('MedicVaultHome.png')] bg-center bg-cover  bg-no-repeat h-screen text-white">
        <div className="absolute inset-0 bg-gradient-to-b from-teal-900/30 via-blue-900/20 to-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 flex flex-col md:flex-row items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="md:w-1/2 mb-10 md:mb-0 top-40 relative "
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              Your Health, <span className="text-teal-200">Our Priority</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-teal-100">
              Secure, accessible, and comprehensive healthcare management for patients and providers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleNavigation("/register")}
                className="bg-white text-teal-700 font-semibold py-3 px-8 rounded-lg hover:bg-teal-50 transition-all duration-300 flex items-center justify-center shadow-lg"
              >
                <FaUserInjured className="mr-2" />
                Get Started as Patient
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleNavigation("/doctorregister")}
                className="bg-transparent border-2 border-white text-white font-semibold py-3 px-8 rounded-lg hover:bg-white/10 transition-all duration-300 flex items-center justify-center backdrop-blur-sm"
              >
                <FaUserMd className="mr-2" />
                Join as Doctor
              </motion.button>
            </div>
          </motion.div>
       
        </div>
      </section>

      
      <About />

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Why Choose <span className="text-teal-600">MediVault</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide a comprehensive platform that revolutionizes how you manage your healthcare
            </p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={item}
                className={`bg-gradient-to-br ${feature.gradient} rounded-2xl p-6 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-teal-100`}
              >
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 text-center mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-center">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gradient-to-br from-teal-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Our <span className="text-teal-600">Services</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Tailored solutions for both healthcare providers and patients
            </p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-10"
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={item}
                className="bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl"
              >
                <div className="p-8">
                  <div className="flex justify-center">{service.icon}</div>
                  <h3 className="text-2xl font-bold text-gray-800 text-center mb-4">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-center mb-6">
                    {service.description}
                  </p>
                  <ul className="grid grid-cols-2 gap-3 mb-8">
                    {service.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-center text-sm text-gray-600">
                        <div className="w-2 h-2 bg-teal-500 rounded-full mr-2"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="text-center">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleNavigation(service.path)}
                      className={`${service.color === 'blue' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-teal-600 hover:bg-teal-700'} text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 inline-flex items-center shadow-sm`}
                    >
                      {service.buttonText}
                      <svg
                        className="w-5 h-5 ml-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        ></path>
                      </svg>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-teal-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Healthcare Experience?
            </h2>
            <p className="text-xl text-teal-100 mb-8 max-w-3xl mx-auto">
              Join thousands of patients and healthcare providers who trust MediVault with their medical data.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleNavigation("/register")}
              className="bg-white text-teal-700 font-semibold py-3 px-8 rounded-lg hover:bg-teal-50 transition-all duration-300 inline-flex items-center shadow-lg"
            >
              Get Started Now
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                ></path>
              </svg>
            </motion.button>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Home;