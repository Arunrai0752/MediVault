import React from 'react';
import { 
  Calendar, 
  Users, 
  FileText, 
  DollarSign, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Plus,
  Upload,
  Eye
} from 'lucide-react';
import api from '../../../../Configs/api';
import { useAuth } from '../../../Context/authContext';


const Dashboard = () => {
  const { user } = useAuth();

  console.log(user);
  


  const TotalAppoinments = async  () => {

    const res = await api.get()


  }
 


  const statsData = [
    {
      title: 'Total Appointments',
      value: '156',
      icon: Calendar,
      color: 'bg-blue-500',
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Pending Consultations',
      value: '12',
      icon: Clock,
      color: 'bg-amber-500',
      gradient: 'from-amber-500 to-amber-600'
    },
    {
      title: 'Completed Consultations',
      value: '134',
      icon: CheckCircle,
      color: 'bg-emerald-500',
      gradient: 'from-emerald-500 to-emerald-600'
    },
    {
      title: 'Cancelled Appointments',
      value: '10',
      icon: XCircle,
      color: 'bg-rose-500',
      gradient: 'from-rose-500 to-rose-600'
    },
    {
      title: 'Total Earnings',
      value: '₹ 84,500',
      icon: DollarSign,
      color: 'bg-indigo-500',
      gradient: 'from-indigo-500 to-indigo-600'
    }
  ];

  const quickActions = [
    {
      title: 'Create New Appointment',
      icon: Plus,
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      title: 'Upload Prescription',
      icon: Upload,
      color: 'bg-emerald-500 hover:bg-emerald-600'
    },
    {
      title: 'View Patients',
      icon: Users,
      color: 'bg-indigo-500 hover:bg-indigo-600'
    }
  ];

  const todaysAppointments = [
    {
      id: 1,
      patientName: 'Rajesh Kumar',
      time: '09:30 AM',
      status: 'confirmed',
      statusColor: 'bg-emerald-100 text-emerald-800'
    },
    {
      id: 2,
      patientName: 'Priya Sharma',
      time: '10:15 AM',
      status: 'pending',
      statusColor: 'bg-amber-100 text-amber-800'
    },
    {
      id: 3,
      patientName: 'Amit Patel',
      time: '11:00 AM',
      status: 'confirmed',
      statusColor: 'bg-emerald-100 text-emerald-800'
    },
    {
      id: 4,
      patientName: 'Sneha Reddy',
      time: '02:30 PM',
      status: 'cancelled',
      statusColor: 'bg-rose-100 text-rose-800'
    }
  ];

  const notifications = [
    {
      id: 1,
      title: 'New Lab Report Available',
      message: 'Blood test results for Rajesh Kumar are ready',
      time: '10 min ago',
      type: 'info',
      icon: FileText
    },
    {
      id: 2,
      title: 'Appointment Reminder',
      message: 'You have 3 pending consultations today',
      time: '30 min ago',
      type: 'warning',
      icon: Clock
    },
    {
      id: 3,
      title: 'Prescription Approved',
      message: 'Your prescription for Amit Patel has been processed',
      time: '1 hour ago',
      type: 'success',
      icon: CheckCircle
    },
    {
      id: 4,
      title: 'System Update',
      message: 'MediVault will undergo maintenance tonight',
      time: '2 hours ago',
      type: 'info',
      icon: AlertCircle
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          Welcome back, Dr. Sharma 👋
        </h1>
        <p className="text-gray-600 mt-2">Here's your medical practice overview for today</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content - Left 2/3 */}
        <div className="lg:col-span-2 space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {statsData.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-6 border border-gray-100"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                    </div>
                    <div className={`p-3 rounded-lg bg-gradient-to-r ${stat.gradient}`}>
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {quickActions.map((action, index) => {
                const IconComponent = action.icon;
                return (
                  <button
                    key={index}
                    className={`flex items-center justify-center space-x-2 ${action.color} text-white py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105`}
                  >
                    <IconComponent className="h-5 w-5" />
                    <span className="font-medium">{action.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Today's Appointments */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Today's Appointments</h2>
              <span className="text-sm text-gray-500">{new Date().toLocaleDateString('en-IN')}</span>
            </div>
            
            <div className="space-y-4">
              {todaysAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="flex items-center space-x-4">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <Users className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{appointment.patientName}</h3>
                      <p className="text-sm text-gray-500">{appointment.time}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${appointment.statusColor}`}>
                    {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Notifications Panel - Right 1/3 */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Notifications</h2>
            <div className="space-y-4">
              {notifications.map((notification) => {
                const IconComponent = notification.icon;
                const typeColors = {
                  info: 'text-blue-500',
                  warning: 'text-amber-500',
                  success: 'text-emerald-500'
                };
                
                return (
                  <div
                    key={notification.id}
                    className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    <div className="flex items-start space-x-3">
                      <IconComponent className={`h-5 w-5 mt-0.5 ${typeColors[notification.type]}`} />
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 text-sm">
                          {notification.title}
                        </h3>
                        <p className="text-gray-600 text-sm mt-1">
                          {notification.message}
                        </p>
                        <p className="text-gray-400 text-xs mt-2">
                          {notification.time}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Upcoming Schedule */}
          <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-xl shadow-sm p-6 text-white">
            <h2 className="text-lg font-semibold mb-4">Upcoming Schedule</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-indigo-100">Morning Session</span>
                <span className="font-medium">9:00 AM - 1:00 PM</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-indigo-100">Afternoon Session</span>
                <span className="font-medium">2:00 PM - 6:00 PM</span>
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-indigo-400">
                <span className="text-indigo-100">Next Available Slot</span>
                <span className="font-medium">Tomorrow, 9:30 AM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard ;