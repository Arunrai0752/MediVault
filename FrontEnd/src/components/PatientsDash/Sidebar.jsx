import React from 'react'

const Sidebar = ({ active, setActive }) => {
    const menuItems = [
        { id: "dashBoard", label: "Dashboard" },
        { id: "profile", label: "Profile" },
        { id: "reports", label: "Reports" },
        { id: "appoinment", label: "Appointments" },
        { id: "search", label: "Search Doctor" },
        { id: "payments", label: "Receipt" },
        { id: "chatsection", label: "Chat" }
    ];

    return (
        <div className="h-screen w-85  bg-gradient-to-b from-blue-500 to-gray-100 shadow-lg">
            <div className="w-full flex justify-center border-b border-gray-200 p-6">
                <h1 className="text-3xl font-semibold text-yellow-500">
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
                                    'bg-blue-600 text-white shadow-md' : 
                                    'bg-white text-gray-700 hover:bg-blue-100 hover:text-blue-600 border border-gray-200'}
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