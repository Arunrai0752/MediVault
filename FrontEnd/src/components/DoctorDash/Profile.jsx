import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { 
  FaUserMd, 
  FaHospital, 
  FaIdCard, 
  FaPhone, 
  FaEnvelope, 
  FaStethoscope,
  FaMoneyBillWave,
  FaCalendarAlt,
  FaUserShield,
  FaClinicMedical,
  FaBriefcaseMedical
} from 'react-icons/fa';
import { MdWork, MdMedicalServices, MdSchedule } from 'react-icons/md';
import api from '../../../Configs/api';
import EditModel from './editModel.jsx';

const Profile = () => {
  const [editModelOpen, setisEditModelOpen] = useState(false);
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
    education: []
  });

  const fetchDoctorData = async () => {
    try {
      const res = await sessionStorage.getItem("LoginUser");
      const user = JSON.parse(res);
      if (user.role === "Doctor") {
        // Ensure arrays are properly initialized
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

  return (
    <main className='p-4 md:p-6 bg-blue-50 min-h-screen'>
      <div className='flex flex-col lg:flex-row bg-white rounded-lg shadow-lg overflow-hidden border border-blue-100 max-w-6xl mx-auto'>
        {/* Left Profile Section */}
        <div className='w-full lg:w-[35%] p-6 md:p-8 flex flex-col items-center justify-center bg-blue-50'>
          <div className='relative bg-white border-2 border-blue-200 rounded-full overflow-hidden w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56'>
            <img
              src="Profile.png"
              alt="Doctor Profile"
              className='w-full h-full object-cover'
            />
          </div>
          <h2 className='mt-4 text-2xl font-semibold text-blue-800'>Dr. {userData.fullName}</h2>
          <p className='text-blue-600'>{userData.specialization}</p>
          <p className={`mt-2 px-3 py-1 rounded-full text-sm font-medium ${
            userData.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {userData.status}
          </p>
          
          <button
            onClick={() => setisEditModelOpen(true)}
            className='mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center'
          >
            <FaStethoscope className='mr-2' /> Update Profile
          </button>
        </div>

        {/* Right Information Section */}
        <div className='w-full lg:w-[65%] p-6 md:p-8'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6'>
            {/* Personal Information Section */}
            <div className='md:col-span-2'>
              <h3 className='text-xl font-semibold text-blue-800 mb-4 border-b border-blue-100 pb-2 flex items-center'>
                <FaUserMd className='mr-2' /> Personal Information
              </h3>
            </div>

            <div>
              <label className='block text-blue-600 mb-1 flex items-center'>
                <FaEnvelope className='mr-2' /> Email
              </label>
              <p className='text-base md:text-lg font-medium p-3 bg-blue-50 rounded'>{userData.email || 'Not specified'}</p>
            </div>

            <div>
              <label className='block text-blue-600 mb-1 flex items-center'>
                <FaPhone className='mr-2' /> Phone
              </label>
              <p className='text-base md:text-lg font-medium p-3 bg-blue-50 rounded'>{userData.phone || 'Not specified'}</p>
            </div>

            <div className='md:col-span-2'>
              <label className='block text-blue-600 mb-1 flex items-center'>
                <FaIdCard className='mr-2' /> Biography
              </label>
              <p className='text-base md:text-lg font-medium p-3 bg-blue-50 rounded min-h-[100px]'>
                {userData.biography || 'No biography available'}
              </p>
            </div>

            {/* Professional Information Section */}
            <div className='md:col-span-2 mt-4'>
              <h3 className='text-xl font-semibold text-blue-800 mb-4 border-b border-blue-100 pb-2 flex items-center'>
                <MdWork className='mr-2' /> Professional Information
              </h3>
            </div>

            <div>
              <label className='block text-blue-600 mb-1'>Specialization</label>
              <p className='text-base md:text-lg font-medium p-3 bg-blue-50 rounded'>{userData.specialization}</p>
            </div>

            <div>
              <label className='block text-blue-600 mb-1'>Years of Experience</label>
              <p className='text-base md:text-lg font-medium p-3 bg-blue-50 rounded'>{userData.experience || '0'}</p>
            </div>

            <div>
              <label className='block text-blue-600 mb-1 flex items-center'>
                <FaHospital className='mr-2' /> Hospital/Clinic
              </label>
              <p className='text-base md:text-lg font-medium p-3 bg-blue-50 rounded'>{userData.hospital || 'Not specified'}</p>
            </div>

            <div>
              <label className='block text-blue-600 mb-1'>Department</label>
              <p className='text-base md:text-lg font-medium p-3 bg-blue-50 rounded'>{userData.department || 'Not specified'}</p>
            </div>

            <div>
              <label className='block text-blue-600 mb-1 flex items-center'>
                <FaIdCard className='mr-2' /> License Number
              </label>
              <p className='text-base md:text-lg font-medium p-3 bg-blue-50 rounded'>{userData.licenseNumber || 'Not specified'}</p>
            </div>

            <div>
              <label className='block text-blue-600 mb-1 flex items-center'>
                <FaMoneyBillWave className='mr-2' /> Consultation Fee
              </label>
              <p className='text-base md:text-lg font-medium p-3 bg-blue-50 rounded'>₹{userData.fee || '500'}</p>
            </div>

            {/* Availability Section */}
            <div className='md:col-span-2 mt-4'>
              <h3 className='text-xl font-semibold text-blue-800 mb-4 border-b border-blue-100 pb-2 flex items-center'>
                <MdSchedule className='mr-2' /> Availability
              </h3>
            </div>

            <div className='md:col-span-2'>
              <label className='block text-blue-600 mb-1 flex items-center'>
                <FaCalendarAlt className='mr-2' /> Consultation Hours
              </label>
              <p className='text-base md:text-lg font-medium p-3 bg-blue-50 rounded'>
                {userData.consultationHours || 'Not specified'}
              </p>
            </div>

            <div className='md:col-span-2'>
              <label className='block text-blue-600 mb-1 flex items-center'>
                <MdSchedule className='mr-2' /> Availability Status
              </label>
              <p className='text-base md:text-lg font-medium p-3 bg-blue-50 rounded'>
                {userData.availability || 'Not specified'}
              </p>
            </div>

            {/* Additional Information Section */}
            <div className='md:col-span-2 mt-4'>
              <h3 className='text-xl font-semibold text-blue-800 mb-4 border-b border-blue-100 pb-2 flex items-center'>
                <FaBriefcaseMedical className='mr-2' /> Additional Information
              </h3>
            </div>

            <div>
              <label className='block text-blue-600 mb-1'>Qualifications</label>
              <p className='text-base md:text-lg font-medium p-3 bg-blue-50 rounded'>
                {userData.qualifications || 'Not specified'}
              </p>
            </div>

            <div>
              <label className='block text-blue-600 mb-1'>Education</label>
              <div className='text-base md:text-lg font-medium p-3 bg-blue-50 rounded'>
                {userData.education && userData.education.length > 0 ? (
                  <ul className='list-disc pl-5'>
                    {userData.education.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                ) : 'Not specified'}
              </div>
            </div>

            <div className='md:col-span-2'>
              <label className='block text-blue-600 mb-1'>Services Offered</label>
              <div className='text-base md:text-lg font-medium p-3 bg-blue-50 rounded'>
                {userData.services && userData.services.length > 0 ? (
                  <div className='flex flex-wrap gap-2'>
                    {userData.services.map((service, index) => (
                      <span key={index} className='bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm'>
                        {service}
                      </span>
                    ))}
                  </div>
                ) : 'Not specified'}
              </div>
            </div>

            <div className='md:col-span-2'>
              <label className='block text-blue-600 mb-1'>Languages Spoken</label>
              <div className='text-base md:text-lg font-medium p-3 bg-blue-50 rounded'>
                {userData.languages && userData.languages.length > 0 ? (
                  <div className='flex flex-wrap gap-2'>
                    {userData.languages.map((language, index) => (
                      <span key={index} className='bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm'>
                        {language}
                      </span>
                    ))}
                  </div>
                ) : 'Not specified'}
              </div>
            </div>

            <div className='md:col-span-2'>
              <label className='block text-blue-600 mb-1 flex items-center'>
                <FaUserShield className='mr-2' /> Emergency Contact
              </label>
              <p className='text-base md:text-lg font-medium p-3 bg-blue-50 rounded'>
                {userData.emergencyContact || 'Not specified'}
              </p>
            </div>
          </div>
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