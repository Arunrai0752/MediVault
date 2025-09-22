import React from 'react'

const Sidebar = ({ active, setActive }) => {
    const menuItems = [
        { id: "dashBoard", label: "Dashboard" },
        { id: "profile", label: "Profile" },
        { id: "reports", label: "Reports" },
        { id: "appoinment", label: "Appointments" },
        
    ];

    return (
        <div className="h-screen w-75 bg-gradient-to-b from-teal-700 via-teal-600 to-teal-500 text-white shadow-lg">
            <div className="w-full flex justify-center border-b border-teal-500/40 p-6">
                <h1 className="text-2xl font-semibold">
                    Patient Dashboard
                </h1>
            </div>

            <div className="p-6">
                <ul className="space-y-3">
                    {menuItems.map((item) => (
                        <li
                            key={item.id}
                            className={`px-4 py-3 rounded-lg text-center cursor-pointer transition-all duration-300
                                ${active === item.id ? 
                                    'bg-white text-teal-800 shadow-md' : 
                                    'bg-teal-600/30 text-teal-50 hover:bg-teal-500/40 hover:text-white border border-teal-400/30'}
                                hover:shadow-md hover:scale-[1.02] active:scale-100`}
                            onClick={() => setActive(item.id)}
                        >
                            {item.label}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Sidebar