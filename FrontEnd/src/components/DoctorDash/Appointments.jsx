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

const specializationThemes = {
  "General Physician": {
    primary: "bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 shadow-lg",
    secondary: "bg-emerald-50 text-emerald-800 border-emerald-200",
    accent: "text-emerald-600",
    border: "border-emerald-200",
    gradient: "from-emerald-50 via-green-50 to-teal-50",
    text: "text-emerald-700",
    lightBg: "bg-emerald-50",
    mediumBg: "bg-emerald-100"
  },
  "Dentist": {
    primary: "bg-gradient-to-r from-blue-500 to-sky-600 hover:from-blue-600 hover:to-sky-700 shadow-lg",
    secondary: "bg-blue-50 text-blue-800 border-blue-200",
    accent: "text-blue-600",
    border: "border-blue-200",
    gradient: "from-blue-50 via-sky-50 to-cyan-50",
    text: "text-blue-700",
    lightBg: "bg-blue-50",
    mediumBg: "bg-blue-100"
  },
  "Cardiologist": {
    primary: "bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 shadow-lg",
    secondary: "bg-red-50 text-red-800 border-red-200",
    accent: "text-red-600",
    border: "border-red-200",
    gradient: "from-red-50 via-rose-50 to-pink-50",
    text: "text-red-700",
    lightBg: "bg-red-50",
    mediumBg: "bg-red-100"
  },
  "Dermatologist": {
    primary: "bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 shadow-lg",
    secondary: "bg-pink-50 text-pink-800 border-pink-200",
    accent: "text-pink-600",
    border: "border-pink-200",
    gradient: "from-pink-50 via-rose-50 to-fuchsia-50",
    text: "text-pink-700",
    lightBg: "bg-pink-50",
    mediumBg: "bg-pink-100"
  },
  "ENT": {
    primary: "bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 shadow-lg",
    secondary: "bg-amber-50 text-amber-800 border-amber-200",
    accent: "text-amber-600",
    border: "border-amber-200",
    gradient: "from-amber-50 via-yellow-50 to-orange-50",
    text: "text-amber-700",
    lightBg: "bg-amber-50",
    mediumBg: "bg-amber-100"
  },
  "Orthopedic": {
    primary: "bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 shadow-lg",
    secondary: "bg-purple-50 text-purple-800 border-purple-200",
    accent: "text-purple-600",
    border: "border-purple-200",
    gradient: "from-purple-50 via-violet-50 to-indigo-50",
    text: "text-purple-700",
    lightBg: "bg-purple-50",
    mediumBg: "bg-purple-100"
  },
  "Pediatrician": {
    primary: "bg-gradient-to-r from-cyan-500 to-sky-600 hover:from-cyan-600 hover:to-sky-700 shadow-lg",
    secondary: "bg-cyan-50 text-cyan-800 border-cyan-200",
    accent: "text-cyan-600",
    border: "border-cyan-200",
    gradient: "from-cyan-50 via-sky-50 to-blue-50",
    text: "text-cyan-700",
    lightBg: "bg-cyan-50",
    mediumBg: "bg-cyan-100"
  },
  "Psychiatrist": {
    primary: "bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 shadow-lg",
    secondary: "bg-indigo-50 text-indigo-800 border-indigo-200",
    accent: "text-indigo-600",
    border: "border-indigo-200",
    gradient: "from-indigo-50 via-blue-50 to-purple-50",
    text: "text-indigo-700",
    lightBg: "bg-indigo-50",
    mediumBg: "bg-indigo-100"
  },
  "Gynecologist": {
    primary: "bg-gradient-to-r from-fuchsia-500 to-pink-600 hover:from-fuchsia-600 hover:to-pink-700 shadow-lg",
    secondary: "bg-fuchsia-50 text-fuchsia-800 border-fuchsia-200",
    accent: "text-fuchsia-600",
    border: "border-fuchsia-200",
    gradient: "from-fuchsia-50 via-pink-50 to-rose-50",
    text: "text-fuchsia-700",
    lightBg: "bg-fuchsia-50",
    mediumBg: "bg-fuchsia-100"
  },
  "Neurologist": {
    primary: "bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 shadow-lg",
    secondary: "bg-violet-50 text-violet-800 border-violet-200",
    accent: "text-violet-600",
    border: "border-violet-200",
    gradient: "from-violet-50 via-purple-50 to-indigo-50",
    text: "text-violet-700",
    lightBg: "bg-violet-50",
    mediumBg: "bg-violet-100"
  },
  "Ophthalmologist": {
    primary: "bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 shadow-lg",
    secondary: "bg-amber-50 text-amber-800 border-amber-200",
    accent: "text-amber-600",
    border: "border-amber-200",
    gradient: "from-amber-50 via-yellow-50 to-lime-50",
    text: "text-amber-700",
    lightBg: "bg-amber-50",
    mediumBg: "bg-amber-100"
  },
  "Oncologist": {
    primary: "bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 shadow-lg",
    secondary: "bg-rose-50 text-rose-800 border-rose-200",
    accent: "text-rose-600",
    border: "border-rose-200",
    gradient: "from-rose-50 via-pink-50 to-red-50",
    text: "text-rose-700",
    lightBg: "bg-rose-50",
    mediumBg: "bg-rose-100"
  },
  "Pulmonologist": {
    primary: "bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 shadow-lg",
    secondary: "bg-teal-50 text-teal-800 border-teal-200",
    accent: "text-teal-600",
    border: "border-teal-200",
    gradient: "from-teal-50 via-emerald-50 to-green-50",
    text: "text-teal-700",
    lightBg: "bg-teal-50",
    mediumBg: "bg-teal-100"
  },
  "Urologist": {
    primary: "bg-gradient-to-r from-lime-500 to-green-600 hover:from-lime-600 hover:to-green-700 shadow-lg",
    secondary: "bg-lime-50 text-lime-800 border-lime-200",
    accent: "text-lime-600",
    border: "border-lime-200",
    gradient: "from-lime-50 via-green-50 to-emerald-50",
    text: "text-lime-700",
    lightBg: "bg-lime-50",
    mediumBg: "bg-lime-100"
  },
  "Gastroenterologist": {
    primary: "bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-lg",
    secondary: "bg-emerald-50 text-emerald-800 border-emerald-200",
    accent: "text-emerald-600",
    border: "border-emerald-200",
    gradient: "from-emerald-50 via-teal-50 to-cyan-50",
    text: "text-emerald-700",
    lightBg: "bg-emerald-50",
    mediumBg: "bg-emerald-100"
  },
  "Nephrologist": {
    primary: "bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 shadow-lg",
    secondary: "bg-sky-50 text-sky-800 border-sky-200",
    accent: "text-sky-600",
    border: "border-sky-200",
    gradient: "from-sky-50 via-blue-50 to-indigo-50",
    text: "text-sky-700",
    lightBg: "bg-sky-50",
    mediumBg: "bg-sky-100"
  },
  "Endocrinologist": {
    primary: "bg-gradient-to-r from-fuchsia-500 to-purple-600 hover:from-fuchsia-600 hover:to-purple-700 shadow-lg",
    secondary: "bg-fuchsia-50 text-fuchsia-800 border-fuchsia-200",
    accent: "text-fuchsia-600",
    border: "border-fuchsia-200",
    gradient: "from-fuchsia-50 via-purple-50 to-violet-50",
    text: "text-fuchsia-700",
    lightBg: "bg-fuchsia-50",
    mediumBg: "bg-fuchsia-100"
  },
  "Hematologist": {
    primary: "bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 shadow-lg",
    secondary: "bg-red-50 text-red-800 border-red-200",
    accent: "text-red-600",
    border: "border-red-200",
    gradient: "from-red-50 via-rose-50 to-pink-50",
    text: "text-red-700",
    lightBg: "bg-red-50",
    mediumBg: "bg-red-100"
  },
  "Rheumatologist": {
    primary: "bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 shadow-lg",
    secondary: "bg-purple-50 text-purple-800 border-purple-200",
    accent: "text-purple-600",
    border: "border-purple-200",
    gradient: "from-purple-50 via-violet-50 to-indigo-50",
    text: "text-purple-700",
    lightBg: "bg-purple-50",
    mediumBg: "bg-purple-100"
  },
  "Plastic Surgeon": {
    primary: "bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 shadow-lg",
    secondary: "bg-pink-50 text-pink-800 border-pink-200",
    accent: "text-pink-600",
    border: "border-pink-200",
    gradient: "from-pink-50 via-rose-50 to-fuchsia-50",
    text: "text-pink-700",
    lightBg: "bg-pink-50",
    mediumBg: "bg-pink-100"
  },
  "Anesthesiologist": {
    primary: "bg-gradient-to-r from-slate-500 to-gray-600 hover:from-slate-600 hover:to-gray-700 shadow-lg",
    secondary: "bg-slate-50 text-slate-800 border-slate-200",
    accent: "text-slate-600",
    border: "border-slate-200",
    gradient: "from-slate-50 via-gray-50 to-zinc-50",
    text: "text-slate-700",
    lightBg: "bg-slate-50",
    mediumBg: "bg-slate-100"
  },
  "Radiologist": {
    primary: "bg-gradient-to-r from-blue-500 to-sky-600 hover:from-blue-600 hover:to-sky-700 shadow-lg",
    secondary: "bg-blue-50 text-blue-800 border-blue-200",
    accent: "text-blue-600",
    border: "border-blue-200",
    gradient: "from-blue-50 via-sky-50 to-cyan-50",
    text: "text-blue-700",
    lightBg: "bg-blue-50",
    mediumBg: "bg-blue-100"
  },
  "Pathologist": {
    primary: "bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 shadow-lg",
    secondary: "bg-indigo-50 text-indigo-800 border-indigo-200",
    accent: "text-indigo-600",
    border: "border-indigo-200",
    gradient: "from-indigo-50 via-blue-50 to-purple-50",
    text: "text-indigo-700",
    lightBg: "bg-indigo-50",
    mediumBg: "bg-indigo-100"
  }
};


  const specialization = user.specialization || "General Physician";
  const theme = specializationThemes[specialization] || specializationThemes["General Physician"];
  
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
        return <span className={`${baseClasses} ${theme.secondary}`}><FaCheckCircle className="mr-1" /> Confirmed</span>;
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
      <div className={`min-h-screen bg-white/80 backdrop-blur-md flex items-center justify-center ${theme.lightBg}`}>
        <div className="text-center">
          <div className={`animate-spin rounded-full h-12 w-12 border-b-2 ${theme.primary.split(' ')[0]} mx-auto`}></div>
          <p className={`mt-4 ${theme.text}`}>Loading appointments...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-white/80 backdrop-blur-md ${theme.lightBg}`}>
      <main className="p-6 max-w-7xl mx-auto">

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className={`text-3xl font-bold ${theme.text} mb-2`}>Doctor Appointments</h1>
            <p className={theme.text}>Manage your patient appointments and schedule</p>
          </div>
          <button
            onClick={() => setActiveAppointmentTab(true)}
            className={`flex items-center px-5 py-3 ${theme.primary} text-white rounded-xl transition-colors shadow-md hover:shadow-lg mt-4 sm:mt-0`}
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
                ? `${theme.primary.split(' ')[0]} shadow-md`
                : 'border-transparent'
                } cursor-pointer transition-all`}
              onClick={() => setActiveTab(tab)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 capitalize">{tab}</p>
                  <p className={`text-2xl font-bold ${theme.text}`}>{getAppointmentCount(tab)}</p>
                </div>
                <div className={`p-3 rounded-full ${tab === 'upcoming' ? `${theme.secondary.split(' ')[0]} ${theme.accent}` :
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
                className={`pl-10 pr-4 py-2 w-full border ${theme.border} rounded-lg focus:ring-2 ${theme.primary.split(' ')[0]} focus:border-teal-600`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button
              className={`flex items-center px-4 py-2 border ${theme.border} rounded-lg hover:${theme.secondary.split(' ')[0]}`}
              onClick={() => setShowFilters(!showFilters)}
            >
              <FaFilter className={`mr-2 ${theme.accent}`} />
              Filters
            </button>
          </div>

          {showFilters && (
            <div className={`mt-4 p-4 border-t ${theme.border}`}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Appointment Type</label>
                  <select
                    className={`w-full border ${theme.border} rounded-lg p-2 focus:ring-2 ${theme.primary.split(' ')[0]} focus:border-teal-600`}
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
                  ? `${theme.primary.split(' ')[0]} ${theme.text} ${theme.secondary.split(' ')[0]}`
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
                <div key={appointment._id} className={`border ${theme.border} rounded-xl p-5 hover:shadow-md transition-shadow bg-gradient-to-r from-white to-${theme.secondary.split(' ')[0]}`}>
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className={`w-12 h-12 ${theme.secondary.split(' ')[0]} rounded-full flex items-center justify-center mr-4`}>
                            <FaUserInjured className={`${theme.accent} text-xl`} />
                          </div>
                          <div>
                            <h3 className={`text-lg font-semibold ${theme.text}`}>{appointment.patientName}</h3>
                            <div className="flex items-center text-sm text-gray-600 mt-1">
                              <FaStethoscope className={`mr-1 ${theme.accent}`} />
                              <span>{appointment.appointmentType}</span>
                              <span className="mx-2 text-gray-400">•</span>
                              <span className={`${theme.text} font-medium`}>{appointment.status}</span>
                            </div>
                          </div>
                        </div>
                        <div className="hidden lg:flex  items-end">
                          {getStatusBadge(appointment.status)}
                          <span className={`mt-2 text-xs text-gray-500 ${theme.secondary.split(' ')[0]} rounded-full px-3 py-1`}>
                            {appointment.appointmentType}
                          </span>
                        </div>

                        
                      </div>

                         
                        

                      <div className="flex flex-wrap items-center gap-4 mt-4">
                        <div className={`flex items-center text-sm text-gray-600 ${theme.secondary} px-3 py-1.5 rounded-lg`}>
                          <FaCalendarAlt className={`mr-2 ${theme.accent}`} />
                          <span className="font-medium">{formatDate(appointment.date)}</span>
                          
                        </div>
                        <div className={`flex items-center text-sm text-gray-600 ${theme.secondary} px-3 py-1.5 rounded-lg`}>
                          <FaClock className={`mr-2 ${theme.accent}`} />
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
                                  className={`${theme.primary} text-white px-3 py-1 rounded-md text-xs`}
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
                              className={`px-4 py-2 ${theme.primary} text-white text-sm rounded-lg transition-colors flex items-center shadow-sm`}>
                              <FaCheck className="mr-1" /> Check In
                            </button>
                            <button
                              onClick={() => setActiveReschedule(true)}
                              className={`px-4 py-2 border ${theme.border} ${theme.text} text-sm rounded-lg hover:${theme.secondary.split(' ')[0]} transition-colors`}>
                              Reschedule
                            </button>
                            <button
                              onClick={() => { setActiveNoteId(appointment._id); setNoteText(appointment.notes || ""); }}
                              className={`px-4 py-2 ${theme.primary} text-white text-sm rounded-lg transition-colors flex items-center`}>
                              <FaNotesMedical className="mr-1" /> Notes
                            </button>

                          </>
                        )}
                        {activeTab === 'requested' && (
                          <>
                            <button
                              onClick={() => handleApprove(appointment._id)}
                              className={`px-4 py-2 ${theme.primary} text-white text-sm rounded-lg transition-colors flex items-center`}>
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
                           className={`px-4 py-2 ${theme.primary} text-white text-sm rounded-lg transition-colors flex items-center`}>
                            <FaFileMedical className="mr-1" /> View Details
                          </button>
                        )}
                        {activeTab === 'cancelled' && (
                          <button
                            onClick={() => setActiveReschedule(true)}
                            className={`px-4 py-2 border ${theme.border} ${theme.text} text-sm rounded-lg hover:${theme.secondary.split(' ')[0]} transition-colors`}>
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
                      <span className={`text-xs text-gray-500 ${theme.secondary.split(' ')[0]} rounded-full px-2 py-1`}>
                        {appointment.appointmentType}
                      </span>
                    </div>
                    {activeTab === 'upcoming' && (
                      <>
                        <button
                          onClick={() => handleCheckin(appointment._id)}
                          className={`flex-1 px-3 py-2 ${theme.primary} text-white text-sm rounded-lg transition-colors flex items-center justify-center`}>
                          <FaCheck className="mr-1" /> Check In
                        </button>
                        <button
                          onClick={() => setActiveReschedule(true)}
                          className={`flex-1 px-3 py-2 border ${theme.border} ${theme.text} text-sm rounded-lg hover:${theme.secondary.split(' ')[0]} transition-colors`}>
                          Reschedule
                        </button>
                        <button
                          onClick={() => { setActiveNoteId(appointment._id); setNoteText(appointment.notes || ""); }}

                          className={`flex-1 px-3 py-2 ${theme.primary} text-white text-sm rounded-lg transition-colors flex items-center justify-center`}>
                          <FaNotesMedical className="mr-1" /> Notes
                        </button>

                      </>
                    )}
                    {activeTab === 'requested' && (
                      <>
                        <button
                          onClick={() => handleApprove(appointment._id)}
                          className={`flex-1 px-3 py-2 ${theme.primary} text-white text-sm rounded-lg transition-colors flex items-center justify-center`}>
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
                      <button className={`flex-1 px-3 py-2 ${theme.primary} text-white text-sm rounded-lg transition-colors flex items-center justify-center`}>
                        <FaFileMedical className="mr-1" /> View Details
                      </button>
                    )}
                    {activeTab === 'cancelled' && (
                      <button
                        onClick={() => setActiveReschedule(true)}
                        className={`flex-1 px-3 py-2 border ${theme.border} ${theme.text} text-sm rounded-lg hover:${theme.secondary.split(' ')[0]} transition-colors`}>
                        Reschedule
                      </button>
                    )}
                  </div>
                </div>
              ))}


            </div>
          ) : (
            <div className="text-center py-12">
              <div className={`${theme.secondary.split(' ')[0]} w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4`}>
                <FaCalendarAlt className={`${theme.accent} text-3xl`} />
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