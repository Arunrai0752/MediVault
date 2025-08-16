import React from 'react';
import { useState } from 'react';
import { FaHeartbeat, FaNotesMedical, FaAllergies, FaFileMedicalAlt, FaCalendarAlt } from 'react-icons/fa';
import { MdBloodtype, MdVaccines, MdEmergency, MdEdit } from 'react-icons/md';
import EditDashBoard from './editDashBoard'; // Make sure to import your edit component
import { useEffect } from 'react';

const Profile = () => {
  const [isEditModelOpen, setIsEditModelOpen] = useState(false);
  const [patientData, setPatientData] = useState("");


  
    const fetchPatientsData = async () => {
        const res = sessionStorage.getItem("LoginUser");
        const user = JSON.parse(res);
        if (user.role === "Patient") {
            setPatientData(user)
        }
    }

    useEffect(() => {
        fetchPatientsData()
    }, [setIsEditModelOpen])  


  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header with Edit Button */}
        <div className='flex justify-between items-center p-4 mb-6'>
          <h1 className="text-3xl font-bold text-gray-800">Health Profile</h1>
          <button
            onClick={() => setIsEditModelOpen(true)}
            className='flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors'
          >
            <MdEdit /> Edit Profile
          </button>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          {/* Basic Health Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <div className="flex items-center gap-3 mb-2">
                <MdBloodtype className="text-red-500 text-xl" />
                <h3 className="font-medium">Blood Group</h3>
              </div>
              <p className="text-gray-700">{patientData.bloodGroup || "Not specified"}</p>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg border border-green-100">
              <div className="flex items-center gap-3 mb-2">
                <FaHeartbeat className="text-green-500 text-xl" />
                <h3 className="font-medium">Height</h3>
              </div>
              <p className="text-gray-700">{patientData.height || "Not specified"}</p>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
              <div className="flex items-center gap-3 mb-2">
                <FaHeartbeat className="text-purple-500 text-xl" />
                <h3 className="font-medium">Weight</h3>
              </div>
              <p className="text-gray-700">{patientData.weight || "Not specified"}</p>
            </div>
            
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
              <div className="flex items-center gap-3 mb-2">
                <FaCalendarAlt className="text-yellow-500 text-xl" />
                <h3 className="font-medium">Last Checkup</h3>
              </div>
              <p className="text-gray-700">{patientData.lastCheckup || "No record"}</p>
            </div>
          </div>
          
          {/* Personal Information Section */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <FaNotesMedical className="text-blue-600 text-2xl" />
              <h2 className="text-xl font-bold text-gray-800">Personal Information</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center bg-gray-50 p-3 rounded-lg">
                <label className="font-medium text-gray-700 min-w-[120px]">Name:</label>
                <p className="text-gray-900">{patientData.fullName}</p>
              </div>
              <div className="flex items-center bg-gray-50 p-3 rounded-lg">
                <label className="font-medium text-gray-700 min-w-[120px]">Gender:</label>
                <p className="text-gray-900">{patientData.gender}</p>
              </div>
              <div className="flex items-center bg-gray-50 p-3 rounded-lg">
                <label className="font-medium text-gray-700 min-w-[120px]">Date of Birth:</label>
                <p className="text-gray-900">{patientData.dob}</p>
              </div>
              <div className="flex items-center bg-gray-50 p-3 rounded-lg">
                <label className="font-medium text-gray-700 min-w-[120px]">Email:</label>
                <p className="text-gray-900 truncate">{patientData.email}</p>
              </div>
              <div className="flex items-center bg-gray-50 p-3 rounded-lg">
                <label className="font-medium text-gray-700 min-w-[120px]">Phone:</label>
                <p className="text-gray-900">{patientData.phone}</p>
              </div>
              <div className="flex items-center bg-gray-50 p-3 rounded-lg">
                <label className="font-medium text-gray-700 min-w-[120px]">Address:</label>
                <p className="text-gray-900 truncate">{patientData.address}</p>
              </div>
            </div>
          </div>
          
          {/* Health Conditions */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <FaNotesMedical className="text-red-600 text-2xl" />
              <h2 className="text-xl font-bold text-gray-800">Health Conditions</h2>
            </div>
            <ul className="space-y-3">
              {patientData.conditions && patientData.conditions.length > 0 ? (
                patientData.conditions.map((condition, index) => (
                  <li key={index} className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
                    <span className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0"></span>
                    <div>
                      <p className="font-medium">{condition}</p>
                      <p className="text-gray-500 text-sm">Diagnosed: Unknown</p>
                    </div>
                  </li>
                ))
              ) : (
                <p className="text-gray-500">No health conditions recorded</p>
              )}
            </ul>
          </div>
          
          {/* Allergies */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <FaAllergies className="text-yellow-600 text-2xl" />
              <h2 className="text-xl font-bold text-gray-800">Allergies</h2>
            </div>
            <ul className="space-y-3">
              {patientData.allergies && patientData.allergies.length > 0 ? (
                patientData.allergies.map((allergy, index) => (
                  <li key={index} className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
                    <span className="w-2 h-2 rounded-full bg-yellow-500 mt-2 flex-shrink-0"></span>
                    <div>
                      <p className="font-medium">{allergy}</p>
                      <p className="text-gray-500 text-sm">Severity: Unknown</p>
                    </div>
                  </li>
                ))
              ) : (
                <p className="text-gray-500">No allergies recorded</p>
              )}
            </ul>
          </div>
          
          {/* Emergency Contacts */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-3 mb-4">
              <MdEmergency className="text-red-600 text-2xl" />
              <h2 className="text-xl font-bold text-gray-800">Emergency Contacts</h2>
            </div>
            <div className="space-y-4">
              {patientData.emergencyContacts  && patientData.emergencyContacts.map((contact, index) => (
                <div key={index} className="border-b border-gray-100 pb-4 last:border-0">
                  <h3 className="font-medium">{contact.name}</h3>
                  <p className="text-gray-500 text-sm">{contact.relationship}</p>
                  <p className="text-gray-700">{contact.phone}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Edit Profile Modal */}
        <EditDashBoard
          isOpen={isEditModelOpen}
          onClose={() => setIsEditModelOpen(false)}
          oldData={patientData}
          setPatientData={setPatientData}
        />
      </div>
    </div>
  );
};

export default Profile;