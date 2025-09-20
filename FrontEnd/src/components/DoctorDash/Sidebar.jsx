import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaUserInjured, FaCalendarAlt, FaSignOutAlt, FaStethoscope, FaTooth, FaHeartbeat, FaBone, FaFemale, FaChild, FaBrain, FaEye, FaLungs, FaTeeth, FaAllergies, FaSyringe, FaXRay, FaMicroscope, FaDna } from 'react-icons/fa';
import { MdOutlinePersonSearch } from "react-icons/md";

const specializationIcons = {
  "General Physician": <FaStethoscope />,
  "Dentist": <FaTooth />,
  "Cardiologist": <FaHeartbeat />,
  "Dermatologist": <FaAllergies />,
  "ENT": <FaTeeth />,
  "Orthopedic": <FaBone />,
  "Pediatrician": <FaChild />,
  "Psychiatrist": <FaBrain />,
  "Gynecologist": <FaFemale />,
  "Neurologist": <FaBrain />,
  "Ophthalmologist": <FaEye />,
  "Oncologist": <FaDna />,
  "Pulmonologist": <FaLungs />,
  "Urologist": <FaSyringe />,
  "Gastroenterologist": <FaSyringe />,
  "Nephrologist": <FaSyringe />,
  "Endocrinologist": <FaSyringe />,
  "Hematologist": <FaSyringe />,
  "Rheumatologist": <FaSyringe />,
  "Plastic Surgeon": <FaSyringe />,
  "Anesthesiologist": <FaSyringe />,
  "Radiologist": <FaXRay />,
  "Pathologist": <FaMicroscope />,
};

