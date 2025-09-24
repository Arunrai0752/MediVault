import React from 'react'

const navItems = [
  { key: 'dashboard', label: 'Dashboard' },
  { key: 'patients', label: 'Patients' },
  { key: 'doctors', label: 'Doctors' },
  
]

const Sidebar = ({ active, setActive }) => {
  return (
    <aside className="w-64 h-[90vh] sticky top-0 bg-gradient-to-b from-red-900 to-red-800 text-red-100 shadow-xl">
      <div className="px-4 py-6 border-b border-red-700">
        <div className="text-xl font-semibold tracking-wide">Admin Panel</div>
      </div>

      <nav className="px-2 py-4 space-y-1">
        {navItems.map((item) => {
          const isActive = active === item.key
          return (
            <button
              key={item.key}
              onClick={() => setActive && setActive(item.key)}
              className={`w-full text-left px-4 py-3 rounded-md transition-colors ${
                isActive
                  ? 'bg-red-700 text-white'
                  : 'hover:bg-red-700/60 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          )
        })}
      </nav>
    </aside>
  )
}

export default Sidebar