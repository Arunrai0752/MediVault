import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Appointments = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  
  // Sample appointment data
  const appointments = {
    upcoming: [
      {
        id: 1,
        patientName: 'Sarah Johnson',
        doctor: 'Dr. Michael Chen',
        specialty: 'Cardiology',
        date: '2023-11-15',
        time: '10:30 AM',
        status: 'confirmed',
        type: 'Follow-up'
      },
      {
        id: 2,
        patientName: 'Robert Williams',
        doctor: 'Dr. Emily Rodriguez',
        specialty: 'Dermatology',
        date: '2023-11-17',
        time: '2:15 PM',
        status: 'confirmed',
        type: 'Consultation'
      }
    ],
    pending: [
      {
        id: 3,
        patientName: 'James Wilson',
        doctor: 'Dr. Lisa Thompson',
        specialty: 'Orthopedics',
        date: '2023-11-20',
        time: '9:00 AM',
        status: 'pending',
        type: 'New Patient'
      }
    ],
    completed: [
      {
        id: 4,
        patientName: 'Maria Garcia',
        doctor: 'Dr. David Kim',
        specialty: 'Pediatrics',
        date: '2023-11-05',
        time: '11:45 AM',
        status: 'completed',
        type: 'Vaccination'
      }
    ],
    declined: [
      {
        id: 5,
        patientName: 'Thomas Moore',
        doctor: 'Dr. Jennifer Lee',
        specialty: 'Neurology',
        date: '2023-11-12',
        time: '3:30 PM',
        status: 'declined',
        type: 'Consultation'
      }
    ]
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'confirmed':
        return <span className="badge badge-success badge-sm">Confirmed</span>;
      case 'pending':
        return <span className="badge badge-warning badge-sm">Pending</span>;
      case 'completed':
        return <span className="badge badge-info badge-sm">Completed</span>;
      case 'declined':
        return <span className="badge badge-error badge-sm">Declined</span>;
      default:
        return <span className="badge badge-neutral badge-sm">Scheduled</span>;
    }
  };

  const getAppointmentCount = (tab) => {
    return appointments[tab]?.length || 0;
  };

  return (
    <>
      <main className="p-6 bg-base-200 min-h-screen">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-primary">Appointments</h1>
          <Link to="/schedule-appointment" className="btn flex  btn-primary">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Schedule New Appointment
          </Link>
        </div>

        {/* Tabs Navigation */}
        <div className="bg-base-100 rounded-lg shadow mb-6">
          <div className="tabs tabs-boxed w-full justify-start">
            <button 
              className={`tab ${activeTab === 'upcoming' ? 'tab-active' : ''}`}
              onClick={() => setActiveTab('upcoming')}
            >
              Upcoming
              <span className="badge badge-sm badge-neutral ml-2">{getAppointmentCount('upcoming')}</span>
            </button>
            <button 
              className={`tab ${activeTab === 'pending' ? 'tab-active' : ''}`}
              onClick={() => setActiveTab('pending')}
            >
              Pending
              <span className="badge badge-sm badge-neutral ml-2">{getAppointmentCount('pending')}</span>
            </button>
            <button 
              className={`tab ${activeTab === 'completed' ? 'tab-active' : ''}`}
              onClick={() => setActiveTab('completed')}
            >
              Completed
              <span className="badge badge-sm badge-neutral ml-2">{getAppointmentCount('completed')}</span>
            </button>
            <button 
              className={`tab ${activeTab === 'declined' ? 'tab-active' : ''}`}
              onClick={() => setActiveTab('declined')}
            >
              Declined
              <span className="badge badge-sm badge-neutral ml-2">{getAppointmentCount('declined')}</span>
            </button>
          </div>
        </div>

        {/* Appointments List */}
        <div className="bg-base-100 rounded-lg shadow p-6">
          {appointments[activeTab]?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
              {appointments[activeTab].map(appointment => (
                <div key={appointment.id} className="card bg-base-100 shadow-md border">
                  <div className="card-body p-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div className="flex-1">
                        <h3 className="card-title text-lg">{appointment.patientName}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="font-semibold">{appointment.doctor}</span>
                          <span className="text-neutral">•</span>
                          <span className="text-base-content/70">{appointment.specialty}</span>
                        </div>
                        <div className="flex items-center gap-4 mt-3">
                          <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span className="text-sm">{appointment.date}</span>
                          </div>
                          <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-sm">{appointment.time}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-end gap-2 mt-4 md:mt-0">
                        {getStatusBadge(appointment.status)}
                        <span className="badge badge-outline badge-sm">{appointment.type}</span>
                        
                        <div className="flex gap-2 mt-2">
                          {activeTab === 'upcoming' && (
                            <>
                              <button className="btn btn-success btn-xs">Check In</button>
                              <button className="btn btn-outline btn-xs">Reschedule</button>
                            </>
                          )}
                          {activeTab === 'pending' && (
                            <>
                              <button className="btn btn-success btn-xs">Approve</button>
                              <button className="btn btn-error btn-xs">Decline</button>
                            </>
                          )}
                          {activeTab === 'completed' && (
                            <button className="btn btn-primary btn-xs">View Details</button>
                          )}
                          {activeTab === 'declined' && (
                            <button className="btn btn-outline btn-xs">Reschedule</button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-base-content/30 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <h3 className="text-lg font-medium text-base-content/70 mb-2">No {activeTab} appointments</h3>
              <p className="text-base-content/50">You don't have any {activeTab} appointments at this time.</p>
              {activeTab === 'upcoming' && (
                <Link to="/schedule-appointment" className="btn btn-primary mt-4">
                  Schedule Your First Appointment
                </Link>
              )}
            </div>
          )}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="stats bg-base-100 shadow">
            <div className="stat">
              <div className="stat-title">Total Appointments</div>
              <div className="stat-value text-primary">12</div>
              <div className="stat-desc">This month</div>
            </div>
          </div>
          
          <div className="stats bg-base-100 shadow">
            <div className="stat">
              <div className="stat-title">Upcoming</div>
              <div className="stat-value text-info">2</div>
              <div className="stat-desc">Next 7 days</div>
            </div>
          </div>
          
          <div className="stats bg-base-100 shadow">
            <div className="stat">
              <div className="stat-title">Completed</div>
              <div className="stat-value text-success">8</div>
              <div className="stat-desc">This month</div>
            </div>
          </div>
          
          <div className="stats bg-base-100 shadow">
            <div className="stat">
              <div className="stat-title">Cancellation Rate</div>
              <div className="stat-value text-error">8%</div>
              <div className="stat-desc">Lower than average</div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Appointments;