import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const nameVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 1, delay: 1 },
    },
  };

  return (
    <motion.footer
      className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-12"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <Heart className="mr-2 text-red-400" size={24} />
              MedicVault
            </h3>
            <p className="text-blue-100 mb-4">
              Your trusted partner in healthcare management. Connecting patients and doctors for better health outcomes.
            </p>
            <p className="text-sm text-blue-200">
              Empowering healthcare with technology and compassion.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/" className="text-blue-100 hover:text-white transition-colors">Home</a></li>
              <li><a href="/doctors" className="text-blue-100 hover:text-white transition-colors">Find Doctors</a></li>
              <li><a href="/services" className="text-blue-100 hover:text-white transition-colors">Services</a></li>
              <li><a href="/about" className="text-blue-100 hover:text-white transition-colors">About Us</a></li>
              <li><a href="/contact" className="text-blue-100 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-semibold mb-4">Our Services</h4>
            <ul className="space-y-2">
              <li className="text-blue-100">Online Appointments</li>
              <li className="text-blue-100">Medical Reports</li>
              <li className="text-blue-100">Prescription Management</li>
              <li className="text-blue-100">Doctor Dashboard</li>
              <li className="text-blue-100">Patient Records</li>
            </ul>
          </motion.div>

          {/* Contact & Social */}
          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3 mb-6">
              <div className="flex items-center">
                <Mail className="mr-3 text-blue-300" size={18} />
                <span className="text-blue-100">support@medicvault.com</span>
              </div>
              <div className="flex items-center">
                <Phone className="mr-3 text-blue-300" size={18} />
                <span className="text-blue-100">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center">
                <MapPin className="mr-3 text-blue-300" size={18} />
                <span className="text-blue-100">123 Health St, Medical City</span>
              </div>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="text-blue-300 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-blue-300 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-blue-300 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-blue-300 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="border-t border-blue-700 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center"
          variants={itemVariants}
        >
          <p className="text-blue-200 text-sm">
            © 2024 MedicVault. All rights reserved. | Privacy Policy | Terms of Service
          </p>
          <motion.div
            className="mt-4 md:mt-0 text-right"
            variants={nameVariants}
            initial="hidden"
            animate="visible"
          >
            <p className="text-blue-100 text-sm">
              Developed with <Heart className="inline text-red-400 mx-1" size={14} /> by{' '}
              <span className="font-semibold text-white">Arun Rai</span>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
