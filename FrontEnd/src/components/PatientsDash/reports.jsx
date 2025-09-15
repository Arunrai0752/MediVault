import React, { useEffect, useState } from 'react';
import { FaFileMedical, FaPills, FaHistory, FaDownload, FaSearch , FaArrowRight } from 'react-icons/fa';
import { MdMedicalServices } from 'react-icons/md';
import { useAuth } from '../../Context/authContext';
import api from '../../../Configs/api';



const reports = () => {
  const [activeTab, setActiveTab] = useState('prescriptions');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [medicalReports, setMedicalReports] = useState([]);


  const [prescriptions, setprescriptions] = useState([]);
  const {user} = useAuth()
  

  const fetchAllReports = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/user/reports/${user._id}`);
      if (res.data.success) {
        setMedicalReports(res.data.data);
      }
    } catch (error) {
      console.error('Error fetching reports:', error , "uhewiouhew");
    } finally {
      setLoading(false);
    }
  };

   const fetchAllprescriptions = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/user/prescriptions/${user._id}`);
      if (res.data.success) {
        setprescriptions(res.data.data);
      }
    } catch (error) {
      console.error('Error fetching reports:', error , "uhewiouhew");
    } finally {
      setLoading(false);
    }
  };

   const handleDownload = (fileUrl, fileName) => {
        const link = document.createElement('a');
        link.href = fileUrl;
        link.target = "_Blank";
        link.setAttribute('download', fileName || 'medical-report');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };



  const filteredPrescriptions = prescriptions.filter(prescription =>
    prescription.doctorId.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prescription.notes.toLowerCase().includes(searchTerm.toLowerCase()) 
  );

  const filteredMedicalReports = medicalReports.filter(report =>
    (report.reportType?.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
    (report.doctorId?.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
    (report.findings?.toLowerCase().includes(searchTerm.toLowerCase()) || false)
  );

  useEffect(() => {
    fetchAllReports(),
    fetchAllprescriptions()
  }, []);

  
  return (
    <div className="p-4 md:p-6 bg-gradient-to-br from-teal-50 via-blue-50 to-white min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 flex items-center">
          <FaFileMedical className="mr-2 text-teal-600" /> Medical Records
        </h1>

        <div className="bg-white rounded-lg shadow-md p-4 mb-6 border border-teal-100">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search reports or prescriptions..."
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-teal-600 focus:border-teal-600"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex border border-teal-100 rounded-md overflow-hidden">
              <button
                className={`px-4 py-2 flex items-center ${activeTab === 'prescriptions' ? 'bg-teal-600 text-white' : 'bg-white text-gray-700'}`}
                onClick={() => setActiveTab('prescriptions')}
              >
                <FaPills className="mr-2" /> Prescriptions
              </button>
              <button
                className={`px-4 py-2 flex items-center ${activeTab === 'reports' ? 'bg-teal-600 text-white' : 'bg-white text-gray-700'}`}
                onClick={() => setActiveTab('reports')}
              >
                <MdMedicalServices className="mr-2" /> Medical Reports
              </button>
              <button
                className={`px-4 py-2 flex items-center ${activeTab === 'history' ? 'bg-teal-600 text-white' : 'bg-white text-gray-700'}`}
                onClick={() => setActiveTab('history')}
              >
                <FaHistory className="mr-2" /> History
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-teal-100">
          {activeTab === 'prescriptions' && (
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <FaPills className="mr-2 text-teal-600" /> Your Prescriptions
              </h2>

              {filteredPrescriptions.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No prescriptions found matching your search.
                </div>
              ) : (
                <div className="space-y-6">
                  {filteredPrescriptions.map((prescription) => (
                    <div key={prescription._id} className="border border-teal-100 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3'>
                        <div>
                          <h3 className='font-medium text-lg'>{prescription.reportType}</h3>
                          <div className='flex flex-wrap gap-2 mt-1'>
                            <span className='bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs'>
                              Dr. {prescription.doctorId.fullName}
                            </span>
                            <span className='bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs'>
                              {prescription.doctorId.hospital}
                            </span>
                          </div>
                        </div>
                        <div className='sm:text-right'>
                          <p className='text-gray-500 text-sm'>{prescription.date}</p>
                          <button
                            onClick={() => handleDownload(prescription.fileUrl, `${prescription.reportType}`)}
                            className='text-teal-700 hover:text-teal-900 text-sm mt-1 flex items-center gap-1 sm:justify-end w-full sm:w-auto'
                          >
                            View Report <FaArrowRight className='text-xs' />
                          </button>


                        </div>
                      </div>

                      

                      {prescription.notes && (
                        <div className="bg-amber-50 border-l-4 border-amber-400 p-3 rounded-r">
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
                <MdMedicalServices className="mr-2 text-teal-600" /> Medical Reports
              </h2>

              {filteredMedicalReports.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No medical reports found matching your search.
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredMedicalReports.map((report) => (
                    <div key={report.id} className="border border-teal-100 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3'>
                        <div>
                          <h3 className='font-medium text-lg'>{report.reportType}</h3>
                          <div className='flex flex-wrap gap-2 mt-1'>
                            <span className='bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs'>
                              Dr. {report.doctorId.fullName}
                            </span>
                            <span className='bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs'>
                              {report.doctorId.hospital}
                            </span>
                          </div>
                        </div>
                        <div className='sm:text-right'>
                          <p className='text-gray-500 text-sm'>{report.date}</p>
                          <button
                            onClick={() => handleDownload(report.fileUrl, `${report.reportType}`)}
                            className='text-teal-700 hover:text-teal-900 text-sm mt-1 flex items-center gap-1 sm:justify-end w-full sm:w-auto'
                          >
                            View Report <FaArrowRight className='text-xs' />
                          </button>


                        </div>
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
                <FaHistory className="mr-2 text-teal-600" /> Medical History
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-teal-50 p-4 rounded-lg">
                  <h3 className="font-medium text-lg text-teal-800 mb-3">Timeline</h3>
                  <div className="space-y-4">
                    {[...prescriptions, ...medicalReports]
                      .sort((a, b) => new Date(b.date) - new Date(a.date))
                      .map((item, index) => (
                        <div key={index} className="flex">
                          <div className="flex flex-col items-center mr-4">
                            <div className="w-3 h-3 bg-teal-600 rounded-full mt-1"></div>
                            {index < [...prescriptions, ...medicalReports].length - 1 && (
                              <div className="w-px h-full bg-teal-200"></div>
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

                <div className="bg-white border border-teal-100 p-4 rounded-lg">
                  <h3 className="font-medium text-lg text-teal-800 mb-3">Summary</h3>
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