const specializationThemes = {
  "General Physician": {
    sidebar: "bg-gradient-to-b from-green-100 via-green-50 to-green-100 border-green-200",
    text: "text-green-900",
    active: "bg-green-200 text-green-900",
    hover: "hover:bg-green-100",
    button: "bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600"
  },
  "Dentist": {
    sidebar: "bg-gradient-to-b from-blue-100 via-blue-50 to-blue-100 border-blue-200",
    text: "text-blue-900",
    active: "bg-blue-200 text-blue-900",
    hover: "hover:bg-blue-100",
    button: "bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600"
  },
  "Cardiologist": {
    sidebar: "bg-gradient-to-b from-red-100 via-red-50 to-red-100 border-red-200",
    text: "text-red-900",
    active: "bg-red-200 text-red-900",
    hover: "hover:bg-red-100",
    button: "bg-gradient-to-r from-red-400 to-red-500 hover:from-red-500 hover:to-red-600"
  },
  "Dermatologist": {
    sidebar: "bg-gradient-to-b from-pink-100 via-pink-50 to-pink-100 border-pink-200",
    text: "text-pink-900",
    active: "bg-pink-200 text-pink-900",
    hover: "hover:bg-pink-100",
    button: "bg-gradient-to-r from-pink-400 to-pink-500 hover:from-pink-500 hover:to-pink-600"
  },
  "ENT": {
    sidebar: "bg-gradient-to-b from-yellow-100 via-yellow-50 to-yellow-100 border-yellow-200",
    text: "text-yellow-900",
    active: "bg-yellow-200 text-yellow-900",
    hover: "hover:bg-yellow-100",
    button: "bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600"
  },
  "Orthopedic": {
    sidebar: "bg-gradient-to-b from-purple-100 via-purple-50 to-purple-100 border-purple-200",
    text: "text-purple-900",
    active: "bg-purple-200 text-purple-900",
    hover: "hover:bg-purple-100",
    button: "bg-gradient-to-r from-purple-400 to-purple-500 hover:from-purple-500 hover:to-purple-600"
  },
  "Pediatrician": {
    sidebar: "bg-gradient-to-b from-cyan-100 via-cyan-50 to-cyan-100 border-cyan-200",
    text: "text-cyan-900",
    active: "bg-cyan-200 text-cyan-900",
    hover: "hover:bg-cyan-100",
    button: "bg-gradient-to-r from-cyan-400 to-cyan-500 hover:from-cyan-500 hover:to-cyan-600"
  },
  "Psychiatrist": {
    sidebar: "bg-gradient-to-b from-indigo-100 via-indigo-50 to-indigo-100 border-indigo-200",
    text: "text-indigo-900",
    active: "bg-indigo-200 text-indigo-900",
    hover: "hover:bg-indigo-100",
    button: "bg-gradient-to-r from-indigo-400 to-indigo-500 hover:from-indigo-500 hover:to-indigo-600"
  },
  "Gynecologist": {
    sidebar: "bg-gradient-to-b from-fuchsia-100 via-fuchsia-50 to-fuchsia-100 border-fuchsia-200",
    text: "text-fuchsia-900",
    active: "bg-fuchsia-200 text-fuchsia-900",
    hover: "hover:bg-fuchsia-100",
    button: "bg-gradient-to-r from-fuchsia-400 to-fuchsia-500 hover:from-fuchsia-500 hover:to-fuchsia-600"
  },
  "Neurologist": {
    sidebar: "bg-gradient-to-b from-violet-100 via-violet-50 to-violet-100 border-violet-200",
    text: "text-violet-900",
    active: "bg-violet-200 text-violet-900",
    hover: "hover:bg-violet-100",
    button: "bg-gradient-to-r from-violet-400 to-violet-500 hover:from-violet-500 hover:to-violet-600"
  },
  "Ophthalmologist": {
    sidebar: "bg-gradient-to-b from-amber-100 via-amber-50 to-amber-100 border-amber-200",
    text: "text-amber-900",
    active: "bg-amber-200 text-amber-900",
    hover: "hover:bg-amber-100",
    button: "bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600"
  },
  "Oncologist": {
    sidebar: "bg-gradient-to-b from-rose-100 via-rose-50 to-rose-100 border-rose-200",
    text: "text-rose-900",
    active: "bg-rose-200 text-rose-900",
    hover: "hover:bg-rose-100",
    button: "bg-gradient-to-r from-rose-400 to-rose-500 hover:from-rose-500 hover:to-rose-600"
  },
  "Pulmonologist": {
    sidebar: "bg-gradient-to-b from-teal-100 via-teal-50 to-teal-100 border-teal-200",
    text: "text-teal-900",
    active: "bg-teal-200 text-teal-900",
    hover: "hover:bg-teal-100",
    button: "bg-gradient-to-r from-teal-400 to-teal-500 hover:from-teal-500 hover:to-teal-600"
  },
  "Urologist": {
    sidebar: "bg-gradient-to-b from-lime-100 via-lime-50 to-lime-100 border-lime-200",
    text: "text-lime-900",
    active: "bg-lime-200 text-lime-900",
    hover: "hover:bg-lime-100",
    button: "bg-gradient-to-r from-lime-400 to-lime-500 hover:from-lime-500 hover:to-lime-600"
  },
  "Gastroenterologist": {
    sidebar: "bg-gradient-to-b from-emerald-100 via-emerald-50 to-emerald-100 border-emerald-200",
    text: "text-emerald-900",
    active: "bg-emerald-200 text-emerald-900",
    hover: "hover:bg-emerald-100",
    button: "bg-gradient-to-r from-emerald-400 to-emerald-500 hover:from-emerald-500 hover:to-emerald-600"
  },
  "Nephrologist": {
    sidebar: "bg-gradient-to-b from-sky-100 via-sky-50 to-sky-100 border-sky-200",
    text: "text-sky-900",
    active: "bg-sky-200 text-sky-900",
    hover: "hover:bg-sky-100",
    button: "bg-gradient-to-r from-sky-400 to-sky-500 hover:from-sky-500 hover:to-sky-600"
  },
  "Endocrinologist": {
    sidebar: "bg-gradient-to-b from-orange-100 via-orange-50 to-orange-100 border-orange-200",
    text: "text-orange-900",
    active: "bg-orange-200 text-orange-900",
    hover: "hover:bg-orange-100",
    button: "bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600"
  },
  "Hematologist": {
    sidebar: "bg-gradient-to-b from-red-100 via-red-50 to-red-100 border-red-200",
    text: "text-red-900",
    active: "bg-red-200 text-red-900",
    hover: "hover:bg-red-100",
    button: "bg-gradient-to-r from-red-400 to-red-500 hover:from-red-500 hover:to-red-600"
  },
  "Rheumatologist": {
    sidebar: "bg-gradient-to-b from-purple-100 via-purple-50 to-purple-100 border-purple-200",
    text: "text-purple-900",
    active: "bg-purple-200 text-purple-900",
    hover: "hover:bg-purple-100",
    button: "bg-gradient-to-r from-purple-400 to-purple-500 hover:from-purple-500 hover:to-purple-600"
  },
  "Plastic Surgeon": {
    sidebar: "bg-gradient-to-b from-pink-100 via-pink-50 to-pink-100 border-pink-200",
    text: "text-pink-900",
    active: "bg-pink-200 text-pink-900",
    hover: "hover:bg-pink-100",
    button: "bg-gradient-to-r from-pink-400 to-pink-500 hover:from-pink-500 hover:to-pink-600"
  },
  "Anesthesiologist": {
    sidebar: "bg-gradient-to-b from-gray-100 via-gray-50 to-gray-100 border-gray-200",
    text: "text-gray-900",
    active: "bg-gray-200 text-gray-900",
    hover: "hover:bg-gray-100",
    button: "bg-gradient-to-r from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600"
  },
  "Radiologist": {
    sidebar: "bg-gradient-to-b from-blue-100 via-blue-50 to-blue-100 border-blue-200",
    text: "text-blue-900",
    active: "bg-blue-200 text-blue-900",
    hover: "hover:bg-blue-100",
    button: "bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600"
  },
  "Pathologist": {
    sidebar: "bg-gradient-to-b from-indigo-100 via-indigo-50 to-indigo-100 border-indigo-200",
    text: "text-indigo-900",
    active: "bg-indigo-200 text-indigo-900",
    hover: "hover:bg-indigo-100",
    button: "bg-gradient-to-r from-indigo-400 to-indigo-500 hover:from-indigo-500 hover:to-indigo-600"
  },
};

