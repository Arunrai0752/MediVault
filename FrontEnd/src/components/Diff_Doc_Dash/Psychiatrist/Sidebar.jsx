import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiHome,
  FiCalendar,
  FiUsers,
  FiSearch,
  FiUpload,
  FiSettings,
  FiLogOut,
  FiChevronRight,
  FiActivity
} from 'react-icons/fi'

const Sidebar = ({ active, setActive }) => {
  const navigate = useNavigate()

  const menuItems = [
    { id: "Dashboard", label: "Dashboard", icon: <FiHome size={20} /> },
    { id: "Appointments", label: "Appointments", icon: <FiCalendar size={20} /> },
    { id: "PatientsList", label: "Patients List", icon: <FiUsers size={20} /> },
    { id: "SearchPatients", label: "Search Patients", icon: <FiSearch size={20} /> },
    { id: "UploadDoc", label: "Upload Documents", icon: <FiUpload size={20} /> },
    { id: "Setting", label: "Settings", icon: <FiSettings size={20} /> },
  ]

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  // Animation variants
  const sidebarVariants = {
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    closed: {
      x: "-100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  }

  const menuItemVariants = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    hover: { 
      scale: 1.02,
      transition: { type: "spring", stiffness: 400, damping: 17 }
    },
    tap: { scale: 0.98 }
  }

  const iconVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.1, rotate: 5 },
    active: { scale: 1.2, rotate: 0 }
  }

  const activeIndicatorVariants = {
    initial: { width: 0 },
    animate: { width: 4 },
    hover: { width: 6 }
  }

  return (
    <motion.div
      initial="closed"
      animate="open"
      variants={sidebarVariants}
      className="w-64 bg-gradient-to-b from-blue-50 to-white h-screen shadow-xl flex flex-col border-r border-blue-100"
    >
      {/* Header with Animation */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="p-6 border-b border-blue-100"
      >
        <div className="flex items-center space-x-3">
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
            className="p-2 bg-blue-600 rounded-lg"
          >
            <FiActivity className="text-white" size={24} />
          </motion.div>
          <div>
            <h1 className="text-xl font-bold text-blue-800">MediCare Pro</h1>
            <p className="text-sm text-blue-600 mt-1">General Physician</p>
          </div>
        </div>
      </motion.div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <motion.li
              key={item.id}
              variants={menuItemVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
              whileTap="tap"
              transition={{ delay: index * 0.1 }}
            >
              <button
                onClick={() => setActive(item.id)}
                className={`relative w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 ${
                  active === item.id
                    ? 'bg-blue-500 text-white shadow-lg shadow-blue-200'
                    : 'text-gray-600 hover:bg-white hover:text-blue-600 hover:shadow-md'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <motion.span
                    variants={iconVariants}
                    whileHover="hover"
                    animate={active === item.id ? "active" : "initial"}
                  >
                    {item.icon}
                  </motion.span>
                  <span className="font-medium">{item.label}</span>
                </div>
                
                <AnimatePresence>
                  {active === item.id && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0 }}
                      transition={{ type: "spring", stiffness: 500 }}
                    >
                      <FiChevronRight size={16} />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Active Indicator */}
                {active === item.id && (
                  <motion.div
                    variants={activeIndicatorVariants}
                    initial="initial"
                    animate="animate"
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 h-8 bg-white rounded-l-full"
                  />
                )}
              </button>
            </motion.li>
          ))}
        </ul>
      </nav>

      {/* Footer/Logout */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="p-4 border-t border-blue-100"
      >
        <motion.button
          onClick={handleLogout}
          whileHover={{ 
            scale: 1.02,
            backgroundColor: "#fef2f2"
          }}
          whileTap={{ scale: 0.98 }}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-red-600 hover:text-red-700 transition-all duration-200 border border-red-100 hover:border-red-200"
        >
          <motion.span
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.3 }}
          >
            <FiLogOut size={20} />
          </motion.span>
          <span className="font-medium">Logout</span>
        </motion.button>
      </motion.div>

      {/* User Profile Section (Optional) */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="p-4 border-t border-blue-100"
      >
        <div className="flex items-center space-x-3">
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="w-10 h-10 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center"
          >
            <span className="text-white font-bold text-sm">GP</span>
          </motion.div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">Dr. John Smith</p>
            <p className="text-xs text-gray-500 truncate">john.smith@medicare.com</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default Sidebar