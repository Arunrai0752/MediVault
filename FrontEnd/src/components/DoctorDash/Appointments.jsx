import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaCalendarAlt,
  FaClock,
  FaUserInjured,
  FaStethoscope,
  FaHospital,
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
import SetAppoinments from './SetAppoinments';


const Appointments = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [activeAppoinmentTab, setActiveAppoinmentTab] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');

  
  const appointments = {
    upcoming: [
      ],
    pending: [
      ],
    completed: [
    ],
    declined: [
     ],
  };

  const specialties = [...new Set(
    Object.values(appointments).flat().map(apt => apt.specialty)
  )];

  const filteredAppointments = appointments[activeTab].filter(apt => {
    const matchesSearch = apt.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.doctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecialty = selectedSpecialty === 'all' || apt.specialty === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  const getStatusBadge = (status) => {
    const baseClasses = "px-3 py-1 rounded-full text-xs font-medium flex items-center";

    switch (status) {
      case 'confirmed':
        return <span className={`${baseClasses} bg-green-100 text-green-800`}><FaCheckCircle className="mr-1" /> Confirmed</span>;
      case 'pending':
        return <span className={`${baseClasses} bg-yellow-100 text-yellow-800`}><FaHourglassHalf className="mr-1" /> Pending</span>;
      case 'completed':
        return <span className={`${baseClasses} bg-blue-100 text-blue-800`}><FaCheck className="mr-1" /> Completed</span>;
      case 'declined':
        return <span className={`${baseClasses} bg-red-100 text-red-800`}><FaTimes className="mr-1" /> Declined</span>;
      default:
        return <span className={`${baseClasses} bg-gray-100 text-gray-800`}>Scheduled</span>;
    }
  };

  const getAppointmentCount = (tab) => {
    return appointments[tab]?.length || 0;
  };

  const getTabIcon = (tabName) => {
    switch (tabName) {
      case 'upcoming': return <FaCalendarAlt className="mr-2" />;
      case 'pending': return <FaHourglassHalf className="mr-2" />;
      case 'completed': return <FaHistory className="mr-2" />;
      case 'declined': return <FaTimes className="mr-2" />;
      default: return <FaCalendarAlt className="mr-2" />;
    }
  };

  const formatDate = (dateString) => {
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      <main className="p-6 max-w-7xl mx-auto">

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-blue-900 mb-2">Appointments</h1>
            <p className="text-blue-700">Manage your patient appointments and schedule</p>
          </div>
          <Link
            onClick={() => setActiveAppoinmentTab(true)}
            className="flex items-center px-5 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg mt-4 sm:mt-0"
          >
            <FaPlus className="mr-2" />
            Schedule New Appointment
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {['upcoming', 'pending', 'completed', 'declined'].map((tab) => (
            <div
              key={tab}
              className={`bg-white p-4 rounded-xl shadow-sm border-l-4 ${activeTab === tab
                  ? 'border-blue-500 shadow-md'
                  : 'border-transparent'
                } cursor-pointer transition-all`}
              onClick={() => setActiveTab(tab)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 capitalize">{tab}</p>
                  <p className="text-2xl font-bold text-blue-900">{getAppointmentCount(tab)}</p>
                </div>
                <div className={`p-3 rounded-full ${tab === 'upcoming' ? 'bg-blue-100 text-blue-600' :
                    tab === 'pending' ? 'bg-yellow-100 text-yellow-600' :
                      tab === 'completed' ? 'bg-green-100 text-green-600' :
                        'bg-red-100 text-red-600'
                  }`}>
                  {getTabIcon(tab)}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-xl shadow-sm border p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search patients, doctors, or appointment types..."
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button
              className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              onClick={() => setShowFilters(!showFilters)}
            >
              <FaFilter className="mr-2 text-blue-600" />
              Filters
            </button>
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <div className="mt-4 p-4 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Specialty</label>
                  <select
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={selectedSpecialty}
                    onChange={(e) => setSelectedSpecialty(e.target.value)}
                  >
                    <option value="all">All Specialties</option>
                    {specialties.map(specialty => (
                      <option key={specialty} value={specialty}>{specialty}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
                  <select className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option>All Dates</option>
                    <option>Today</option>
                    <option>This Week</option>
                    <option>This Month</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Appointment Type</label>
                  <select className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option>All Types</option>
                    <option>Consultation</option>
                    <option>Follow-up</option>
                    <option>Check-up</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-sm border mb-6 overflow-x-auto">
          <div className="flex min-w-max">
            {['upcoming', 'pending', 'completed', 'declined'].map((tab) => (
              <button
                key={tab}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors flex items-center ${activeTab === tab
                    ? 'border-blue-500 text-blue-600 bg-blue-50'
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

        {/* Appointments List */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          {filteredAppointments.length > 0 ? (
            <div className="space-y-4">
              {filteredAppointments.map(appointment => (
                <div key={appointment.id} className="border rounded-xl p-5 hover:shadow-md transition-shadow bg-gradient-to-r from-white to-blue-50">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                            <FaUserInjured className="text-blue-600 text-xl" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-blue-900">{appointment.patientName}</h3>
                            <div className="flex items-center text-sm text-gray-600 mt-1">
                              <FaStethoscope className="mr-1 text-blue-500" />
                              <span>{appointment.doctor}</span>
                              <span className="mx-2 text-gray-400">•</span>
                              <FaHospital className="mr-1 text-blue-500" />
                              <span>{appointment.specialty}</span>
                            </div>
                          </div>
                        </div>
                        <div className="hidden lg:flex flex-col items-end">
                          {getStatusBadge(appointment.status)}
                          <span className="mt-2 text-xs text-gray-500 bg-gray-100 rounded-full px-3 py-1">
                            {appointment.type}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 mt-4">
                        <div className="flex items-center text-sm text-gray-600 bg-blue-50 px-3 py-1.5 rounded-lg">
                          <FaCalendarAlt className="mr-2 text-blue-500" />
                          <span className="font-medium">{formatDate(appointment.date)}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600 bg-blue-50 px-3 py-1.5 rounded-lg">
                          <FaClock className="mr-2 text-blue-500" />
                          <span className="font-medium">{appointment.time}</span>
                        </div>
                      </div>
                    </div>

                    <div className="hidden lg:flex flex-col items-end gap-3 mt-4 lg:mt-0">
                      <div className="flex gap-2">
                        {activeTab === 'upcoming' && (
                          <>
                            <button className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors flex items-center shadow-sm">
                              <FaCheck className="mr-1" /> Check In
                            </button>
                            <button className="px-4 py-2 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50 transition-colors">
                              Reschedule
                            </button>
                            <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                              <FaNotesMedical className="mr-1" /> Notes
                            </button>
                          </>
                        )}
                        {activeTab === 'pending' && (
                          <>
                            <button className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors flex items-center">
                              <FaCheck className="mr-1" /> Approve
                            </button>
                            <button className="px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors flex items-center">
                              <FaTimes className="mr-1" /> Decline
                            </button>
                          </>
                        )}
                        {activeTab === 'completed' && (
                          <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                            <FaFileMedical className="mr-1" /> View Details
                          </button>
                        )}
                        {activeTab === 'declined' && (
                          <button className="px-4 py-2 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50 transition-colors">
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
                        {appointment.type}
                      </span>
                    </div>
                    {activeTab === 'upcoming' && (
                      <>
                        <button className="flex-1 px-3 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center">
                          <FaCheck className="mr-1" /> Check In
                        </button>
                        <button className="flex-1 px-3 py-2 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50 transition-colors">
                          Reschedule
                        </button>
                        <button className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center">
                          <FaNotesMedical className="mr-1" /> Notes
                        </button>
                      </>
                    )}
                    {activeTab === 'pending' && (
                      <>
                        <button className="flex-1 px-3 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center">
                          <FaCheck className="mr-1" /> Approve
                        </button>
                        <button className="flex-1 px-3 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center">
                          <FaTimes className="mr-1" /> Decline
                        </button>
                      </>
                    )}
                    {activeTab === 'completed' && (
                      <button className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center">
                        <FaFileMedical className="mr-1" /> View Details
                      </button>
                    )}
                    {activeTab === 'declined' && (
                      <button className="flex-1 px-3 py-2 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50 transition-colors">
                        Reschedule
                      </button>
                    )}
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
              <p className="text-gray-500 mb-6">You don't have any {activeTab} appointments matching your criteria.</p>
              {activeTab === 'upcoming' && (
                <Link to="/schedule-appointment" className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <FaPlus className="mr-2" />
                  Schedule Your First Appointment
                </Link>
              )}
            </div>
          )}
        </div>

        <SetAppoinments
          isOpen={activeAppoinmentTab}
          onClose={() => setActiveAppoinmentTab(false)}
        />
      </main>
    </div>
  );
};

export default Appointments;