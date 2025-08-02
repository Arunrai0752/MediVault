import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaUserInjured, FaCalendarAlt, FaFileMedical, FaChartLine, FaCog, FaSignOutAlt } from 'react-icons/fa';


const Sidebar = ({ active, setActive }) => {
  const navigate = useNavigate();

  const navItems = [
    { name: 'Profile', icon: <FaUserInjured />},
    { name: 'Patients', icon: <FaChartLine /> },
    { name: 'Appointments', icon: <FaCalendarAlt /> },
  ];

  const handleLogout = () => { 
    sessionStorage.removeItem("LoginUser");
    navigate("/")
  }
 
  return (
    <aside className='w-70 h-[92vh] bg-teal-700 text-white flex flex-col'>
      <div className='border-b border-teal-600'>
        <h1 className='text-center text-3xl p-4'>
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
                    isActive ? 'bg-teal-600 text-white' : 'hover:bg-teal-800 text-teal-100'
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
          className='w-full py-3 px-4 rounded-lg bg-red-500 hover:bg-red-600 text-white transition-colors duration-300 flex items-center justify-center'
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