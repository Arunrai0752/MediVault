import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaUserInjured, FaCalendarAlt, FaSignOutAlt, FaStethoscope, FaTooth, FaHeartbeat, FaBone, FaFemale } from 'react-icons/fa';
import { MdOutlinePersonSearch } from "react-icons/md";

const specializationIcons = {
  "General Physician": <FaStethoscope />,
  "Dentist": <FaTooth />,
  "Cardiologist": <FaHeartbeat />,
  // "Dermatologist": <FaSkin />,
  // "ENT": <FaEar />,
  "Orthopedic": <FaBone />,
  "Gynecologist": <FaFemale />,
};

const specializationThemes = {
  "General Physician": "from-green-400 via-green-300 to-green-400 text-green-900",
  "Dentist": "from-blue-400 via-blue-300 to-blue-400 text-blue-900",
  "Cardiologist": "from-red-400 via-red-300 to-red-400 text-red-900",
  "Dermatologist": "from-pink-400 via-pink-300 to-pink-400 text-pink-900",
  "ENT": "from-yellow-400 via-yellow-300 to-yellow-400 text-yellow-900",
  "Orthopedic": "from-purple-400 via-purple-300 to-purple-400 text-purple-900",
  "Gynecologist": "from-indigo-400 via-indigo-300 to-indigo-400 text-indigo-900",
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

  const theme = specializationThemes[specialization] || "from-sky-100 via-sky-50 to-sky-100 text-blue-900";
  const icon = specializationIcons[specialization] || <FaUserInjured />;

  return (
    <aside className={`w-70 h-[92vh] bg-gradient-to-b ${theme} flex flex-col shadow-lg border-r border-blue-200`}>
      <div className='border-b border-opacity-30 border-current'>
        <h1 className='text-center text-2xl font-semibold p-4 flex items-center justify-center gap-2'>
          {icon}
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
                  `flex items-center w-full p-3 rounded-lg transition-colors ${
                    isActive 
                      ? `bg-opacity-80 shadow-md text-white` 
                      : `bg-white hover:bg-opacity-30 border border-opacity-20`
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
          className={`w-full py-3 px-4 rounded-lg bg-gradient-to-r ${theme} bg-opacity-80 hover:bg-opacity-90 text-white transition-colors duration-300 flex items-center justify-center shadow hover:shadow-md`}
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
