import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FaUserMd, FaHospital, FaIdCard, FaPhone, FaEnvelope, FaStethoscope } from 'react-icons/fa';
import api from '../../../Configs/api';


const Profile = () => {
  const [userData, setUserData] = useState({

    fullName: "",
    email: "",
    phone: "",
    specialization: "",
    experience: "",

  });


  const fetchDoctorData = async () => {


    try {

      const res = await sessionStorage.getItem("LoginUser");
      const user = JSON.parse(res);
      if (user.role === "Doctor") {
        setUserData(user)
      }

    } catch (error) {
      toast.error("User not Found")

    }


  }

  useEffect(() => {
    fetchDoctorData()
  }, [])



  return (
    <main className='p-6 bg-blue-50 min-h-screen'>


      <div className='flex flex-col lg:flex-row bg-white rounded-lg shadow-lg overflow-hidden border border-blue-100'>
        {/* Profile Picture Section */}
        <div className='w-full lg:w-[35%] p-8 flex flex-col items-center justify-center bg-blue-50'>
          <div className='relative bg-white border-2 border-blue-200 rounded-full overflow-hidden w-48 h-48 lg:w-56 lg:h-56'>
            <img
              src="Profile.png"
              alt="Doctor Profile"
              className='w-full h-full object-cover'
            />
          </div>
          <h2 className='mt-4 text-2xl font-semibold text-blue-800'>Dr. John Smith</h2>
          <p className='text-blue-600'>Cardiologist</p>
          <button className='mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center'>
            <FaStethoscope className='mr-2' /> Update Profile
          </button>
        </div>

        {/* Professional Details Section */}
        <div className='w-full lg:w-[65%] p-8'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {/* Personal Information */}
            <div className='md:col-span-2'>
              <h3 className='text-xl font-semibold text-blue-800 mb-4 border-b border-blue-100 pb-2'>
                Personal Information
              </h3>
            </div>

            <div>
              <label className='block text-blue-600 mb-1 flex items-center'>
                <FaEnvelope className='mr-2' /> Email
              </label>
              <p className='text-lg font-medium p-3 bg-blue-50 rounded'>{userData.fullName} </p>
            </div>

            <div>
              <label className='block text-blue-600 mb-1 flex items-center'>
                <FaPhone className='mr-2' /> Phone
              </label>
              <p className='text-lg font-medium p-3 bg-blue-50 rounded'>{userData.phone}</p>
            </div>

            {/* Professional Information */}
            <div className='md:col-span-2 mt-4'>
              <h3 className='text-xl font-semibold text-blue-800 mb-4 border-b border-blue-100 pb-2'>
                Professional Information
              </h3>
            </div>

            <div>
              <label className='block text-blue-600 mb-1'>Specialization</label>
              <p className='text-lg font-medium p-3 bg-blue-50 rounded'>{userData.specialization}</p>
            </div>

            <div>
              <label className='block text-blue-600 mb-1'>Years of Experience</label>
              <p className='text-lg font-medium p-3 bg-blue-50 rounded'>{userData.experience}</p>
            </div>

            <div>
              <label className='block text-blue-600 mb-1 flex items-center'>
                <FaHospital className='mr-2' /> Hospital
              </label>
              <p className='text-lg font-medium p-3 bg-blue-50 rounded'>City General Hospital</p>
            </div>

            <div>
              <label className='block text-blue-600 mb-1'>License Number</label>
              <p className='text-lg font-medium p-3 bg-blue-50 rounded'>MD-12345678</p>
            </div>

            {/* Availability */}
            <div className='md:col-span-2'>
              <label className='block text-blue-600 mb-1'>Availability</label>
              <p className='text-lg font-medium p-3 bg-blue-50 rounded'>
                Mon-Fri: 9:00 AM - 5:00 PM<br />
                Sat: 10:00 AM - 2:00 PM
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Profile;