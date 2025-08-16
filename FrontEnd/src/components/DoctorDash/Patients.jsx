import React, { useEffect, useState } from 'react';
import { FiSearch, FiCalendar, FiEdit, FiUser, FiFileText, FiBell } from 'react-icons/fi';
import api from '../../../Configs/api';

const Patients = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);

  const [patients, setPatients] = useState([
    {
      id: 1,
      name: 'John Doe',
      age: 42,
      gender: 'Male',
      lastVisit: '2023-05-15',
      nextAppointment: '2023-06-20',
      conditions: ['Hypertension', 'Type 2 Diabetes']
    },
    {
      id: 2,
      name: 'Jane Smith',
      age: 35,
      gender: 'Female',
      lastVisit: '2023-05-10',
      nextAppointment: '2023-06-05',
      conditions: ['Asthma', 'Allergies']
    },
    {
      id: 3,
      name: 'Robert Johnson',
      age: 58,
      gender: 'Male',
      lastVisit: '2023-04-28',
      nextAppointment: '2023-06-15',
      conditions: ['Arthritis', 'High Cholesterol']
    }
  ]);



  const fetchPatients = async () => {
    const Doctorid = sessionStorage.getItem("LoginUser")

    if (Doctorid) {
      try {
        const doctorData = JSON.parse(Doctorid);
        console.log(doctorData._id);
        const patients = await api.get(`/patients/get/${doctorData._id}`);
        setPatients(patients.data.data);
      } catch (error) {
        console.error("Error parsing doctor data:", error);
      }
    }


  }


  useEffect(() => {
    fetchPatients()
  }, [])


  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-800">MedicalVault</h1>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200">
              <FiBell size={20} />
            </button>
            <div className="flex items-center">
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="Doctor"
                className="h-8 w-8 rounded-full"
              />
              <span className="ml-2 text-sm font-medium">Dr. Smith</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative flex-grow max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Search patients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex space-x-3">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
              Add New Patient
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
              Export Records
            </button>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300`}
              >
                <FiUser className="inline mr-2" />
                Patient Profiles
              </button>

            </nav>
          </div>

          <div className="divide-y divide-gray-200">
            {filteredPatients.length > 0 ? (
              filteredPatients.map((patient) => (
                <div
                  key={patient.id}
                  className="p-4 hover:bg-gray-50 cursor-pointer transition-colors duration-150"
                  onClick={() => setSelectedPatient(patient)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <FiUser className="h-10 w-10 text-gray-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{patient.name}</h3>
                        <p className="text-sm text-gray-500">
                          {patient.gender}, {patient.age} years
                        </p>
                        <div className="mt-1 flex flex-wrap gap-1">
                          {patient.conditions.map((condition, index) => (
                            <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {condition}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">
                        Last visit: {patient.lastVisit}
                      </p>
                      <p className="text-sm font-medium text-blue-600">
                        Next: {patient.nextAppointment}
                      </p>
                      <button className="mt-2 inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        <FiEdit className="mr-1" /> Edit
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-gray-500">
                No patients found matching your search criteria.
              </div>
            )}
          </div>
        </div>

        {/* Patient Detail Modal */}
        {selectedPatient && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">Patient Details</h3>
                <button
                  onClick={() => setSelectedPatient(null)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">Close</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="px-6 py-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="col-span-1">
                    <div className="flex flex-col items-center">
                      <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center mb-4">
                        <FiUser className="h-12 w-12 text-gray-400" />
                      </div>
                      <h3 className="text-xl font-medium text-gray-900">{selectedPatient.name}</h3>
                      <p className="text-gray-500">{selectedPatient.gender}, {selectedPatient.age} years</p>
                    </div>
                  </div>
                  <div className="col-span-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Personal Information</h4>
                        <div className="space-y-2">
                          <div>
                            <label className="block text-sm text-gray-500">Date of Birth</label>
                            <p className="text-gray-900">January 15, 1980</p>
                          </div>
                          <div>
                            <label className="block text-sm text-gray-500">Contact</label>
                            <p className="text-gray-900">(555) 123-4567</p>
                          </div>
                          <div>
                            <label className="block text-sm text-gray-500">Address</label>
                            <p className="text-gray-900">123 Main St, Anytown, USA</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Medical Information</h4>
                        <div className="space-y-2">
                          <div>
                            <label className="block text-sm text-gray-500">Blood Type</label>
                            <p className="text-gray-900">A+</p>
                          </div>
                          <div>
                            <label className="block text-sm text-gray-500">Allergies</label>
                            <p className="text-gray-900">Penicillin, Peanuts</p>
                          </div>
                          <div>
                            <label className="block text-sm text-gray-500">Conditions</label>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {selectedPatient.conditions.map((condition, index) => (
                                <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                  {condition}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Medical History Section */}
                <div className="mt-8">
                  <h4 className="font-medium text-gray-900 mb-4">Medical History</h4>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Diagnosis</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Treatment</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prescription</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{selectedPatient.lastVisit}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Routine checkup</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Blood tests ordered</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">None</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2023-03-10</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Hypertension follow-up</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Increased dosage</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Lisinopril 20mg</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-8 pt-5 border-t border-gray-200 flex justify-end space-x-3">
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <FiFileText className="mr-2" /> View Full History
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <FiEdit className="mr-2" /> Edit Profile
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    <FiCalendar className="mr-2" /> Set Appointment
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Patients;