import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaHandHoldingMedical,
  FaHeartbeat,
  FaUserMd,
  FaUserInjured,
  FaClinicMedical,
  FaAmbulance,
  FaShieldAlt,
} from "react-icons/fa";
import { MdAccessibility } from "react-icons/md";
import About from "../components/About";
import Doctor from "../../public/Homeimg.jpg";
import { motion } from "framer-motion"; // 👈 added

const Home = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const features = [
    {
      icon: <FaShieldAlt className="text-3xl text-blue-600" />,
      title: "Secure Health Records",
      description:
        "Your medical data is encrypted and securely stored with advanced security protocols.",
    },
    {
      icon: <MdAccessibility className="text-3xl text-green-600" />,
      title: "Easy Access",
      description:
        "Access your health records anytime, anywhere with our user-friendly platform.",
    },
    {
      icon: <FaClinicMedical className="text-3xl text-purple-600" />,
      title: "Doctor Connectivity",
      description:
        "Seamlessly connect with healthcare professionals for better treatment outcomes.",
    },
    {
      icon: <FaAmbulance className="text-3xl text-red-500" />,
      title: "Emergency Access",
      description:
        "Critical health information available instantly in emergency situations.",
    },
  ];

  const services = [
    {
      title: "For Healthcare Providers",
      description:
        "Manage patient records, appointments, and prescriptions efficiently.",
      icon: <FaUserMd className="text-4xl text-blue-600 mb-4" />,
      buttonText: "Doctor Portal",
      path: "/doctorregister",
      color: "blue",
    },
    {
      title: "For Patients",
      description:
        "Access your medical history, book appointments, and communicate with doctors.",
      icon: <FaUserInjured className="text-4xl text-green-600 mb-4" />,
      buttonText: "Patient Portal",
      path: "/register",
      color: "green",
    },
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
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 ">
      <section className="flex items-center justify-between h-[100vh] bg-gradient-to-br from-blue-100 to-teal-100 px-16">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-lg"
        >
          <h1 className="text-5xl font-bold text-gray-800 mb-6">
            Welcome To <span className="text-teal-600">MediVault</span>
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            A secure platform for patients and healthcare providers. Manage your
            medical records with ease.
          </p>

          <div className="flex gap-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleNavigation("/register")}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 flex items-center shadow-lg"
            >
              <FaUserInjured className="mr-2" />
              Get Started as Patient
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleNavigation("/doctorregister")}
              className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 flex items-center shadow-lg"
            >
              <FaUserMd className="mr-2" />
              Join as Doctor
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="hidden md:flex items-center justify-center w-[700px]"
        >
          <img
            src={Doctor}
            alt="doctor"
            className="h-[80vh] object-cover drop-shadow-lg rounded-lg bg-amber-950"
          />
        </motion.div>
      </section>

      <About />

      <section className="py-16 bg-white px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Why Choose <span className="text-blue-600">MediVault</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide a comprehensive platform that revolutionizes how you
              manage your healthcare
            </p>
          </div>

          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={item}
                className="bg-gradient-to-br from-white to-blue-50 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-blue-100"
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

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-10"
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={item}
                className={`bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl transform hover:-translate-y-2 border-t-4 ${
                  service.color === "blue"
                    ? "border-blue-500"
                    : "border-green-500"
                }`}
              >
                <div className="p-8">
                  <div className="flex justify-center">{service.icon}</div>
                  <h3 className="text-2xl font-bold text-gray-800 text-center mb-4">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-center mb-6">
                    {service.description}
                  </p>
                  <div className="text-center">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleNavigation(service.path)}
                      className={`${
                        service.color === "blue"
                          ? "bg-blue-600 hover:bg-blue-700"
                          : "bg-green-600 hover:bg-green-700"
                      } text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 inline-flex items-center`}
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
    </main>
  );
};

export default Home;
