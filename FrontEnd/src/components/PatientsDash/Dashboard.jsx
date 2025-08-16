import React from 'react';
import { FaHeartbeat, FaFileMedical, FaPills, FaUserMd, FaHistory, FaCalendarAlt, FaNotesMedical } from 'react-icons/fa';
import { MdBloodtype, MdVaccines, MdWork, MdEmergency } from 'react-icons/md';
import { GiMedicines } from 'react-icons/gi';
import { BsDroplet, BsClipboardPlus } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [patientData, setPatientData] = useState({
    fullName: "John Doe",
    age: 28,
    bloodGroup: "A+",
    height: "175 cm",
    weight: "72 kg",
    allergies: ["Penicillin", "Peanuts", "Dust"],
    conditions: ["Hypertension", "Type 2 Diabetes"],
    lastCheckup: "2023-05-15",
    upcomingAppointments: [
      { id: 1, doctor: "Dr. Sharma", specialty: "Cardiology", date: "2023-06-20", time: "10:00 AM" },
      { id: 2, doctor: "Dr. Patel", specialty: "Dermatology", date: "2023-07-05", time: "2:30 PM" }
    ],
    labTests: [
      { id: 1, name: "Complete Blood Count", date: "2023-05-10", status: "Completed" },
      { id: 2, name: "Lipid Profile", date: "2023-05-10", status: "Completed" },
      { id: 3, name: "HbA1c", date: "2023-06-15", status: "Pending" }
    ],
    emergencyContacts: [
      { name: "Sarah Smith", relationship: "Spouse", phone: "+1 (555) 123-4567" },
      { name: "Michael Johnson", relationship: "Brother", phone: "+1 (555) 987-6543" }
    ]
  });

  const medicalReports = [
    { id: 1, name: "Annual Physical", date: "2023-05-15", doctor: "Dr. Sharma", type: "General Checkup" },
    { id: 2, name: "ECG Report", date: "2023-03-10", doctor: "Dr. Patel", type: "Cardiology" },
    { id: 3, name: "Blood Test", date: "2023-01-20", doctor: "Dr. Gupta", type: "Lab Results" },
    { id: 4, name: "X-Ray Chest", date: "2022-11-15", doctor: "Dr. Lee", type: "Radiology" }
  ];

  const prescriptions = [
    { id: 1, medicine: "Metformin", dosage: "500mg", frequency: "Twice daily", prescribedOn: "2023-05-15", doctor: "Dr. Sharma", status: "Active" },
    { id: 2, medicine: "Atorvastatin", dosage: "20mg", frequency: "Once at bedtime", prescribedOn: "2023-05-15", doctor: "Dr. Sharma", status: "Active" },
    { id: 3, medicine: "Lisinopril", dosage: "10mg", frequency: "Once daily", prescribedOn: "2023-03-10", doctor: "Dr. Patel", status: "Completed" }
  ];

  const fetchUser = () => {
    const res = sessionStorage.getItem("LoginUser");
    if (res) {
      try {
        const userData = JSON.parse(res);
        setPatientData(prev => ({ ...prev, ...userData }));
      } catch (error) {
        console.error("Error parsing user data:", error);
        sessionStorage.removeItem("LoginUser");
      }
    }
  };

  const handleViewReport = (reportId) => {
    console.log("Viewing report:", reportId);
  };

  const handleBookAppointment = () => {
    navigate('/book-appointment');
  };

  const handleRequestPrescription = () => {
    navigate('/request-prescription');
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className='min-h-screen bg-gray-50 p-4 md:p-6'>
      <div className='max-w-7xl mx-auto space-y-6'>
        {/* Patient Profile Header */}
        <div className='bg-white rounded-xl shadow-sm p-6'>
          <div className='flex flex-col md:flex-row items-center gap-6'>
            <div className='w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center text-3xl font-bold text-blue-600'>
              {patientData.fullName.charAt(0)}
            </div>
            <div className='flex-1 w-full'>
              <h1 className='text-2xl md:text-3xl font-bold text-gray-800'>{patientData.fullName}</h1>
              <div className='flex flex-wrap gap-4 mt-2'>
                <span className='flex items-center gap-2 text-gray-600'>
                  <MdBloodtype className='text-red-500' />
                  Blood Group: {patientData.bloodGroup || "Not specified"}
                </span>
                <span className='flex items-center gap-2 text-gray-600'>
                  <FaHeartbeat className='text-green-500' />
                  {patientData.age} years
                </span>
                <span className='flex items-center gap-2 text-gray-600'>
                  <MdWork className='text-blue-500' />
                  Patient ID: #PAT-{Math.floor(1000 + Math.random() * 9000)}
                </span>
              </div>
            </div>
            <div className='flex gap-3'>
              <button 
                onClick={handleBookAppointment}
                className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2'
              >
                <FaCalendarAlt /> Book Appointment
              </button>
              <button 
                onClick={handleRequestPrescription}
                className='bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2'
              >
                <GiMedicines /> Request Prescription
              </button>
            </div>
          </div>
        </div>

        {/* Health Stats Cards */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
          <div className='bg-white rounded-xl shadow-sm p-5 flex items-center gap-4 hover:shadow-md transition-shadow'>
            <div className='bg-blue-100 p-3 rounded-full'>
              <FaHeartbeat className='text-blue-600 text-xl' />
            </div>
            <div>
              <h3 className='text-gray-500 text-sm'>Height</h3>
              <p className='text-xl font-semibold'>{patientData.height}</p>
            </div>
          </div>

          <div className='bg-white rounded-xl shadow-sm p-5 flex items-center gap-4 hover:shadow-md transition-shadow'>
            <div className='bg-green-100 p-3 rounded-full'>
              <FaHeartbeat className='text-green-600 text-xl' />
            </div>
            <div>
              <h3 className='text-gray-500 text-sm'>Weight</h3>
              <p className='text-xl font-semibold'>{patientData.weight}</p>
            </div>
          </div>

          <div className='bg-white rounded-xl shadow-sm p-5 flex items-center gap-4 hover:shadow-md transition-shadow'>
            <div className='bg-red-100 p-3 rounded-full'>
              <MdBloodtype className='text-red-600 text-xl' />
            </div>
            <div>
              <h3 className='text-gray-500 text-sm'>Blood Group</h3>
              <p className='text-xl font-semibold'>{patientData.bloodGroup || "Not specified"}</p>
            </div>
          </div>

          <div className='bg-white rounded-xl shadow-sm p-5 flex items-center gap-4 hover:shadow-md transition-shadow'>
            <div className='bg-purple-100 p-3 rounded-full'>
              <FaHistory className='text-purple-600 text-xl' />
            </div>
            <div>
              <h3 className='text-gray-500 text-sm'>Last Checkup</h3>
              <p className='text-xl font-semibold'>{patientData.lastCheckup || "No record"}</p>
            </div>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
          {/* Left Column */}
          <div className='lg:col-span-2 space-y-6'>
            {/* Upcoming Appointments */}
            <div className='bg-white rounded-xl shadow-sm p-6'>
              <div className='flex items-center justify-between mb-6'>
                <div className='flex items-center gap-3'>
                  <FaCalendarAlt className='text-blue-600 text-2xl' />
                  <h2 className='text-xl font-bold text-gray-800'>Upcoming Appointments</h2>
                </div>
                <button 
                  onClick={handleBookAppointment}
                  className='text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1'
                >
                  <FaCalendarAlt /> Book New
                </button>
              </div>

              {patientData.upcomingAppointments && patientData.upcomingAppointments.length > 0 ? (
                <div className='space-y-4'>
                  {patientData.upcomingAppointments.map(appointment => (
                    <div key={appointment.id} className='border-b border-gray-100 pb-4 last:border-0'>
                      <div className='flex justify-between items-start'>
                        <div>
                          <h3 className='font-medium text-lg'>{appointment.doctor}</h3>
                          <p className='text-gray-500'>{appointment.specialty}</p>
                        </div>
                        <div className='text-right'>
                          <p className='font-medium'>{appointment.date}</p>
                          <p className='text-gray-500'>{appointment.time}</p>
                        </div>
                      </div>
                      <div className='mt-2 flex gap-2'>
                        <button className='text-blue-600 hover:text-blue-800 text-sm'>
                          Reschedule
                        </button>
                        <button className='text-red-600 hover:text-red-800 text-sm'>
                          Cancel
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className='text-gray-500'>No upcoming appointments</p>
              )}
            </div>

            {/* Medical Reports */}
            <div className='bg-white rounded-xl shadow-sm p-6'>
              <div className='flex items-center justify-between mb-6'>
                <div className='flex items-center gap-3'>
                  <FaFileMedical className='text-blue-600 text-2xl' />
                  <h2 className='text-xl font-bold text-gray-800'>Medical Reports</h2>
                </div>
                <button className='text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1'>
                  <BsClipboardPlus /> Request New
                </button>
              </div>

              <div className='space-y-4'>
                {medicalReports.map(report => (
                  <div key={report.id} className='border-b border-gray-100 pb-4 last:border-0 hover:bg-gray-50 px-2 -mx-2 rounded'>
                    <div className='flex justify-between items-center'>
                      <div>
                        <h3 className='font-medium text-lg'>{report.name}</h3>
                        <div className='flex gap-4'>
                          <p className='text-gray-500'>Dr. {report.doctor}</p>
                          <span className='text-gray-400'>•</span>
                          <p className='text-gray-500'>{report.type}</p>
                        </div>
                      </div>
                      <div className='text-right'>
                        <p className='text-gray-500'>{report.date}</p>
                        <button 
                          onClick={() => handleViewReport(report.id)}
                          className='text-blue-600 hover:text-blue-800 text-sm mt-1'
                        >
                          View Report
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className='space-y-6'>
            {/* Health Conditions */}
            <div className='bg-white rounded-xl shadow-sm p-6'>
              <div className='flex items-center gap-3 mb-4'>
                <FaUserMd className='text-red-600 text-2xl' />
                <h2 className='text-xl font-bold text-gray-800'>Health Conditions</h2>
              </div>
              <ul className='space-y-3'>
                {patientData.conditions.map((condition, index) => (
                  <li key={index} className='flex items-start gap-3'>
                    <span className='w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0'></span>
                    <div>
                      <p className='font-medium'>{condition}</p>
                      <p className='text-gray-500 text-sm'>Diagnosed: {new Date().toLocaleDateString()}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Allergies */}
            <div className='bg-white rounded-xl shadow-sm p-6'>
              <div className='flex items-center gap-3 mb-4'>
                <MdVaccines className='text-yellow-600 text-2xl' />
                <h2 className='text-xl font-bold text-gray-800'>Allergies</h2>
              </div>
              <ul className='space-y-3'>
                {patientData.allergies.map((allergy, index) => (
                  <li key={index} className='flex items-start gap-3'>
                    <span className='w-2 h-2 rounded-full bg-yellow-500 mt-2 flex-shrink-0'></span>
                    <div>
                      <p className='font-medium'>{allergy}</p>
                      <p className='text-gray-500 text-sm'>Severity: Moderate</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Emergency Contacts */}
            <div className='bg-white rounded-xl shadow-sm p-6'>
              <div className='flex items-center gap-3 mb-4'>
                <MdEmergency className='text-red-600 text-2xl' />
                <h2 className='text-xl font-bold text-gray-800'>Emergency Contacts</h2>
              </div>
              <div className='space-y-4'>
                {patientData.emergencyContacts.map((contact, index) => (
                  <div key={index} className='border-b border-gray-100 pb-3 last:border-0'>
                    <h3 className='font-medium'>{contact.name}</h3>
                    <p className='text-gray-500 text-sm'>{contact.relationship}</p>
                    <p className='text-gray-700'>{contact.phone}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;