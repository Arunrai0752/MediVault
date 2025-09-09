import React from 'react';
import {
    FaUserMd,
    FaNotesMedical,
    FaAmbulance,
    FaClinicMedical,
    FaShieldAlt,
    FaCalendarCheck,
    FaPrescription,
    FaChartLine,
    FaMobileAlt,
    FaLock
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';


const Services = () => {
    const navigate = useNavigate();


    const handleNavigation = (path) => {
        navigate(path);
    };

    const services = [
        {
            icon: <FaNotesMedical className="text-4xl text-teal-600" />,
            title: "Digital Health Records",
            description: "Access your complete medical history in one secure place. Never worry about lost paperwork or forgotten details again.",
            features: ["Lifetime health record", "Easy retrieval", "Organized medical history"]
        },
        {
            icon: <FaUserMd className="text-4xl text-teal-600" />,
            title: "Doctor Appointments",
            description: "Book appointments with healthcare providers seamlessly. Manage your visits with our intuitive scheduling system.",
            features: ["Easy scheduling", "Reminder notifications", "Virtual consultations"]
        },
        {
            icon: <FaAmbulance className="text-4xl text-red-500" />,
            title: "Emergency Access",
            description: "Critical health information available instantly in emergency situations for faster, more accurate treatment.",
            features: ["Instant access", "Emergency contacts", "Critical information"]
        },
        {
            icon: <FaClinicMedical className="text-4xl text-cyan-600" />,
            title: "Clinic Management",
            description: "Comprehensive tools for healthcare providers to manage patient records, appointments, and clinic operations.",
            features: ["Patient management", "Appointment scheduling", "Billing system"]
        },
        {
            icon: <FaShieldAlt className="text-4xl text-emerald-600" />,
            title: "Secure Data Storage",
            description: "Your sensitive health information is protected with bank-level encryption and security protocols.",
            features: ["End-to-end encryption", "Regular backups", "Privacy controls"]
        },
        {
            icon: <FaPrescription className="text-4xl text-sky-600" />,
            title: "E-Prescriptions",
            description: "Doctors can send prescriptions directly to pharmacies, eliminating paper prescriptions and reducing errors.",
            features: ["Digital prescriptions", "Pharmacy integration", "Refill requests"]
        }
    ];

    const stats = [
        { value: "10,000+", label: "Active Patients" },
        { value: "500+", label: "Healthcare Providers" },
        { value: "99.9%", label: "Uptime Reliability" },
        { value: "24/7", label: "Support Available" }
    ];

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    return (
        <section className="py-16 bg-gradient-to-b from-teal-50 via-blue-50 to-white" id="services">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
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
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Discover how MediVault transforms healthcare management for both patients and providers with our comprehensive suite of services.
                    </p>
                </motion.div>

                {/* Stats Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
                >
                    {stats.map((stat, index) => (
                        <div key={index} className="bg-white rounded-2xl p-6 text-center shadow-md border border-teal-100">
                            <div className="text-2xl md:text-3xl font-bold text-teal-700 mb-2">{stat.value}</div>
                            <div className="text-gray-600">{stat.label}</div>
                        </div>
                    ))}
                </motion.div>

                {/* Services Grid */}
                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            variants={item}
                            className="bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border border-teal-100"
                        >
                            <div className="p-6">
                                <div className="flex justify-center mb-4">{service.icon}</div>
                                <h3 className="text-xl font-bold text-gray-800 text-center mb-3">
                                    {service.title}
                                </h3>
                                <p className="text-gray-600 text-center mb-4">
                                    {service.description}
                                </p>
                                <ul className="space-y-2">
                                    {service.features.map((feature, featureIndex) => (
                                        <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                                            <div className="w-2 h-2 bg-teal-500 rounded-full mr-2"></div>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="mt-16 bg-gradient-to-r from-teal-600 to-blue-600 rounded-2xl p-8 md:p-12 text-center text-white"
                >
                    <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to transform your healthcare experience?</h3>
                    <p className="text-teal-100 mb-6 max-w-2xl mx-auto">
                        Join thousands of patients and healthcare providers who trust MediVault with their medical data and practice management.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <button onClick={() => handleNavigation("/register")}
                            className="bg-white text-teal-700 font-semibold py-3 px-8 rounded-lg hover:bg-teal-50 transition-colors">
                            Get Started as Patient
                        </button>
                        <button onClick={() => handleNavigation("/doctorregister")}
                            className="bg-transparent border-2 border-white text-white font-semibold py-3 px-8 rounded-lg hover:bg-white/10 transition-colors">
                            Join as Healthcare Provider
                        </button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Services;