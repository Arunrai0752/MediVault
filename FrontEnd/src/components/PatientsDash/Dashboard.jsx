import React from 'react'
import { FaHeartbeat, FaFileMedical, FaPills, FaUserMd, FaHistory } from 'react-icons/fa'
import { MdBloodtype, MdVaccines } from 'react-icons/md'
import { useEffect } from 'react';
import { useState } from 'react';

const Dashboard = () => {




  const [patientData, setPatientData] = useState({
    fullName: "",
    age: 28,
    bloodGroup: "",
    height: "175 cm",
    weight: "72 kg",
    allergies: ["Penicillin", "Peanuts"],
    conditions: ["Hypertension"],
    lastCheckup: "2023-05-15"
  });


  const fetchUser = () => {
    const res = sessionStorage.getItem("LoginUser");
    if (res) {
      try {
        const userData = JSON.parse(res);
        setPatientData(userData);
      } catch (error) {
        console.error("Error parsing user data:", error);
        sessionStorage.removeItem("LoginUser");
      }
    }
  };

  const medicalReports = [
    { id: 1, name: "Annual Physical", date: "2023-05-15", doctor: "Dr. Sharma" },
    { id: 2, name: "ECG Report", date: "2023-03-10", doctor: "Dr. Patel" },
    { id: 3, name: "Blood Test", date: "2023-01-20", doctor: "Dr. Gupta" }
  ]

  const prescriptions = [
    { id: 1, medicine: "Metformin", dosage: "500mg", frequency: "Twice daily", prescribedOn: "2023-05-15" },
    { id: 2, medicine: "Atorvastatin", dosage: "20mg", frequency: "Once at bedtime", prescribedOn: "2023-05-15" }
  ]


  useEffect(() => {
    fetchUser()
  }, [])


  return (
    <div className='min-h-screen bg-green-50 p-6'>
      <div className='max-w-6xl mx-auto'>
        <div className='bg-white rounded-xl shadow-md p-6 mb-6'>
          <div className='flex flex-col md:flex-row items-center gap-6'>
            <div className='w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center text-3xl font-bold text-blue-600'>
              {patientData.fullName.charAt(0)}
            </div>
            <div>
              <h1 className='text-3xl font-bold text-gray-800'>{patientData.fullName}</h1>
              <div className='flex flex-wrap gap-4 mt-2'>
                <span className='flex items-center gap-2 text-gray-600'>
                  <MdBloodtype className='text-red-500' />
                  Blood Group: {patientData.bloodGroup}
                </span>
                <span className='flex items-center gap-2 text-gray-600'>
                  <FaHeartbeat className='text-green-500' />
                  {patientData.age} years
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6'>
          <div className='bg-white rounded-xl shadow-md p-6 flex items-center gap-4'>
            <div className='bg-blue-100 p-3 rounded-full'>
              <FaHeartbeat className='text-blue-600 text-xl' />
            </div>
            <div>
              <h3 className='text-gray-500 text-sm'>Height</h3>
              <p className='text-xl font-semibold'>{patientData.height}</p>
            </div>
          </div>

          <div className='bg-white rounded-xl shadow-md p-6 flex items-center gap-4'>
            <div className='bg-green-100 p-3 rounded-full'>
              <FaHeartbeat className='text-green-600 text-xl' />
            </div>
            <div>
              <h3 className='text-gray-500 text-sm'>Weight</h3>
              <p className='text-xl font-semibold'>{patientData.weight}</p>
            </div>
          </div>

          <div className='bg-white rounded-xl shadow-md p-6 flex items-center gap-4'>
            <div className='bg-red-100 p-3 rounded-full'>
              <MdBloodtype className='text-red-600 text-xl' />
            </div>
            <div>
              <h3 className='text-gray-500 text-sm'>Blood Group</h3>
              <p className='text-xl font-semibold'>{patientData.bloodGroup}</p>
            </div>
          </div>

          <div className='bg-white rounded-xl shadow-md p-6 flex items-center gap-4'>
            <div className='bg-purple-100 p-3 rounded-full'>
              <FaHistory className='text-purple-600 text-xl' />
            </div>
            <div>
              <h3 className='text-gray-500 text-sm'>Last Checkup</h3>
              <p className='text-xl font-semibold'>{patientData.lastCheckup}</p>
            </div>
          </div>
        </div>

        <div className='bg-white rounded-xl shadow-md p-6 mb-6'>
          <div className='flex items-center gap-3 mb-6'>
            <FaFileMedical className='text-blue-600 text-2xl' />
            <h2 className='text-2xl font-bold text-gray-800'>Medical Reports</h2>
          </div>

          <div className='space-y-4'>
            {medicalReports.map(report => (
              <div key={report.id} className='border-b border-gray-100 pb-4 last:border-0'>
                <div className='flex justify-between items-center'>
                  <div>
                    <h3 className='font-medium text-lg'>{report.name}</h3>
                    <p className='text-gray-500'>Dr. {report.doctor}</p>
                  </div>
                  <div className='text-right'>
                    <p className='text-gray-500'>{report.date}</p>
                    <button className='text-blue-600 hover:text-blue-800 text-sm mt-1'>
                      View Report
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className='bg-white rounded-xl shadow-md p-6 mb-6'>
          <div className='flex items-center gap-3 mb-6'>
            <FaPills className='text-green-600 text-2xl' />
            <h2 className='text-2xl font-bold text-gray-800'>Current Prescriptions</h2>
          </div>

          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead>
                <tr className='text-left border-b border-gray-200'>
                  <th className='pb-3'>Medicine</th>
                  <th className='pb-3'>Dosage</th>
                  <th className='pb-3'>Frequency</th>
                  <th className='pb-3'>Prescribed On</th>
                </tr>
              </thead>
              <tbody>
                {prescriptions.map(prescription => (
                  <tr key={prescription.id} className='border-b border-gray-100 last:border-0'>
                    <td className='py-3 font-medium'>{prescription.medicine}</td>
                    <td className='py-3'>{prescription.dosage}</td>
                    <td className='py-3'>{prescription.frequency}</td>
                    <td className='py-3'>{prescription.prescribedOn}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
          <div className='bg-white rounded-xl shadow-md p-6'>
            <div className='flex items-center gap-3 mb-4'>
              <FaUserMd className='text-red-600 text-2xl' />
              <h2 className='text-xl font-bold text-gray-800'>Health Conditions</h2>
            </div>
            <ul className='space-y-2'>
              {patientData.conditions.map((condition, index) => (
                <li key={index} className='flex items-center gap-2'>
                  <span className='w-2 h-2 rounded-full bg-red-500'></span>
                  {condition}
                </li>
              ))}
            </ul>
          </div>

          <div className='bg-white rounded-xl shadow-md p-6'>
            <div className='flex items-center gap-3 mb-4'>
              <MdVaccines className='text-yellow-600 text-2xl' />
              <h2 className='text-xl font-bold text-gray-800'>Allergies</h2>
            </div>
            <ul className='space-y-2'>
              {patientData.allergies.map((allergy, index) => (
                <li key={index} className='flex items-center gap-2'>
                  <span className='w-2 h-2 rounded-full bg-yellow-500'></span>
                  {allergy}
                </li>
              ))}
            </ul>
          </div> */}
        {/* </div> */}
      </div>
    </div>
  )
}

export default Dashboard;










