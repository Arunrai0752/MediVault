import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaUserInjured, FaCalendarAlt, FaFileMedical, FaChartLine, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { MdOutlinePersonSearch } from "react-icons/md";

const Sidebar = ({ active, setActive }) => {
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
 
  return (
    <aside className='w-70 h-[92vh] bg-gradient-to-b from-sky-100 via-sky-50 to-sky-100 text-blue-900 flex flex-col shadow-lg border-r border-blue-200'>
      <div className='border-b border-blue-200'>
        <h1 className='text-center text-2xl font-semibold p-4 text-blue-800'>
          Doctor Dashboard
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
                      ? 'bg-blue-500 text-white shadow-md' 
                      : 'bg-white text-blue-700 hover:bg-blue-100 border border-blue-100'
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
          className='w-full py-3 px-4 rounded-lg bg-blue-400 hover:bg-blue-500 text-white transition-colors duration-300 flex items-center justify-center shadow hover:shadow-md'
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