const Sidebar = ({ active, setActive, specialization }) => {
  const navigate = useNavigate();

  const navItems = [
    { name: 'Profile', icon: <FaUserInjured />},
    { name: 'Appointments', icon: <FaCalendarAlt /> },
    { name: 'SearchPatients', icon: <MdOutlinePersonSearch /> },
  ];

  const handleLogout = () => { 
    sessionStorage.removeItem("Medi_vaultUser");
    navigate("/")
  }

  const theme = specializationThemes[specialization] || specializationThemes["General Physician"];
  const icon = specializationIcons[specialization] || <FaUserInjured />;

  return (
    <aside className={`w-70 h-[92vh] ${theme.sidebar} flex flex-col shadow-lg border-r ${theme.text}`}>
      <div className='border-b border-opacity-30 border-current'>
        <h1 className='text-center text-2xl font-semibold p-4 flex items-center justify-center gap-2'>
          <span className='text-2xl'>{icon}</span>
          <span>{specialization} Dashboard</span>
        </h1>
      </div>

      <nav className='flex-1 p-4 overflow-y-auto'>
        <ul className='space-y-2'>
          {navItems.map((item) => (
            <li key={item.name}>
              <NavLink
                onClick={() => setActive(item.name)}
                className={({ isActive }) => 
                  `flex items-center w-full p-3 rounded-lg transition-colors ${theme.text} ${
                    isActive 
                      ? `${theme.active} shadow-md font-semibold` 
                      : `bg-white bg-opacity-70 ${theme.hover} border border-opacity-20`
                  }`
                }
                aria-current={active === item.name ? "page" : undefined}
              >
                <span className='mr-3 text-lg'>{item.icon}</span>
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className='p-4'>
        <button 
          onClick={handleLogout}
          className={`w-full py-3 px-4 rounded-lg ${theme.button} text-white transition-colors duration-300 flex items-center justify-center shadow hover:shadow-md font-medium`}
          aria-label="Log out"
        >
          <FaSignOutAlt className="mr-2" />
          LogOut
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;