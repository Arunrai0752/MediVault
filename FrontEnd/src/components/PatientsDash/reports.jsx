import React, { useEffect, useState } from 'react';
import { FaFileMedical, FaPills, FaHistory, FaDownload, FaSearch , FaArrowRight } from 'react-icons/fa';
import { MdMedicalServices } from 'react-icons/md';
import { useAuth } from '../../Context/authContext';
import api from '../../../Configs/api';



const Reports = () => {
  const [activeTab, setActiveTab] = useState('prescriptions');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading , setLoading] = useState(true);
  const [medicalReports, setMedicalReports] = useState([]);


  const [prescriptions, setprescriptions] = useState([]);
  const {user} = useAuth()
  
  // helper to format dates (accepts epoch, numeric string, or ISO)
  const formatDate = (d) => {
    if (d === null || d === undefined || d === '') return '-';
    try {
      let date;
      if (typeof d === 'number') date = new Date(d);
      else if (!isNaN(Number(d))) date = new Date(Number(d));
      else date = new Date(d);
      if (isNaN(date.getTime())) return String(d);
      return date.toLocaleString('en-IN', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    } catch (e) {
      return String(d);
    }
  }
  

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
    fetch(fileUrl, { mode: 'cors' })
      .then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName || 'medical-report';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      })
      .catch(_error => {
          console.error('Download failed:', _error);
        });
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
                <div className="text-center py-12 text-gray-500">
                  <FaPills className="mx-auto text-6xl text-gray-300 mb-4" />
                  <p className="text-lg">No prescriptions found matching your search.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredPrescriptions.map((prescription) => (
                    <div key={prescription._id} className="bg-gradient-to-br from-white to-teal-50 border border-teal-200 rounded-xl p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="bg-teal-100 p-3 rounded-full">
                            <FaPills className="text-teal-600 text-xl" />
                          </div>
                          <div>
                            <h3 className="font-bold text-lg text-gray-800">{prescription.reportType || 'Prescription'}</h3>
                            <p className="text-sm text-gray-500">{formatDate(prescription.date)}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleDownload(prescription.fileUrl, `${prescription.reportType || 'Prescription'}`)}
                          className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-md"
                        >
                          <FaDownload className="text-sm" />
                          Download
                        </button>
                      </div>

                      <div className="space-y-3">
                        <div className="flex flex-wrap gap-2">
                          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                            Dr. {prescription.doctorId?.fullName}
                          </span>
                          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                            {prescription.doctorId?.hospital}
                          </span>
                        </div>

                        {prescription.medicines && prescription.medicines.length > 0 && (
                          <div className="bg-white rounded-lg p-4 border border-teal-100">
                            <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                              <MdMedicalServices className="text-teal-600" />
                              Medications
                            </h4>
                            <div className="space-y-2">
                              {prescription.medicines.map((medicine, index) => (
                                <div key={index} className="flex justify-between items-center bg-gray-50 p-2 rounded">
                                  <span className="font-medium text-gray-700">{medicine.name}</span>
                                  <span className="text-sm text-gray-600">{medicine.dosage}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {prescription.notes && (
                          <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r">
                            <h4 className="font-semibold text-gray-800 mb-1 flex items-center gap-2">
                              <FaFileMedical className="text-amber-600" />
                              Doctor's Notes
                            </h4>
                            <p className="text-gray-700 text-sm">{prescription.notes}</p>
                          </div>
                        )}
                      </div>
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
                <div className="text-center py-12 text-gray-500">
                  <MdMedicalServices className="mx-auto text-6xl text-gray-300 mb-4" />
                  <p className="text-lg">No medical reports found matching your search.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredMedicalReports.map((report) => (
                    <div key={report.id} className="bg-gradient-to-br from-white to-blue-50 border border-blue-200 rounded-xl p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="bg-blue-100 p-3 rounded-full">
                            <MdMedicalServices className="text-blue-600 text-xl" />
                          </div>
                          <div>
                            <h3 className="font-bold text-lg text-gray-800">{report.reportType}</h3>
                            <p className="text-sm text-gray-500">{formatDate(report.date)}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleDownload(report.fileUrl, `${report.reportType}`)}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-md"
                        >
                          <FaDownload className="text-sm" />
                          Download
                        </button>
                      </div>

                      <div className="space-y-3">
                        <div className="flex flex-wrap gap-2">
                          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                            Dr. {report.doctorId?.fullName}
                          </span>
                          <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                            {report.doctorId?.hospital}
                          </span>
                        </div>

                        {report.findings && (
                          <div className="bg-white rounded-lg p-4 border border-blue-100">
                            <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                              <FaFileMedical className="text-blue-600" />
                              Key Findings
                            </h4>
                            <p className="text-gray-700 text-sm line-clamp-3">
                              {report.findings.length > 150 ? `${report.findings.substring(0, 150)}...` : report.findings}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

      
        </div>
      </div>
    </div>
  );
};

export default Reports;