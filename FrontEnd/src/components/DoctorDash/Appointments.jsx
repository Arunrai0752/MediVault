import React, { useState, useEffect } from 'react';
import {
  FaCalendarAlt,
  FaClock,
  FaUserInjured,
  FaStethoscope,
  FaPlus,
  FaCheckCircle,
  FaHourglassHalf,
  FaCheck,
  FaTimes,
  FaHistory,
  FaNotesMedical,
  FaFileMedical,
  FaSearch,
  FaFilter
} from 'react-icons/fa';
import api from '../../../Configs/api';
import { useAuth } from '../../Context/authContext';
import SetAppointments from './SetAppoinments';
import RescheduleAppoinmet from './RescheduleAppoinmet';
import toast from 'react-hot-toast';

const Appointments = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [activeNoteId, setActiveNoteId] = useState(null);
  const [activeReschedule, setActiveReschedule] = useState(false);
  const [noteText, setNoteText] = useState("");
  const [activeAppointmentTab, setActiveAppointmentTab] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  
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
      console.log(user._id);

      const res = await api.get(`/doctor/Doctorappointments/${user._id}`);
      console.log(res.data.data);

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


  const handleCheckin = async (appointmentId) => {
    try {
      await api.put(`/doctor/appointments/${appointmentId}/status`, { status: 'Completed' });
      setAppointments(prev =>
        prev.map(app => app._id === appointmentId ? { ...app, status: 'Completed' } : app)
      );
    } catch (error) {
      console.error("Error checking in:", error);
    }
  };

  const handleApprove = async (appointmentId) => {
    try {
      await api.put(`/doctor/appointments/${appointmentId}/status`, { status: 'Confirmed' });
      setAppointments(prev =>
        prev.map(app => app._id === appointmentId ? { ...app, status: 'Confirmed' } : app)
      );
    } catch (error) {
      console.error("Error approving:", error);
    }
  };

  const handleDecline = async (appointmentId) => {
    try {
      await api.put(`/doctor/appointments/${appointmentId}/status`, { status: 'Cancelled' });
      setAppointments(prev =>
        prev.map(app => app._id === appointmentId ? { ...app, status: 'Cancelled' } : app)
      );
    } catch (error) {
      console.error("Error declining:", error);
    }
  };


  const handleSaveNote = async (appointmentId) => {
    try {
      
     const res =   await api.put(`/doctor/appointments/${appointmentId}/notes`, { notes: noteText });
      setAppointments(prev =>
        prev.map(app => app._id === appointmentId ? { ...app, notes: noteText } : app)
      );
      setActiveNoteId(null);
      setNoteText("");
      toast.success(res.data.message)
    } catch (err) {
      console.error("Error saving note:", err);
    }
  };


  const specialties = [...new Set(
    appointments.map(apt => apt.appointmentType)
  )];

  const filteredAppointments = appointmentsData[activeTab]?.filter(apt => {
    const matchesSearch = apt.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.appointmentType.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecialty = selectedSpecialty === 'all' || apt.appointmentType === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  }) || [];

  const getStatusBadge = (status) => {
    const baseClasses = "px-3 py-1 rounded-full text-xs font-medium flex items-center";

    switch (status) {
      case 'Confirmed':
        return <span className={`${baseClasses} bg-green-100 text-green-800`}><FaCheckCircle className="mr-1" /> Confirmed</span>;
      case 'Scheduled':
        return <span className={`${baseClasses} bg-yellow-100 text-yellow-800`}><FaHourglassHalf className="mr-1" /> Scheduled</span>;
      case 'Completed':
        return <span className={`${baseClasses} bg-blue-100 text-blue-800`}><FaCheck className="mr-1" /> Completed</span>;
      case 'Cancelled':
      case 'No Show':
        return <span className={`${baseClasses} bg-red-100 text-red-800`}><FaTimes className="mr-1" /> Cancelled</span>;
      case 'In Progress':
        return <span className={`${baseClasses} bg-purple-100 text-purple-800`}><FaHourglassHalf className="mr-1" /> In Progress</span>;
      default:
        return <span className={`${baseClasses} bg-gray-100 text-gray-800`}>{status}</span>;
    }
  };

  const getAppointmentCount = (tab) => {
    return appointmentsData[tab]?.length || 0;
  };

  const getTabIcon = (tabName) => {
    switch (tabName) {
      case 'upcoming': return <FaCalendarAlt className="mr-2" />;
      case 'requested': return <FaHourglassHalf className="mr-2" />;
      case 'completed': return <FaHistory className="mr-2" />;
      case 'cancelled': return <FaTimes className="mr-2" />;
      default: return <FaCalendarAlt className="mr-2" />;
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

  if (loading) {
    return (
      <div className="min-h-screen bg-white/80 backdrop-blur-md flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
          <p className="mt-4 text-teal-800">Loading appointments...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white/80 backdrop-blur-md">
      <main className="p-6 max-w-7xl mx-auto">

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-teal-800 mb-2">Doctor Appointments</h1>
            <p className="text-teal-700">Manage your patient appointments and schedule</p>
          </div>
          <button
            onClick={() => setActiveAppointmentTab(true)}
            className="flex items-center px-5 py-3 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-colors shadow-md hover:shadow-lg mt-4 sm:mt-0"
          >
            <FaPlus className="mr-2" />
            Schedule New Appointment
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {['upcoming', 'requested', 'completed', 'cancelled'].map((tab) => (
            <div
              key={tab}
              className={`bg-white p-4 rounded-xl shadow-sm border-l-4 ${activeTab === tab
                ? 'border-teal-500 shadow-md'
                : 'border-transparent'
                } cursor-pointer transition-all`}
              onClick={() => setActiveTab(tab)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 capitalize">{tab}</p>
                  <p className="text-2xl font-bold text-teal-800">{getAppointmentCount(tab)}</p>
                </div>
                <div className={`p-3 rounded-full ${tab === 'upcoming' ? 'bg-teal-100 text-teal-600' :
                  tab === 'requested' ? 'bg-yellow-100 text-yellow-600' :
                    tab === 'completed' ? 'bg-green-100 text-green-600' :
                      'bg-red-100 text-red-600'
                  }`}>
                  {getTabIcon(tab)}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search patients or appointment types..."
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600 focus:border-teal-600"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button
              className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              onClick={() => setShowFilters(!showFilters)}
            >
              <FaFilter className="mr-2 text-teal-600" />
              Filters
            </button>
          </div>

          {showFilters && (
            <div className="mt-4 p-4 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Appointment Type</label>
                  <select
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-teal-600 focus:border-teal-600"
                    value={selectedSpecialty}
                    onChange={(e) => setSelectedSpecialty(e.target.value)}
                  >
                    <option value="all">All Types</option>
                    {specialties.map(specialty => (
                      <option key={specialty} value={specialty}>{specialty}</option>
                    ))}
                  </select>
                </div>
               
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-sm border mb-6 overflow-x-auto">
          <div className="flex min-w-max">
            {['upcoming', 'requested', 'completed', 'cancelled'].map((tab) => (
              <button
                key={tab}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors flex items-center ${activeTab === tab
                  ? 'border-teal-600 text-teal-700 bg-teal-50'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                onClick={() => setActiveTab(tab)}
              >
                {getTabIcon(tab)}
                <span className="capitalize">{tab}</span>
                <span className="ml-2 bg-gray-200 text-gray-700 rounded-full px-2 py-0.5 text-xs">
                  {getAppointmentCount(tab)}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          {filteredAppointments.length > 0 ? (
            <div className="space-y-4">
              {filteredAppointments.map(appointment => (
                <div key={appointment._id} className="border rounded-xl p-5 hover:shadow-md transition-shadow bg-gradient-to-r from-white to-teal-50">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mr-4">
                            <FaUserInjured className="text-teal-700 text-xl" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-teal-800">{appointment.patientName}</h3>
                            <div className="flex items-center text-sm text-gray-600 mt-1">
                              <FaStethoscope className="mr-1 text-teal-600" />
                              <span>{appointment.appointmentType}</span>
                              <span className="mx-2 text-gray-400">•</span>
                              <span className="text-teal-700 font-medium">{appointment.status}</span>
                            </div>
                          </div>
                        </div>
                        <div className="hidden lg:flex  items-end">
                          {getStatusBadge(appointment.status)}
                          <span className="mt-2 text-xs text-gray-500 bg-gray-100 rounded-full px-3 py-1">
                            {appointment.appointmentType}
                          </span>
                        </div>

                        
                      </div>

                         
                        

                      <div className="flex flex-wrap items-center gap-4 mt-4">
                        <div className="flex items-center text-sm text-gray-600 bg-teal-50 px-3 py-1.5 rounded-lg">
                          <FaCalendarAlt className="mr-2 text-teal-600" />
                          <span className="font-medium">{formatDate(appointment.date)}</span>
                          
                        </div>
                        <div className="flex items-center   text-sm text-gray-600 bg-teal-50 px-3 py-1.5 rounded-lg">
                          <FaClock className="mr-2 text-teal-600" />
                          <span className="font-medium">{formatTime(appointment.time)}</span>
                        </div>
                      </div>


                      <div className="mt-3 flex gap-10 relative">
                        <div>
                          <h4 className="text-sm font-medium text-gray-700">Reason:</h4>
                          <p className="text-sm text-gray-600">{appointment.reason}</p>
                        </div>

                        <div>
                          {activeNoteId === appointment._id && (
                            <div className="h-[10vh] w-[40vw] p-2 absolute bg-white bottom-10 left-100 shadow-lg rounded-lg border">
                              <h1 className="text-sm font-medium text-gray-700 mb-2">Notes</h1>
                              <input
                                type="text"
                                placeholder="Write a note"
                                className="w-full border px-2 py-1 rounded-md text-sm"
                                value={noteText}
                                onChange={(e) => setNoteText(e.target.value)}
                              />
                              <div className="flex gap-2 mt-2">
                                <button
                                  onClick={() => handleSaveNote(appointment._id)}
                                  className="bg-teal-600 text-white px-3 py-1 rounded-md text-xs"
                                >
                                  Save
                                </button>
                                <button
                                  onClick={() => { setActiveNoteId(null); setNoteText(""); }}
                                  className="bg-gray-300 text-black px-3 py-1 rounded-md text-xs"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                    </div>


                    <div>
                      <RescheduleAppoinmet
                        isOpen={activeReschedule}
                        onClose={() => setActiveReschedule(false)}
                        scheduleData={appointment}
                      />

                    </div>

                    <div className="hidden lg:flex flex-col items-end gap-3 mt-4 lg:mt-0">
                      <div className="flex gap-2">
                        {activeTab === 'upcoming' && (
                          <>
                            <button
                              onClick={() => handleCheckin(appointment._id)}
                              className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors flex items-center shadow-sm">
                              <FaCheck className="mr-1" /> Check In
                            </button>
                            <button
                              onClick={() => setActiveReschedule(true)}
                              className="px-4 py-2 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50 transition-colors">
                              Reschedule
                            </button>
                            <button
                              onClick={() => { setActiveNoteId(appointment._id); setNoteText(appointment.notes || ""); }}
                              className="px-4 py-2 bg-teal-600 text-white text-sm rounded-lg hover:bg-teal-700 transition-colors flex items-center">
                              <FaNotesMedical className="mr-1" /> Notes
                            </button>

                          </>
                        )}
                        {activeTab === 'requested' && (
                          <>
                            <button
                              onClick={() => handleApprove(appointment._id)}
                              className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors flex items-center">
                              <FaCheck className="mr-1" /> Approve
                            </button>
                            <button
                              onClick={() => handleDecline(appointment._id)}
                              className="px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors flex items-center">
                              <FaTimes className="mr-1" /> Decline
                            </button>
                          </>
                        )}
                        {activeTab === 'completed' && (
                          <button
                           className="px-4 py-2 bg-teal-600 text-white text-sm rounded-lg hover:bg-teal-700 transition-colors flex items-center">
                            <FaFileMedical className="mr-1" /> View Details
                          </button>
                        )}
                        {activeTab === 'cancelled' && (
                          <button
                            onClick={() => setActiveReschedule(true)}
                            className="px-4 py-2 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50 transition-colors">
                            Reschedule
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Mobile action buttons */}
                  <div className="mt-4 flex flex-col sm:flex-row gap-2 lg:hidden">
                    <div className="flex justify-between items-center mb-2 sm:hidden">
                      {getStatusBadge(appointment.status)}
                      <span className="text-xs text-gray-500 bg-gray-100 rounded-full px-2 py-1">
                        {appointment.appointmentType}
                      </span>
                    </div>
                    {activeTab === 'upcoming' && (
                      <>
                        <button
                          onClick={() => handleCheckin(appointment._id)}
                          className="flex-1 px-3 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center">
                          <FaCheck className="mr-1" /> Check In
                        </button>
                        <button
                          onClick={() => setActiveReschedule(true)}
                          className="flex-1 px-3 py-2 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50 transition-colors">
                          Reschedule
                        </button>
                        <button
                          onClick={() => { setActiveNoteId(appointment._id); setNoteText(appointment.notes || ""); }}

                          className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center">
                          <FaNotesMedical className="mr-1" /> Notes
                        </button>

                      </>
                    )}
                    {activeTab === 'requested' && (
                      <>
                        <button
                          onClick={() => handleApprove(appointment._id)}
                          className="flex-1 px-3 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center">
                          <FaCheck className="mr-1" /> Approve
                        </button>
                        <button
                          onClick={() => handleDecline(appointment._id)}
                          className="flex-1 px-3 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center">
                          <FaTimes className="mr-1" /> Decline
                        </button>
                      </>
                    )}
                    {activeTab === 'completed' && (
                      <button className="flex-1 px-3 py-2 bg-teal-600 text-white text-sm rounded-lg hover:bg-teal-700 transition-colors flex items-center justify-center">
                        <FaFileMedical className="mr-1" /> View Details
                      </button>
                    )}
                    {activeTab === 'cancelled' && (
                      <button
                        onClick={() => setActiveReschedule(true)}
                        className="flex-1 px-3 py-2 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50 transition-colors">
                        Reschedule
                      </button>
                    )}
                  </div>
                </div>
              ))}


            </div>
          ) : (
            <div className="text-center py-12">
              <div className="bg-teal-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaCalendarAlt className="text-teal-600 text-3xl" />
              </div>
              <h3 className="text-lg font-medium text-gray-700 mb-2">No {activeTab} appointments</h3>
              <p className="text-gray-500 mb-6">You don't have any {activeTab} appointments matching your criteria.</p>
            </div>
          )}
        </div>

        <SetAppointments
          isOpen={activeAppointmentTab}
          onClose={() => setActiveAppointmentTab(false)}
        />
      </main>


    </div>
  );
};

export default Appointments;