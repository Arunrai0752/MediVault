import React, { useState } from 'react';
import { FaFileMedical, FaPills, FaHistory, FaDownload, FaSearch } from 'react-icons/fa';
import { MdMedicalServices } from 'react-icons/md';

const reports = () => {
  const [activeTab, setActiveTab] = useState('prescriptions');
  const [searchTerm, setSearchTerm] = useState('');

  // Sample data - replace with actual API calls
  const prescriptions = [
    {
      id: 1,
      date: '2023-10-15',
      doctor: 'Dr. Sharma',
      medicines: [
        { name: 'Metformin', dosage: '500mg', frequency: 'Twice daily', duration: '30 days' },
        { name: 'Atorvastatin', dosage: '20mg', frequency: 'Once at bedtime', duration: '30 days' }
      ],
      notes: 'Take after meals. Monitor blood sugar regularly.'
    },
    {
      id: 2,
      date: '2023-09-20',
      doctor: 'Dr. Patel',
      medicines: [
        { name: 'Amoxicillin', dosage: '500mg', frequency: 'Every 8 hours', duration: '7 days' }
      ],
      notes: 'Complete full course. May cause mild stomach upset.'
    }
  ];

  const medicalReports = [
    {
      id: 1,
      date: '2023-10-10',
      type: 'Blood Test Report',
      doctor: 'Dr. Gupta',
      findings: 'Hemoglobin: 14.2 g/dL, WBC: 7,500/μL, Platelets: 250,000/μL',
      attachment: 'blood_test_oct2023.pdf'
    },
    {
      id: 2,
      date: '2023-08-05',
      type: 'X-Ray Report',
      doctor: 'Dr. Khan',
      findings: 'No fractures detected. Mild arthritis in right knee.',
      attachment: 'xray_report_aug2023.pdf'
    },
    {
      id: 3,
      date: '2023-06-15',
      type: 'ECG Report',
      doctor: 'Dr. Sharma',
      findings: 'Normal sinus rhythm. No signs of ischemia.',
      attachment: 'ecg_report_jun2023.pdf'
    }
  ];

  const filteredPrescriptions = prescriptions.filter(prescription =>
    prescription.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prescription.medicines.some(med => med.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const filteredMedicalReports = medicalReports.filter(report =>
    report.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.findings.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 flex items-center">
          <FaFileMedical className="mr-2 text-blue-600" /> Medical Records
        </h1>

        {/* Search and Tabs */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search reports or prescriptions..."
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex border border-gray-200 rounded-md overflow-hidden">
              <button
                className={`px-4 py-2 flex items-center ${activeTab === 'prescriptions' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}
                onClick={() => setActiveTab('prescriptions')}
              >
                <FaPills className="mr-2" /> Prescriptions
              </button>
              <button
                className={`px-4 py-2 flex items-center ${activeTab === 'reports' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}
                onClick={() => setActiveTab('reports')}
              >
                <MdMedicalServices className="mr-2" /> Medical Reports
              </button>
              <button
                className={`px-4 py-2 flex items-center ${activeTab === 'history' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}
                onClick={() => setActiveTab('history')}
              >
                <FaHistory className="mr-2" /> History
              </button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {activeTab === 'prescriptions' && (
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <FaPills className="mr-2 text-blue-600" /> Your Prescriptions
              </h2>

              {filteredPrescriptions.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No prescriptions found matching your search.
                </div>
              ) : (
                <div className="space-y-6">
                  {filteredPrescriptions.map((prescription) => (
                    <div key={prescription.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-medium text-lg text-blue-700">Prescription #{prescription.id}</h3>
                          <p className="text-gray-600">Date: {prescription.date}</p>
                          <p className="text-gray-600">Prescribed by: {prescription.doctor}</p>
                        </div>
                        <button className="text-blue-600 hover:text-blue-800 px-3 py-1 rounded-md border border-blue-200 bg-blue-50 flex items-center">
                          <FaDownload className="mr-2" /> Download
                        </button>
                      </div>

                      <div className="mb-4">
                        <h4 className="font-medium text-gray-800 mb-2">Medications:</h4>
                        <div className="space-y-2">
                          {prescription.medicines.map((medicine, index) => (
                            <div key={index} className="pl-4 border-l-2 border-blue-200">
                              <p className="font-medium">{medicine.name} - {medicine.dosage}</p>
                              <p className="text-gray-600 text-sm">Frequency: {medicine.frequency} for {medicine.duration}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {prescription.notes && (
                        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded-r">
                          <h4 className="font-medium text-gray-800 mb-1">Doctor's Notes:</h4>
                          <p className="text-gray-700">{prescription.notes}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'reports' && (
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <MdMedicalServices className="mr-2 text-blue-600" /> Medical Reports
              </h2>

              {filteredMedicalReports.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No medical reports found matching your search.
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredMedicalReports.map((report) => (
                    <div key={report.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-lg text-blue-700">{report.type}</h3>
                          <p className="text-gray-600">Date: {report.date}</p>
                          <p className="text-gray-600">Report by: {report.doctor}</p>
                        </div>
                        <button className="text-blue-600 hover:text-blue-800 px-3 py-1 rounded-md border border-blue-200 bg-blue-50 flex items-center">
                          <FaDownload className="mr-2" /> Download
                        </button>
                      </div>

                      <div className="mt-3">
                        <h4 className="font-medium text-gray-800 mb-1">Findings:</h4>
                        <p className="text-gray-700">{report.findings}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'history' && (
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <FaHistory className="mr-2 text-blue-600" /> Medical History
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-medium text-lg text-blue-800 mb-3">Timeline</h3>
                  <div className="space-y-4">
                    {[...prescriptions, ...medicalReports]
                      .sort((a, b) => new Date(b.date) - new Date(a.date))
                      .map((item, index) => (
                        <div key={index} className="flex">
                          <div className="flex flex-col items-center mr-4">
                            <div className="w-3 h-3 bg-blue-500 rounded-full mt-1"></div>
                            {index < [...prescriptions, ...medicalReports].length - 1 && (
                              <div className="w-px h-full bg-blue-300"></div>
                            )}
                          </div>
                          <div className="pb-4">
                            <p className="font-medium text-gray-800">
                              {item.type || `Prescription #${item.id}`}
                            </p>
                            <p className="text-sm text-gray-600">{item.date}</p>
                            <p className="text-sm text-gray-700 mt-1">
                              {item.doctor || item.prescribedBy}
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                <div className="bg-white border border-gray-200 p-4 rounded-lg">
                  <h3 className="font-medium text-lg text-blue-800 mb-3">Summary</h3>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-gray-800">Current Medications</h4>
                      <ul className="list-disc pl-5 text-gray-700 mt-1">
                        {prescriptions[0].medicines.map((med, idx) => (
                          <li key={idx}>{med.name} ({med.dosage})</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">Recent Findings</h4>
                      <p className="text-gray-700 mt-1">
                        {medicalReports[0].findings.substring(0, 100)}...
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">Last Consultation</h4>
                      <p className="text-gray-700 mt-1">
                        {prescriptions[0].date} with {prescriptions[0].doctor}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default reports;