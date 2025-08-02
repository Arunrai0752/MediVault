import React from 'react'
import api from '../../../Configs/api';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useEffect } from 'react';
import EditDashBoard from './editDashBoard';



const Dashboard = () => {

    const [isEditModelOpen, setIsEditModelOpen] = useState(false);

    const [userData, setUserData] = useState({
        fullName: "Arun Rai",
        gender: "Male",
        dob: "07/05/2002",
        email: "arunr2081@gmail.com",
        phone: "9098209835",
        address: "Xxxxxxxxxxx, Yyyyyyyyyyyy, Xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx ",
        aadharNumber: "537439884938",
        bloodGroup: "B+"
    });


    const fetchPatientsData = async () => {


        const res = sessionStorage.getItem("LoginUser");
        const user = JSON.parse(res);


        if (user.role === "Patient") {
            setUserData(user)
        }



    }

    useEffect(() => {
        fetchPatientsData()
    }, [])

    return (
        <main className="min-h-screen bg-green-500/20 p-4">
            <div className="max-w-6xl mx-auto">

                <div className='flex justify-between p-4'>
                    <h1 className="text-3xl font-bold text-gray-800 mb-8">User Dashboard</h1>
                    <button
                    onClick={() => {setIsEditModelOpen(true)}}
                     className= 'text-2xl bg-blue-400 px-4 rounded-lg  hover:bg-blue-800'>Edit Profile</button>
                </div>
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="p-6 md:p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Name */}
                            <div className="flex items-center bg-blue-50/50 p-4 rounded-lg border border-blue-100">
                                <label className="text-lg font-medium text-gray-700 min-w-[120px]">Name:</label>
                                <p className="text-gray-900 px-4 py-2 bg-gray-100/50 rounded-md truncate">
                                    {userData.fullName}
                                </p>
                            </div>

                            <div className="flex items-center bg-blue-50/50 p-4 rounded-lg border border-blue-100">
                                <label className="text-lg font-medium text-gray-700 min-w-[120px]">Gender:</label>
                                <p className="text-gray-900 px-4 py-2 bg-gray-100/50 rounded-md">
                                    {userData.gender}
                                </p>
                            </div>

                            <div className="flex items-center bg-blue-50/50 p-4 rounded-lg border border-blue-100">
                                <label className="text-lg font-medium text-gray-700 min-w-[120px]">Date of Birth:</label>
                                <p className="text-gray-900 px-4 py-2 bg-gray-100/50 rounded-md">
                                    {userData.dob}
                                </p>
                            </div>

                            <div className="flex items-center bg-blue-50/50 p-4 rounded-lg border border-blue-100">
                                <label className="text-lg font-medium text-gray-700 min-w-[120px]">Email:</label>
                                <p className="text-gray-900 px-4 py-2 bg-gray-100/50 rounded-md truncate">
                                    {userData.email}
                                </p>
                            </div>

                            <div className="flex items-center bg-blue-50/50 p-4 rounded-lg border border-blue-100">
                                <label className="text-lg font-medium text-gray-700 min-w-[120px]">Phone:</label>
                                <p className="text-gray-900 px-4 py-2 bg-gray-100/50 rounded-md">
                                    {userData.phone}
                                </p>
                            </div>

                            <div className="flex items-center bg-blue-50/50 p-4 rounded-lg border border-blue-100 ">
                                <label className="text-lg font-medium text-gray-700 min-w-[120px]">Address:</label>
                                <p className="text-gray-900 px-4 py-2 bg-gray-100/50 rounded-md w-full truncate overflow-hidden">
                                    {userData.address}
                                </p>
                            </div>

                            <div className="flex items-center bg-blue-50/50 p-4 rounded-lg border border-blue-100">
                                <label className="text-lg font-medium text-gray-700 min-w-[120px]">Aadhar Number:</label>
                                <p className="text-gray-900 px-4 py-2 bg-gray-100/50 rounded-md truncate">
                                    {userData.aadharNumber}
                                </p>
                            </div>

                            <div className="flex items-center bg-blue-50/50 p-4 rounded-lg border border-blue-100">
                                <label className="text-lg font-medium text-gray-700 min-w-[120px]">Blood Group:</label>
                                <p className="text-gray-900 px-4 py-2 bg-gray-100/50 rounded-md">
                                    {userData.bloodGroup}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <EditDashBoard

                isOpen={isEditModelOpen}
                onClose={() => setIsEditModelOpen(false)}
                oldData={userData}

            />
        </main>
    )
}

export default Dashboard