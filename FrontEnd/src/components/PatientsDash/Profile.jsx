

import React from 'react'
import api from '../../../Configs/api';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useEffect } from 'react';
import EditDashBoard from './editDashBoard';
import { FaCalendarAlt, FaNotesMedical, FaFilePrescription, FaClinicMedical } from 'react-icons/fa';
import { MdPayment, MdHelp } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';


const Profile = ( {setActive}) => {
    const [isEditModelOpen, setIsEditModelOpen] = useState(false);
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        fullName: "",
        gender: "",
        dob: "",
        email: "",
        phone: "",
        address: "",
        aadharNumber: "",
        bloodGroup: ""
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
    }, [setIsEditModelOpen])

    return (
        <main className="min-h-screen bg-green-500/20 p-4">
            <div className="max-w-6xl mx-auto">
                <div className='flex justify-between p-4'>
                    <h1 className="text-3xl font-bold text-gray-800 mb-8">User Dashboard</h1>
                    <button
                        onClick={() => { setIsEditModelOpen(true) }}
                        className='text-2xl bg-blue-400 px-4 rounded-lg hover:bg-blue-800'>Edit Profile</button>
                </div>
                
                <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
                    <div className="p-6 md:p-8">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Personal Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                           
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

                
                <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
                    <div className="p-6 md:p-8">
                        <div className="flex items-center mb-6">
                            <FaCalendarAlt className="text-blue-600 text-2xl mr-3" />
                            <h2 className="text-2xl font-semibold text-gray-800">Upcoming Appointments</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                                <h3 className="font-medium text-lg">Dr. Sharma</h3>
                                <p className="text-gray-600">Cardiologist</p>
                                <p className="text-blue-600 mt-2">Today, 3:00 PM</p>
                                <button className="mt-3 text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded">
                                    View Details
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
                    <div className="p-6 md:p-8">
                        <div className="flex items-center mb-6">
                            <FaNotesMedical className="text-green-600 text-2xl mr-3" />
                            <h2 className="text-2xl font-semibold text-gray-800">Medical Records</h2>
                        </div>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center p-4 border-b">
                                <div>
                                    <h3 className="font-medium">Annual Checkup Report</h3>
                                    <p className="text-sm text-gray-500">15 Jan 2023</p>
                                </div>
                                <button  onClick={()=> {setActive("reports")}} className="text-blue-600 hover:text-blue-800 cursor-pointer">View</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div  onClick={()=> {setActive("appoinment")}} className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
                        <div className="bg-blue-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                            <FaCalendarAlt className="text-blue-600 text-2xl" />
                        </div>
                        <h3 className="font-medium text-lg">Book Appointment</h3>
                    </div>
                    
                    <div onClick={()=> {setActive("reports")}} className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
                        <div className="bg-green-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                            <FaFilePrescription className="text-green-600 text-2xl" />
                        </div>
                        <h3 className="font-medium text-lg">Prescriptions</h3>
                    </div>
                    
                    <div  onClick={()=> {setActive("payments")}}  className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
                        <div className="bg-purple-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                            <MdPayment className="text-purple-600 text-2xl" />
                        </div>
                        <h3 className="font-medium text-lg">Payments</h3>
                    </div>
                    
                    <div onClick={()=> {setActive("chatsection")}}  className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
                        <div className="bg-orange-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                            <MdHelp className="text-orange-600 text-2xl" />
                        </div>
                        <h3 className="font-medium text-lg">Help Center</h3>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
                    <div className="p-6 md:p-8">
                        <div className="flex items-center mb-6">
                            <FaClinicMedical className="text-red-600 text-2xl mr-3" />
                            <h2 className="text-2xl font-semibold text-gray-800">Health Summary</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="border border-gray-200 rounded-lg p-4">
                                <h3 className="font-medium text-gray-500">Last Visit</h3>
                                <p className="text-xl font-semibold">15 Jan 2023</p>
                            </div>
                            <div className="border border-gray-200 rounded-lg p-4">
                                <h3 className="font-medium text-gray-500">Current Medications</h3>
                                <p className="text-xl font-semibold">3 Active</p>
                            </div>
                            <div className="border border-gray-200 rounded-lg p-4">
                                <h3 className="font-medium text-gray-500">Allergies</h3>
                                <p className="text-xl font-semibold">None Recorded</p>
                            </div>
                        </div>
                    </div>
                </div>

                <EditDashBoard
                    isOpen={isEditModelOpen}
                    onClose={() => setIsEditModelOpen(false)}
                    oldData={userData}
                />
            </div>
        </main>
    )
}

export default Profile

























             
                      