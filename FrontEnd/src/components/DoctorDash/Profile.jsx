import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { 
  FaUserMd, 
  FaHospital, 
  FaIdCard, 
  FaPhone, 
  FaEnvelope, 
  FaMoneyBillWave,
  FaCalendarAlt,
  FaGraduationCap,
  FaLanguage,
  FaMapMarkerAlt,
  FaClock,
  FaEdit,
  FaStethoscope
} from 'react-icons/fa';
import { MdWork, MdMedicalServices, MdSchedule, MdEmergency } from 'react-icons/md';
import { GiMedicines } from 'react-icons/gi';
import EditModel from './editModel.jsx';
import { useAuth } from '../../Context/authContext.jsx';

const Profile = ({ specialization }) => {
  const [editModelOpen, setisEditModelOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(true);
  const {user} = useAuth();
  const [userData, setUserData] = useState({
    fullName: '',
    email: '',
    phone: '',
    specialization: 'General Physician',
    experience: 0,
    hospital: '',
    licenseNumber: '',
    availability: '',
    fee: 500,
    status: 'Active',
    qualifications: '',
    consultationHours: '',
    emergencyContact: '',
    department: '',
    biography: '',
    services: [],
    languages: [],
    education: [],
    address: '',
    rating: 4.8,
    totalReviews: 124
  });



const specializationThemes = {
  "General Physician": "bg-gradient-to-br from-green-100 via-green-200 to-green-300",
  "Dentist": "bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300",
  "Cardiologist": "bg-gradient-to-br from-red-100 via-red-200 to-red-300",
  "Dermatologist": "bg-gradient-to-br from-pink-100 via-pink-200 to-pink-300",
  "ENT": "bg-gradient-to-br from-yellow-100 via-yellow-200 to-yellow-300",
  "Orthopedic": "bg-gradient-to-br from-purple-100 via-purple-200 to-purple-300",
  "Gynecologist": "bg-gradient-to-br from-indigo-100 via-indigo-200 to-indigo-300",
}


  const fetchDoctorData = async () => {
    try {
      setIsLoading(true);
      if (user.role === "Doctor") {
        
        const services = Array.isArray(user.services) ? user.services : [];
        const languages = Array.isArray(user.languages) ? user.languages : [];
        const education = Array.isArray(user.education) ? user.education : [];
        
        setUserData({
          ...user,
          services,
          languages,
          education
        });
      }
    } catch (error) {
      toast.error("User not Found");
      console.error("Error fetching doctor data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctorData();
  }, []);

  const handleUpdateSuccess = (updatedData) => {
    setUserData(updatedData);
    setisEditModelOpen(false);
    toast.success("Profile updated successfully!");
  };

  if (isLoading) {
    return (
      <main className='p-4 md:p-6 bg-blue-50 min-h-screen flex items-center justify-center'>
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full mx-auto">
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 bg-blue-100 rounded-full mb-4 flex items-center justify-center">
              <div className="animate-pulse bg-blue-200 w-16 h-16 rounded-full"></div>
            </div>
            <div className="w-48 h-6 bg-blue-100 rounded mb-4 animate-pulse"></div>
            <div className="w-32 h-4 bg-blue-100 rounded mb-8 animate-pulse"></div>
            <div className="w-full space-y-3">
              {[1, 2, 3, 4].map(item => (
                <div key={item} className="w-full h-4 bg-blue-100 rounded animate-pulse"></div>
              ))}
            </div>
          </div>
        </div>
      </main>
    );
  }



  const themeClass = specializationThemes[specialization] || "bg-gradient-to-br from-teal-50 via-blue-50 to-white";


  return (
    <main className={`p-4 md:p-6 min-h-screen ${themeClass}`}>
      <div className='max-w-6xl mx-auto'>
        <div className='bg-white rounded-xl shadow-md p-6 mb-6 border border-blue-100'>
          <div className='flex flex-col md:flex-row items-center'>
            <div className='relative mb-4 md:mb-0 md:mr-6'>
              <div className='w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-lg overflow-hidden'>
                <img
                  src={userData.photo || `https://dummyimage.com/400x400/3b82f6/ffffff&text=${userData.fullName.split(" ")[0]}`}
                  alt="Doctor Profile"
                  className='w-full h-full object-cover'
                />
              </div>
              <div className='absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center'>
                <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                {userData.status}
              </div>
            </div>
            
            <div className='flex-1 text-center md:text-left'>
              <h1 className='text-2xl md:text-3xl font-bold text-blue-800'>Dr. {userData.fullName}</h1>
              <p className='text-blue-700 font-medium flex items-center justify-center md:justify-start'>
                <FaStethoscope className='mr-2 text-blue-600' /> 
                {userData.specialization}
              </p>
              <div className='flex items-center justify-center md:justify-start mt-2'>
               
              </div>
              <div className='mt-3 flex flex-wrap items-center justify-center md:justify-start gap-2'>
                <span className='flex items-center text-sm text-gray-600'><FaMapMarkerAlt className='mr-1 text-blue-600' /> {userData.hospital || 'Medical Center'}</span>
                <span className='flex items-center text-sm text-gray-600'><FaClock className='mr-1 text-blue-600' /> {userData.consultationHours || '9:00 AM - 5:00 PM'}</span>
              </div>
            </div>
            
            <div className='mt-4 md:mt-0'>
              <button
                onClick={() => setisEditModelOpen(true)}
                className='px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all duration-300 flex items-center shadow-md hover:shadow-lg'
              >
                <FaEdit className='mr-2' /> Edit Profile
              </button>
            </div>
          </div>
        </div>
        
        <div className='bg-white rounded-xl shadow-md mb-6 overflow-hidden'>
          <div className='flex overflow-x-auto'>
            {['overview', 'professional', 'availability', 'services'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 font-medium flex items-center transition-colors ${activeTab === tab ? 'text-blue-700 border-b-2 border-blue-600 bg-blue-50' : 'text-gray-600 hover:text-blue-600'}`}
              >
                {tab === 'overview' && <FaUserMd className='mr-2' />}
                {tab === 'professional' && <MdWork className='mr-2' />}
                {tab === 'availability' && <FaCalendarAlt className='mr-2' />}
                {tab === 'services' && <GiMedicines className='mr-2' />}
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>
        
        {/* Tab Content */}
        <div className='bg-white rounded-xl shadow-md overflow-hidden'>
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className='p-6'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div className='md:col-span-2'>
                  <h3 className='text-xl font-semibold text-blue-800 mb-4 pb-2 border-b border-blue-100 flex items-center'>
                    <FaUserMd className='mr-2 text-blue-600' /> Personal Information
                  </h3>
                </div>

                <div className='bg-blue-50 p-4 rounded-lg'>
                  <label className='block text-blue-700 mb-2 flex items-center'>
                    <FaEnvelope className='mr-2' /> Email
                  </label>
                  <p className='text-gray-800 font-medium'>{userData.email || 'Not specified'}</p>
                </div>

                <div className='bg-blue-50 p-4 rounded-lg'>
                  <label className='block text-blue-700 mb-2 flex items-center'>
                    <FaPhone className='mr-2' /> Phone
                  </label>
                  <p className='text-gray-800 font-medium'>{userData.phone || 'Not specified'}</p>
                </div>
                
                <div className='bg-blue-50 p-4 rounded-lg'>
                  <label className='block text-blue-700 mb-2 flex items-center'>
                    <FaMapMarkerAlt className='mr-2' /> Address
                  </label>
                  <p className='text-gray-800 font-medium'>{userData.address || 'Not specified'}</p>
                </div>
                
                <div className='bg-blue-50 p-4 rounded-lg'>
                  <label className='block text-blue-700 mb-2 flex items-center'>
                    <MdEmergency className='mr-2' /> Emergency Contact
                  </label>
                  <p className='text-gray-800 font-medium'>{userData.emergencyContact || 'Not specified'}</p>
                </div>

                <div className='md:col-span-2 bg-blue-50 p-4 rounded-lg'>
                  <label className='block text-blue-700 mb-2 flex items-center'>
                    <FaIdCard className='mr-2' /> Biography
                  </label>
                  <p className='text-gray-800'>
                    {userData.biography || 'No biography available. Add information about your medical philosophy and approach to patient care.'}
                  </p>
                </div>
              </div>
            </div>
          )}
          
          {/* Professional Tab */}
          {activeTab === 'professional' && (
            <div className='p-6'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div className='md:col-span-2'>
                  <h3 className='text-xl font-semibold text-blue-800 mb-4 pb-2 border-b border-blue-100 flex items-center'>
                    <MdWork className='mr-2 text-blue-600' /> Professional Information
                  </h3>
                </div>

                <div className='bg-blue-50 p-4 rounded-lg'>
                  <label className='block text-blue-700 mb-2'>Specialization</label>
                  <p className='text-gray-800 font-medium'>{userData.specialization}</p>
                </div>

                <div className='bg-blue-50 p-4 rounded-lg'>
                  <label className='block text-blue-700 mb-2'>Years of Experience</label>
                  <p className='text-gray-800 font-medium'>{userData.experience || '0'}+ years</p>
                </div>

                <div className='bg-blue-50 p-4 rounded-lg'>
                  <label className='block text-blue-700 mb-2 flex items-center'>
                    <FaHospital className='mr-2 text-blue-600' /> Hospital/Clinic
                  </label>
                  <p className='text-gray-800 font-medium'>{userData.hospital || 'Not specified'}</p>
                </div>

                <div className='bg-blue-50 p-4 rounded-lg'>
                  <label className='block text-blue-700 mb-2'>Department</label>
                  <p className='text-gray-800 font-medium'>{userData.department || 'Not specified'}</p>
                </div>

                <div className='bg-blue-50 p-4 rounded-lg'>
                  <label className='block text-blue-700 mb-2 flex items-center'>
                    <FaIdCard className='mr-2 text-blue-600' /> License Number
                  </label>
                  <p className='text-gray-800 font-medium'>{userData.licenseNumber || 'Not specified'}</p>
                </div>

                <div className='bg-blue-50 p-4 rounded-lg'>
                  <label className='block text-blue-700 mb-2 flex items-center'>
                    <FaMoneyBillWave className='mr-2 text-blue-600' /> Consultation Fee
                  </label>
                  <p className='text-gray-800 font-medium'>₹{userData.fee || '500'}</p>
                </div>
                
                <div className='md:col-span-2 bg-blue-50 p-4 rounded-lg'>
                  <label className='block text-blue-700 mb-2 flex items-center'>
                    <FaGraduationCap className='mr-2 text-blue-600' /> Education
                  </label>
                  <div className='text-gray-800'>
                    {userData.education && userData.education.length > 0 ? (
                      <ul className='list-disc pl-5 space-y-2'>
                        {userData.education.map((item, index) => (
                          <li key={index} className='font-medium'>{item}</li>
                        ))}
                      </ul>
                    ) : 'No education information available'}
                  </div>
                </div>
                
                <div className='md:col-span-2 bg-blue-50 p-4 rounded-lg'>
                  <label className='block text-blue-700 mb-2 flex items-center'>
                    <FaLanguage className='mr-2 text-blue-600' /> Languages Spoken
                  </label>
                  <div className='flex flex-wrap gap-2'>
                    {userData.languages && userData.languages.length > 0 ? (
                      userData.languages.map((language, index) => (
                        <span key={index} className='bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium'>
                          {language}
                        </span>
                      ))
                    ) : (
                      <span className='text-gray-600'>No languages specified</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Availability Tab */}
          {activeTab === 'availability' && (
            <div className='p-6'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div className='md:col-span-2'>
                  <h3 className='text-xl font-semibold text-blue-800 mb-4 pb-2 border-b border-blue-100 flex items-center'>
                    <FaCalendarAlt className='mr-2 text-blue-600' /> Availability
                  </h3>
                </div>

                <div className='md:col-span-2 bg-blue-50 p-4 rounded-lg'>
                  <label className='block text-blue-700 mb-2 flex items-center'>
                    <MdSchedule className='mr-2' /> Consultation Hours
                  </label>
                  <p className='text-gray-800 font-medium'>
                    {userData.consultationHours || 'Not specified. Please update your availability.'}
                  </p>
                </div>

                <div className='md:col-span-2 bg-blue-50 p-4 rounded-lg'>
                  <label className='block text-blue-700 mb-2 flex items-center'>
                    <FaClock className='mr-2 text-blue-600' /> Availability Status
                  </label>
                  <p className='text-gray-800 font-medium'>
                    {userData.availability || 'Not specified. Please update your availability status.'}
                  </p>
                </div>
                
                <div className='md:col-span-2'>
                  <div className='bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg'>
                    <h4 className='font-semibold text-blue-800 mb-3 flex items-center'>
                      <FaCalendarAlt className='mr-2 text-blue-600' /> Weekly Schedule
                    </h4>
                    <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                      {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                        <div key={day} className='bg-white p-3 rounded-lg shadow-sm text-center'>
                          <p className='font-medium text-blue-800'>{day}</p>
                          <p className='text-sm text-green-600 mt-1'>9:00 AM - 5:00 PM</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Services Tab */}
          {activeTab === 'services' && (
            <div className='p-6'>
              <div className='grid grid-cols-1 gap-6'>
                <div>
                  <h3 className='text-xl font-semibold text-blue-800 mb-4 pb-2 border-b border-blue-100 flex items-center'>
                    <GiMedicines className='mr-2 text-blue-600' /> Services Offered
                  </h3>
                </div>

                <div className='bg-blue-50 p-6 rounded-lg'>
                  <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {userData.services && userData.services.length > 0 ? (
                      userData.services.map((service, index) => (
                        <div key={index} className='bg-white p-4 rounded-lg shadow-sm border-l-4 border-blue-500 hover:shadow-md transition-shadow'>
                          <div className='flex items-start'>
                            <div className='bg-blue-100 p-2 rounded-md mr-3'>
                              <MdMedicalServices className='text-blue-600 text-xl' />
                            </div>
                            <div>
                              <h4 className='font-medium text-blue-800'>{service}</h4>
                              <p className='text-sm text-gray-600 mt-1'>Comprehensive care and treatment</p>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className='md:col-span-3 text-center py-8'>
                        <div className='bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4'>
                          <GiMedicines className='text-blue-600 text-2xl' />
                        </div>
                        <h4 className='font-medium text-blue-800 mb-2'>No services added yet</h4>
                        <p className='text-gray-600'>Add the medical services you provide to help patients find you</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <EditModel
        isOpen={editModelOpen}
        onClose={() => setisEditModelOpen(false)}
        oldData={userData}
        onUpdate={handleUpdateSuccess}
      />
    </main>
  );
};

export default Profile;