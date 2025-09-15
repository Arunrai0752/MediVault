import React from 'react';
import { useState } from 'react';
import { FaHeartbeat, FaNotesMedical, FaAllergies, FaFileMedicalAlt, FaCalendarAlt } from 'react-icons/fa';
import { MdBloodtype, MdVaccines, MdEmergency, MdEdit } from 'react-icons/md';
import EditDashBoard from './editDashBoard'; // Make sure to import your edit component
import { useEffect } from 'react';
import { useAuth } from '../../Context/authContext';


const Profile = () => {
  const { user } = useAuth();
  const [isEditModelOpen, setIsEditModelOpen] = useState(false);
  const [patientData, setPatientData] = useState(user);




  const fetchPatientsData = async () => {
    if (user.role === "Patient") {
      setPatientData(user)
    }
  }

  useEffect(() => {
    fetchPatientsData()
  }, [setIsEditModelOpen])


  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-blue-50 to-white p-6">
      <div className="max-w-6xl mx-auto">
        <div className='flex justify-between items-center p-4 mb-6'>
          <h1 className="text-3xl font-bold text-gray-800">Patient Profile</h1>
          <button
            onClick={() => setIsEditModelOpen(true)}
            className='flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg transition-colors'
          >
            <MdEdit /> Edit Profile
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 mb-6 border border-teal-100">
         
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <FaNotesMedical className="text-teal-600 text-2xl" />
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
                <p className="text-gray-900">{patientData.dob ? new Date(patientData.dob).toLocaleDateString("en-GB") : "N/A"}</p>
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



          {patientData.emergencyContacts.map((contact ,  index) => (
            <div
              key={contact._id}
              className="bg-teal-50 rounded-lg p-4 shadow-sm border border-teal-100"
            >
             
              <h3 className=" flex gap-2 font-semibold text-gray-800">
               <span>{index+1}.</span> <h1> {contact.name || "Unknown"}</h1>
              </h3>
              <p className="text-sm text-gray-600">
                Relation: {contact.relation || "N/A"}
              </p>
              <p className="text-sm text-gray-600">
                Phone: {contact.phone || "N/A"}
              </p>
            </div>
          ))}
        </div>

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