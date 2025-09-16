import React from 'react';
import { FaHeartbeat, FaFileMedical, FaUserMd } from 'react-icons/fa';
import {
  FaCalendarAlt,
  FaHistory,
  FaTimes,
  FaAllergies,
  FaDownload
} from 'react-icons/fa';
import { MdBloodtype,MdWork, MdEmergency, MdMedicalServices } from 'react-icons/md';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/authContext.jsx';
import api from '../../../Configs/api.js';

const Dashboard = () => {


  const navigate = useNavigate();
  const { user } = useAuth();
  const [patientData, setPatientData] = useState(user);
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [medicalReports, setMedicalReports] = useState([]);



  const categorizeAppointments = (appointments) => {
    return {
      upcoming: appointments.filter(app =>
        app.status === 'Confirmed' || app.status === 'Scheduled' || app.status === 'In Progress' || app.status === 'Rescheduled'
      ),
      requested: appointments.filter(app =>
        app.status === 'Requested'),
      completed: appointments.filter(app =>
        app.status === 'Completed'
      ),
      cancelled: appointments.filter(app =>
        app.status === 'Cancelled' || app.status === 'No Show'
      )
    };
  };

  const fetchUser = () => {
    const res = sessionStorage.getItem("Medi_vaultUser");
    if (res) {
      try {
        const userData = JSON.parse(res);
        setPatientData(prev => ({ ...prev, ...userData }));
      } catch (error) {
        console.error("Error parsing user data:", error);
        sessionStorage.removeItem("Medi_vaultUser");
      }
    }
  };


  const handleBookAppointment = () => {
    setShowRequestForm(true)
  };

  const [appointmentRequest, setAppointmentRequest] = useState({
    doctor: '',
    specialty: '',
    reason: '',
    preferredDate: '',
    preferredTime: '',
    urgency: 'routine',
  });

  const fetchAllAppointments = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/user/appointments/${user._id}`);


      if (res.data.success) {
        setAppointments(res.data.data);
      }
    } catch (error) {
      console.error('Error fetching appointments:', error);
    } finally {
      setLoading(false);
    }
  };



  const fetchAllReports = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/user/reports/${user._id}`);

      if (res.data.success) {
        setMedicalReports(res.data.data);
      }
    } catch (error) {
      console.error('Error fetching reports:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAppointmentRequest({
      ...appointmentRequest,
      [name]: value
    });
  };

  const handleSubmitRequest = (e) => {
    e.preventDefault();
    const res = api.post(`/user/requestAppoinment/${user._id}`, appointmentRequest)

    alert('Appointment request submitted successfully!');
    setShowRequestForm(false);
    setAppointmentRequest({
      doctor: '',
      specialty: '',
      reason: '',
      preferredDate: '',
      preferredTime: '',
      urgency: 'routine'
    });
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
      .catch(error => {
        console.error('Download failed:', error);
      });
  };

  const appointmentsData = categorizeAppointments(appointments);

  useEffect(() => {
    fetchUser();
    fetchAllAppointments(),
      fetchAllReports()
  }, []);

  return (
    <div className='min-h-screen bg-gradient-to-br from-teal-50 via-blue-50 to-white p-4   md:p-6'>
      <div className='max-w-7xl mx-auto space-y-6 '>
        <div className='bg-white rounded-xl shadow-sm p-6 border border-teal-100'>
          <div className='flex flex-col md:flex-row items-center gap-6'>
            <div className='w-24 h-24 rounded-full bg-gradient-to-r from-teal-500 to-blue-600 flex items-center justify-center text-3xl font-bold text-white'>
              {patientData.fullName?.charAt(0) || 'U'}
            </div>
            <div className='flex-1 w-full'>
              <h1 className='text-2xl md:text-3xl font-bold text-gray-800'>{patientData.fullName || 'User Name'}</h1>
              <div className='flex flex-wrap gap-4 mt-2'>
                <span className='flex items-center gap-2 text-gray-600 bg-gray-100 px-3 py-1 rounded-full text-sm'>
                  <MdBloodtype className='text-red-500' />
                  Blood Group: {patientData.bloodGroup || "Not specified"}
                </span>
                <span className='flex items-center gap-2 text-gray-600 bg-gray-100 px-3 py-1 rounded-full text-sm'>
                  <FaHeartbeat className='text-green-500' />
                  {patientData.age || 0} years
                </span>
                <span className='flex items-center gap-2 text-gray-600 bg-gray-100 px-3 py-1 rounded-full text-sm'>
                  <MdWork className='text-blue-500' />
                  Patient ID: {patientData.phone || 'N/A'}
                </span>
              </div>
            </div>
            <div className='flex gap-3'>
              <button
                onClick={handleBookAppointment}
                className='bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all shadow-md hover:shadow-lg'
              >
                <FaCalendarAlt /> Request Appointment
              </button>
            </div>
          </div>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
          <div className='bg-white rounded-xl shadow-sm p-5 flex items-center gap-4 hover:shadow-md transition-all duration-300 border-l-4 border-teal-500'>
            <div className='bg-teal-100 p-3 rounded-full'>
              <FaHeartbeat className='text-teal-600 text-xl' />
            </div>
            <div>
              <h3 className='text-gray-500 text-sm'>Height</h3>
              <p className='text-xl font-semibold'>{patientData.height || 'N/A'}</p>
            </div>
          </div>

          <div className='bg-white rounded-xl shadow-sm p-5 flex items-center gap-4 hover:shadow-md transition-all duration-300 border-l-4 border-green-500'>
            <div className='bg-green-100 p-3 rounded-full'>
              <FaHeartbeat className='text-green-600 text-xl' />
            </div>
            <div>
              <h3 className='text-gray-500 text-sm'>Weight</h3>
              <p className='text-xl font-semibold'>{patientData.weight || 'N/A'}</p>
            </div>
          </div>

          <div className='bg-white rounded-xl shadow-sm p-5 flex items-center gap-4 hover:shadow-md transition-all duration-300 border-l-4 border-red-500'>
            <div className='bg-red-100 p-3 rounded-full'>
              <MdBloodtype className='text-red-600 text-xl' />
            </div>
            <div>
              <h3 className='text-gray-500 text-sm'>Blood Group</h3>
              <p className='text-xl font-semibold'>{patientData.bloodGroup || "Not specified"}</p>
            </div>
          </div>

          <div className='bg-white rounded-xl shadow-sm p-5 flex items-center gap-4 hover:shadow-md transition-all duration-300 border-l-4 border-purple-500'>
            <div className='bg-purple-100 p-3 rounded-full'>
              <FaHistory className='text-purple-600 text-xl' />
            </div>
            <div>
              <h3 className='text-gray-500 text-sm'>Last Checkup</h3>
              <p className='text-xl font-semibold'>{patientData.lastCheckup || "No record"}</p>
            </div>
          </div>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
          <div className='lg:col-span-2 space-y-6'>
            <div className='bg-white rounded-xl shadow-sm p-6'>
              <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6'>
                <div className='flex items-center gap-3 mb-3 sm:mb-0'>
                  <FaCalendarAlt className='text-teal-600 text-2xl' />
                  <h2 className='text-xl font-bold text-gray-800'> Upcoming Appointments</h2>
                </div>


              </div>

              {appointmentsData.upcoming && appointmentsData.upcoming.length > 0 ? (
                <div className='space-y-4'>
                  {appointmentsData.upcoming.map((appointment) => (
                    <div
                      key={appointment.appointmentId}
                      className='border rounded-lg p-4 shadow-sm bg-white hover:shadow-md transition-shadow'
                    >
                      <div className='flex flex-col md:flex-row justify-between gap-4'>
                        <div className='flex-1'>
                          <h3 className='font-medium text-lg text-gray-800'>
                            {appointment.patientName}
                          </h3>
                          <p className='text-gray-500 text-sm'>
                            {appointment.gender} • {appointment.phoneNumber}
                          </p>
                          <p className='text-gray-500 text-sm'>{appointment.email}</p>

                          <div className='mt-3 text-sm text-gray-700 space-y-1'>
                            <p>
                              <span className='font-semibold'>Type:</span>{" "}
                              {appointment.appointmentType}
                            </p>
                            <p>
                              <span className='font-semibold'>Reason:</span> {appointment.reason}
                            </p>
                          </div>
                        </div>

                        <div className='md:text-right'>
                          <p className='font-medium text-gray-800'>
                            {new Date(appointment.date).toLocaleDateString("en-GB", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </p>
                          <p className='text-gray-500'>{appointment.time}</p>
                          <span
                            className={`inline-block mt-1 px-2 py-1 rounded text-xs font-semibold ${appointment.status === "Confirmed" || appointment.status === "Completed"
                              ? "bg-green-100 text-green-600"
                              : appointment.status === "Cancelled" || appointment.status === "No Show"
                                ? "bg-red-100 text-red-600"
                                : "bg-yellow-100 text-yellow-600"
                              }`}
                          >
                            {appointment.status}
                          </span>

                          {appointment.doctorId && (
                            <div className='mt-3 text-sm text-gray-700'>
                              <p className='font-semibold'>{appointment.doctorId.fullName}</p>
                              <p>{appointment.doctorId.specialization}</p>
                              <p>Fee: ${appointment.doctorId.fee}</p>
                            </div>
                          )}
                        </div>
                      </div>


                      <div className='mt-3 flex  gap-3 pt-3 border-t border-gray-100'>
                        <button className='text-teal-700 hover:text-teal-900 text-sm font-medium px-3 py-1 bg-teal-50 rounded-md'>
                          Reschedule Request
                        </button>
                      </div>

                    </div>
                  ))}
                </div>
              ) : (
                <div className='text-center py-8 text-gray-500'>
                  <FaCalendarAlt className='mx-auto text-4xl text-gray-300 mb-3' />
                  <p>No Upcoming appointments</p>
                </div>
              )}
            </div>

            <div className='bg-white rounded-xl shadow-sm p-6'>
              <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6'>
                <div className='flex items-center gap-3 mb-3 sm:mb-0'>
                  <FaFileMedical className='text-teal-600 text-2xl' />
                  <h2 className='text-xl font-bold text-gray-800'>Medical Reports</h2>
                </div>

              </div>

              <div className='space-y-4'>
                {medicalReports.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <MdMedicalServices className="mx-auto text-6xl text-gray-300 mb-4" />
                    <p className="text-lg">No medical reports available.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-6">
                    {medicalReports.map((report, index) => (
                      <div key={index} className="bg-gradient-to-br from-white to-blue-50 border border-blue-200 rounded-xl p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="bg-blue-100 p-3 rounded-full">
                              <MdMedicalServices className="text-blue-600 text-xl" />
                            </div>
                            <div>
                              <h3 className="font-bold text-lg text-gray-800">{report.reportType}</h3>
                              <p className="text-sm text-gray-500">{report.date}</p>
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
            </div>
          </div>

          <div className='space-y-6'>
            <div className='bg-white rounded-xl shadow-sm p-6'>
              <div className='flex items-center gap-3 mb-4'>
                <FaUserMd className='text-red-600 text-2xl' />
                <h2 className='text-xl font-bold text-gray-800'>Health Conditions</h2>
              </div>
              <ul className='space-y-3'>
                {patientData.conditions && patientData.conditions.length > 0 ? (
                  patientData.conditions.map((condition, index) => (
                    <li key={index} className='flex items-start gap-3 p-2 hover:bg-gray-50 rounded-lg'>
                      <span className='w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0'></span>
                      <div>
                        <p className='font-medium'>{condition}</p>
                      </div>
                    </li>
                  ))
                ) : (
                  <p className='text-gray-500 text-sm'>No health conditions recorded</p>
                )}
              </ul>
            </div>

            <div className='bg-white rounded-xl shadow-sm p-6'>
              <div className='flex items-center gap-3 mb-4'>
                <FaAllergies className='text-red-600 text-2xl' />
                <h2 className='text-xl font-bold text-gray-800'>Allergies</h2>
              </div>
              <ul className='space-y-3'>
                {patientData.allergies && patientData.allergies.length > 0 ? (
                  patientData.allergies.map((allergies, index) => (
                    <li key={index} className='flex items-start gap-3 p-2 hover:bg-gray-50 rounded-lg'>
                      <span className='w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0'></span>
                      <div>
                        <p className='font-medium'>{allergies}</p>
                      </div>
                    </li>
                  ))
                ) : (
                  <p className='text-gray-500 text-sm'>No allergies  </p>
                )}
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-3 mb-4">
                <MdEmergency className="text-red-600 text-2xl" />
                <h2 className="text-xl font-bold text-gray-800">Emergency Contacts</h2>
              </div>


              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {patientData.emergencyContacts && patientData.emergencyContacts.length > 0 ? (
                  patientData.emergencyContacts.map((contact) => (
                    <div
                      key={contact._id}
                      className="bg-blue-50 rounded-lg p-4 shadow-sm border border-blue-100"
                    >
                      <h3 className="font-semibold text-gray-800">
                        {contact.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Relation: {contact.relation}
                      </p>
                      <p className="text-sm text-gray-600">
                        Phone: {contact.phone}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm col-span-2">
                    No emergency contacts added
                  </p>
                )}
              </div>
            </div>

          </div>

        </div>
      </div>

      {showRequestForm && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-5 rounded-t-xl flex justify-between items-center">
              <h3 className="text-xl font-bold">Request New Appointment</h3>
              <button
                onClick={() => setShowRequestForm(false)}
                className="text-white hover:text-blue-200 transition-colors"
              >
                <FaTimes size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmitRequest} className="p-5">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Specialty Needed</label>
                  <select
                    name="specialty"
                    value={appointmentRequest.specialty}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="">Select Specialty</option>
                    <option value="Cardiology">Cardiology</option>
                    <option value="Dermatology">Dermatology</option>
                    <option value="Endocrinology">Endocrinology</option>
                    <option value="ENT">ENT</option>
                    <option value="Pediatrics">Pediatrics</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Doctor Registration Number</label>
                  <input
                    type="tel"
                    name="doctor"
                    value={appointmentRequest.doctor}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Doctor Registered Number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Reason for Appointment</label>
                  <textarea
                    name="reason"
                    value={appointmentRequest.reason}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Describe your symptoms or reason for the appointment"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Date</label>
                    <input
                      type="date"
                      name="preferredDate"
                      value={appointmentRequest.preferredDate}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Time</label>
                    <select
                      name="preferredTime"
                      value={appointmentRequest.preferredTime}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      <option value="">Select Time</option>
                      <option value="Morning">Morning (8AM - 12PM)</option>
                      <option value="Afternoon">Afternoon (12PM - 5PM)</option>
                      <option value="Evening">Evening (5PM - 8PM)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Urgency</label>
                  <select
                    name="urgency"
                    value={appointmentRequest.urgency}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="routine">Routine</option>
                    <option value="urgent">Urgent</option>
                    <option value="emergency">Emergency</option>
                  </select>
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowRequestForm(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;



