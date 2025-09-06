import React, { useState, useEffect } from 'react';
import {
  FaCalendarAlt,
  FaClock,
  FaUserMd,
  FaHospital,
  FaPlus,
  FaBell,
  FaCheckCircle,
  FaHourglassHalf,
  FaHistory,
  FaTimesCircle,
  FaSearch,
  FaFilter,
  FaArrowRight,
  FaStethoscope,
  FaNotesMedical,
  FaTimes
} from 'react-icons/fa';
import api from '../../../Configs/api';
import { useAuth } from '../../Context/authContext';




const Appointments = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSpecialty, setFilterSpecialty] = useState('all');
  const { user, isPatient } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);



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




  const appointmentsData = categorizeAppointments(appointments);

  const fetchAllAppointments = async () => {
    try {
      setLoading(true);

      const res = await api.get(`/user/appointments/${user._id}`);
      console.log(res.data.message);

      if (res.data.success) {
        setAppointments(res.data.data);
      }
    } catch (error) {
      console.error('Error fetching appointments:', error);
    } finally {
      setLoading(false);
    }
  };



  useEffect(() => {
    fetchAllAppointments();
  }, [user]);

  const notifications = [
    {
      id: 1,
      type: "reminder",
      message: "Reminder: Your appointment is in 2 days",
      time: "2 hours ago",
      read: false
    }
  ];
  

  const [appointmentRequest, setAppointmentRequest] = useState({
    doctor: '',
    specialty: '',
    reason: '',
    preferredDate: '',
    preferredTime: '',
    urgency: 'routine',
  });

  

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



    console.log('Appointment request:', appointmentRequest);
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

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Confirmed':
        return <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs flex items-center"><FaCheckCircle className="mr-1" /> Confirmed</span>;
      case 'Scheduled':
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs flex items-center"><FaHourglassHalf className="mr-1" /> Scheduled</span>;
      case 'Completed':
        return <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs flex items-center"><FaHistory className="mr-1" /> Completed</span>;
      case 'Cancelled':
      case 'No Show':
        return <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs flex items-center"><FaTimesCircle className="mr-1" /> Cancelled</span>;
      case 'In Progress':
        return <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs flex items-center"><FaHourglassHalf className="mr-1" /> In Progress</span>;
      default:
        return <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">{status}</span>;
    }
  };

  const formatDate = (dateString) => {
    const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    const h = parseInt(hours);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const formattedHours = h % 12 || 12;
    return `${formattedHours}:${minutes} ${ampm}`;
  };

  const unreadNotifications = notifications.filter(n => !n.read).length;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-blue-900">Loading appointments...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-blue-900 mb-2">My Appointments</h1>
            <p className="text-blue-700">Manage your medical appointments and requests</p>
          </div>

          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <div className="relative">
              <button className="p-3 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow text-blue-600">
                <FaBell size={18} />
              </button>
              {unreadNotifications > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {unreadNotifications}
                </span>
              )}
            </div>

            <button
              onClick={() => setShowRequestForm(true)}
              className="flex items-center px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
            >
              <FaPlus className="mr-2" />
              Request Appointment
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Upcoming</p>
                <p className="text-2xl font-bold text-blue-900">{appointmentsData.upcoming.length}</p>
              </div>
              <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                <FaCalendarAlt />
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-yellow-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Pending</p>
                <p className="text-2xl font-bold text-blue-900">{appointmentsData.requested.length}</p>
              </div>
              <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
                <FaHourglassHalf />
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Completed</p>
                <p className="text-2xl font-bold text-blue-900">{appointmentsData.completed.length}</p>
              </div>
              <div className="p-3 rounded-full bg-green-100 text-green-600">
                <FaCheckCircle />
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-red-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Cancelled</p>
                <p className="text-2xl font-bold text-blue-900">{appointmentsData.cancelled.length}</p>
              </div>
              <div className="p-3 rounded-full bg-red-100 text-red-600">
                <FaTimesCircle />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-2/3">
            <div className="bg-white rounded-xl shadow-sm border mb-6 overflow-x-auto">
              <div className="flex min-w-max">
                {['upcoming', 'requested', 'completed', 'cancelled'].map((tab) => (
                  <button
                    key={tab}
                    className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors flex items-center ${activeTab === tab
                      ? 'border-blue-500 text-blue-600 bg-blue-50'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab === 'upcoming' && <FaCalendarAlt className="mr-2" />}
                    {tab === 'requested' && <FaHourglassHalf className="mr-2" />}
                    {tab === 'completed' && <FaHistory className="mr-2" />}
                    {tab === 'cancelled' && <FaTimesCircle className="mr-2" />}
                    <span className="capitalize">{tab}</span>
                    <span className="ml-2 bg-gray-200 text-gray-700 rounded-full px-2 py-0.5 text-xs">
                      {appointmentsData[tab].length}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border p-4 mb-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaSearch className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search doctors, specialties, or reasons..."
                    className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <select
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={filterSpecialty}
                  onChange={(e) => setFilterSpecialty(e.target.value)}
                >
                  <option value="all">All Specialties</option>
                  <option value="Cardiology">Cardiology</option>
                  <option value="Dermatology">Dermatology</option>
                  <option value="Endocrinology">Endocrinology</option>
                  <option value="ENT">ENT</option>
                  <option value="Pediatrics">Pediatrics</option>
                </select>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border p-6">
              {appointmentsData[activeTab].length > 0 ? (
                <div className="space-y-4">
                  {appointmentsData[activeTab].map(appointment => (
                    <div key={appointment._id} className="border rounded-xl p-5 hover:shadow-md transition-shadow bg-gradient-to-r from-white to-blue-50">
                      <div className="flex flex-col md:flex-row md:items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="text-lg font-semibold text-blue-900">{appointment.patientName}</h3>
                              <div className="flex items-center text-sm text-gray-600 mt-1">
                                <FaStethoscope className="mr-1 text-blue-500" />
                                <span>{appointment.appointmentType}</span>
                                <span className="mx-2 text-gray-400">•</span>
                                <span className="text-blue-600 font-medium">{appointment.status}</span>
                              </div>
                            </div>
                            <div className="hidden md:block">
                              {getStatusBadge(appointment.status)}
                            </div>
                          </div>

                          <div className="flex flex-wrap items-center gap-4 mt-4">
                            <div className="flex items-center text-sm text-gray-600 bg-blue-50 px-3 py-1.5 rounded-lg">
                              <FaCalendarAlt className="mr-2 text-blue-500" />
                              <span className="font-medium">{formatDate(appointment.date)}</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-600 bg-blue-50 px-3 py-1.5 rounded-lg">
                              <FaClock className="mr-2 text-blue-500" />
                              <span className="font-medium">{formatTime(appointment.time)}</span>
                            </div>
                          </div>

                          <div className="mt-3">
                            <span className="text-sm text-gray-500 bg-gray-100 rounded-full px-3 py-1">
                              {appointment.appointmentType}
                            </span>
                          </div>

                          <div className="mt-3">
                            <h4 className="text-sm font-medium text-gray-700">Reason:</h4>
                            <p className="text-sm text-gray-600">{appointment.reason}</p>
                          </div>

                          {appointment.insuranceProvider && appointment.insuranceProvider !== 'N/A' && (
                            <div className="mt-3">
                              <h4 className="text-sm font-medium text-gray-700">Insurance:</h4>
                              <p className="text-sm text-gray-600">{appointment.insuranceProvider} ({appointment.insuranceId})</p>
                            </div>
                          )}
                        </div>

                        <div className="flex flex-col items-end gap-3 mt-4 md:mt-0">
                          <div className="md:hidden">
                            {getStatusBadge(appointment.status)}
                          </div>

                          <div className="flex gap-2">
                            {activeTab === 'upcoming' && (
                              <>
                                <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors">
                                  Reschedule
                                </button>
                                <button className="px-4 py-2 border border-red-300 text-red-600 text-sm rounded-lg hover:bg-red-50 transition-colors">
                                  Cancel
                                </button>
                              </>
                            )}
                            {activeTab === 'requested' && (
                              <button className="px-4 py-2 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50 transition-colors">
                                Edit Request
                              </button>
                            )}
                            {activeTab === 'completed' && (
                              <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                                <FaNotesMedical className="mr-1" /> Details
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaCalendarAlt className="text-blue-600 text-3xl" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-700 mb-2">No {activeTab} appointments</h3>
                  <p className="text-gray-500">You don't have any {activeTab} appointments at this time.</p>
                </div>
              )}
            </div>
          </div>
















          <div className="lg:w-1/3">
            {appointmentsData.upcoming.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm border p-5 mb-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
                  <FaArrowRight className="mr-2 text-blue-600" /> Next Appointment
                </h3>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-blue-800">{appointmentsData.upcoming[0].patientName}</h4>
                    {getStatusBadge(appointmentsData.upcoming[0].status)}
                  </div>

                  <div className="flex items-center text-sm text-blue-700 mb-2">
                    <FaStethoscope className="mr-2" />
                    {appointmentsData.upcoming[0].appointmentType}
                  </div>

                  <div className="flex items-center text-sm text-blue-700 mb-2">
                    <FaCalendarAlt className="mr-2" />
                    {formatDate(appointmentsData.upcoming[0].date)}
                  </div>

                  <div className="flex items-center text-sm text-blue-700">
                    <FaClock className="mr-2" />
                    {formatTime(appointmentsData.upcoming[0].time)}
                  </div>

                  <button className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            )}










            <div className="bg-white rounded-xl shadow-sm border p-5">
              <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
                <FaBell className="mr-2 text-blue-600" /> Notifications
              </h3>

              <div className="space-y-4">
                {notifications.map(notification => (
                  <div
                    key={notification.id}
                    className={`p-3 rounded-lg border ${notification.read ? 'bg-gray-50 border-gray-200' : 'bg-blue-50 border-blue-200'}`}
                  >
                    <p className={`text-sm ${notification.read ? 'text-gray-700' : 'text-blue-700 font-medium'}`}>
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                  </div>
                ))}

                {notifications.length === 0 && (
                  <p className="text-gray-500 text-center py-4">No notifications</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>










      {showRequestForm && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="bg-blue-600 text-white p-5 rounded-t-xl flex justify-between items-center">
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Doctor </label>
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
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
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

export default Appointments;