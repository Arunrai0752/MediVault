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
    sidebar: "bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 border-emerald-200",
    text: "text-emerald-800",
    active: "bg-emerald-200 text-emerald-900 shadow-md",
    hover: "hover:bg-emerald-50 hover:shadow-sm",
    button: "bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 shadow-lg"
  },
  "Dentist": {
    sidebar: "bg-gradient-to-br from-blue-50 via-sky-50 to-cyan-50 border-blue-200",
    text: "text-blue-800",
    active: "bg-blue-200 text-blue-900 shadow-md",
    hover: "hover:bg-blue-50 hover:shadow-sm",
    button: "bg-gradient-to-r from-blue-500 to-sky-600 hover:from-blue-600 hover:to-sky-700 shadow-lg"
  },
  "Cardiologist": {
    sidebar: "bg-gradient-to-br from-red-50 via-rose-50 to-pink-50 border-red-200",
    text: "text-red-800",
    active: "bg-red-200 text-red-900 shadow-md",
    hover: "hover:bg-red-50 hover:shadow-sm",
    button: "bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 shadow-lg"
  },
  "Dermatologist": {
    sidebar: "bg-gradient-to-br from-pink-50 via-rose-50 to-fuchsia-50 border-pink-200",
    text: "text-pink-800",
    active: "bg-pink-200 text-pink-900 shadow-md",
    hover: "hover:bg-pink-50 hover:shadow-sm",
    button: "bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 shadow-lg"
  },
  "ENT": {
    sidebar: "bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 border-amber-200",
    text: "text-amber-800",
    active: "bg-amber-200 text-amber-900 shadow-md",
    hover: "hover:bg-amber-50 hover:shadow-sm",
    button: "bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 shadow-lg"
  },
  "Orthopedic": {
    sidebar: "bg-gradient-to-br from-purple-50 via-violet-50 to-indigo-50 border-purple-200",
    text: "text-purple-800",
    active: "bg-purple-200 text-purple-900 shadow-md",
    hover: "hover:bg-purple-50 hover:shadow-sm",
    button: "bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 shadow-lg"
  },
  "Pediatrician": {
    sidebar: "bg-gradient-to-br from-cyan-50 via-sky-50 to-blue-50 border-cyan-200",
    text: "text-cyan-800",
    active: "bg-cyan-200 text-cyan-900 shadow-md",
    hover: "hover:bg-cyan-50 hover:shadow-sm",
    button: "bg-gradient-to-r from-cyan-500 to-sky-600 hover:from-cyan-600 hover:to-sky-700 shadow-lg"
  },
  "Psychiatrist": {
    sidebar: "bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 border-indigo-200",
    text: "text-indigo-800",
    active: "bg-indigo-200 text-indigo-900 shadow-md",
    hover: "hover:bg-indigo-50 hover:shadow-sm",
    button: "bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 shadow-lg"
  },
  "Gynecologist": {
    sidebar: "bg-gradient-to-br from-fuchsia-50 via-pink-50 to-rose-50 border-fuchsia-200",
    text: "text-fuchsia-800",
    active: "bg-fuchsia-200 text-fuchsia-900 shadow-md",
    hover: "hover:bg-fuchsia-50 hover:shadow-sm",
    button: "bg-gradient-to-r from-fuchsia-500 to-pink-600 hover:from-fuchsia-600 hover:to-pink-700 shadow-lg"
  },
  "Neurologist": {
    sidebar: "bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 border-violet-200",
    text: "text-violet-800",
    active: "bg-violet-200 text-violet-900 shadow-md",
    hover: "hover:bg-violet-50 hover:shadow-sm",
    button: "bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 shadow-lg"
  },
  "Ophthalmologist": {
    sidebar: "bg-gradient-to-br from-amber-50 via-yellow-50 to-lime-50 border-amber-200",
    text: "text-amber-800",
    active: "bg-amber-200 text-amber-900 shadow-md",
    hover: "hover:bg-amber-50 hover:shadow-sm",
    button: "bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 shadow-lg"
  },
  "Oncologist": {
    sidebar: "bg-gradient-to-br from-rose-50 via-pink-50 to-red-50 border-rose-200",
    text: "text-rose-800",
    active: "bg-rose-200 text-rose-900 shadow-md",
    hover: "hover:bg-rose-50 hover:shadow-sm",
    button: "bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 shadow-lg"
  },
  "Pulmonologist": {
    sidebar: "bg-gradient-to-br from-teal-50 via-emerald-50 to-green-50 border-teal-200",
    text: "text-teal-800",
    active: "bg-teal-200 text-teal-900 shadow-md",
    hover: "hover:bg-teal-50 hover:shadow-sm",
    button: "bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 shadow-lg"
  },
  "Urologist": {
    sidebar: "bg-gradient-to-br from-lime-50 via-green-50 to-emerald-50 border-lime-200",
    text: "text-lime-800",
    active: "bg-lime-200 text-lime-900 shadow-md",
    hover: "hover:bg-lime-50 hover:shadow-sm",
    button: "bg-gradient-to-r from-lime-500 to-green-600 hover:from-lime-600 hover:to-green-700 shadow-lg"
  },
  "Gastroenterologist": {
    sidebar: "bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 border-emerald-200",
    text: "text-emerald-800",
    active: "bg-emerald-200 text-emerald-900 shadow-md",
    hover: "hover:bg-emerald-50 hover:shadow-sm",
    button: "bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-lg"
  },
  "Nephrologist": {
    sidebar: "bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 border-sky-200",
    text: "text-sky-800",
    active: "bg-sky-200 text-sky-900 shadow-md",
    hover: "hover:bg-sky-50 hover:shadow-sm",
    button: "bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 shadow-lg"
  },
  "Endocrinologist": {
    sidebar: "bg-gradient-to-br from-fuchsia-50 via-purple-50 to-violet-50 border-fuchsia-200",
    text: "text-fuchsia-800",
    active: "bg-fuchsia-200 text-fuchsia-900 shadow-md",
    hover: "hover:bg-fuchsia-50 hover:shadow-sm",
    button: "bg-gradient-to-r from-fuchsia-500 to-purple-600 hover:from-fuchsia-600 hover:to-purple-700 shadow-lg"
  },
  "Hematologist": {
    sidebar: "bg-gradient-to-br from-red-50 via-rose-50 to-pink-50 border-red-200",
    text: "text-red-800",
    active: "bg-red-200 text-red-900 shadow-md",
    hover: "hover:bg-red-50 hover:shadow-sm",
    button: "bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 shadow-lg"
  },
  "Rheumatologist": {
    sidebar: "bg-gradient-to-br from-purple-50 via-violet-50 to-indigo-50 border-purple-200",
    text: "text-purple-800",
    active: "bg-purple-200 text-purple-900 shadow-md",
    hover: "hover:bg-purple-50 hover:shadow-sm",
    button: "bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 shadow-lg"
  },
  "Plastic Surgeon": {
    sidebar: "bg-gradient-to-br from-pink-50 via-rose-50 to-fuchsia-50 border-pink-200",
    text: "text-pink-800",
    active: "bg-pink-200 text-pink-900 shadow-md",
    hover: "hover:bg-pink-50 hover:shadow-sm",
    button: "bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 shadow-lg"
  },
  "Anesthesiologist": {
    sidebar: "bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50 border-slate-200",
    text: "text-slate-800",
    active: "bg-slate-200 text-slate-900 shadow-md",
    hover: "hover:bg-slate-50 hover:shadow-sm",
    button: "bg-gradient-to-r from-slate-500 to-gray-600 hover:from-slate-600 hover:to-gray-700 shadow-lg"
  },
  "Radiologist": {
    sidebar: "bg-gradient-to-br from-blue-50 via-sky-50 to-cyan-50 border-blue-200",
    text: "text-blue-800",
    active: "bg-blue-200 text-blue-900 shadow-md",
    hover: "hover:bg-blue-50 hover:shadow-sm",
    button: "bg-gradient-to-r from-blue-500 to-sky-600 hover:from-blue-600 hover:to-sky-700 shadow-lg"
  },
  "Pathologist": {
    sidebar: "bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 border-indigo-200",
    text: "text-indigo-800",
    active: "bg-indigo-200 text-indigo-900 shadow-md",
    hover: "hover:bg-indigo-50 hover:shadow-sm",
    button: "bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 shadow-lg"
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