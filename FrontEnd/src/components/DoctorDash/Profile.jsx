import React, { useEffect, useState, useRef } from 'react';
import toast from 'react-hot-toast';
import api from '../../../Configs/api';
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
  const [preview , setpreview] = useState(null);

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
    "General Physician": {
      bg: "bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50",
      card: "from-emerald-50 to-green-100",
      text: "text-emerald-800",
      border: "border-emerald-200",
      accent: "bg-emerald-500",
      button: "bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 shadow-lg"
    },
    "Dentist": {
      bg: "bg-gradient-to-br from-blue-50 via-sky-50 to-cyan-50",
      card: "from-blue-50 to-sky-100",
      text: "text-blue-800",
      border: "border-blue-200",
      accent: "bg-blue-500",
      button: "bg-gradient-to-r from-blue-500 to-sky-600 hover:from-blue-600 hover:to-sky-700 shadow-lg"
    },
    "Cardiologist": {
      bg: "bg-gradient-to-br from-red-50 via-rose-50 to-pink-50",
      card: "from-red-50 to-rose-100",
      text: "text-red-800",
      border: "border-red-200",
      accent: "bg-red-500",
      button: "bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 shadow-lg"
    },
    "Dermatologist": {
      bg: "bg-gradient-to-br from-pink-50 via-rose-50 to-fuchsia-50",
      card: "from-pink-50 to-rose-100",
      text: "text-pink-800",
      border: "border-pink-200",
      accent: "bg-pink-500",
      button: "bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 shadow-lg"
    },
    "ENT": {
      bg: "bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50",
      card: "from-amber-50 to-yellow-100",
      text: "text-amber-800",
      border: "border-amber-200",
      accent: "bg-amber-500",
      button: "bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 shadow-lg"
    },
    "Orthopedic": {
      bg: "bg-gradient-to-br from-purple-50 via-violet-50 to-indigo-50",
      card: "from-purple-50 to-violet-100",
      text: "text-purple-800",
      border: "border-purple-200",
      accent: "bg-purple-500",
      button: "bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 shadow-lg"
    },
    "Gynecologist": {
      bg: "bg-gradient-to-br from-fuchsia-50 via-pink-50 to-rose-50",
      card: "from-fuchsia-50 to-pink-100",
      text: "text-fuchsia-800",
      border: "border-fuchsia-200",
      accent: "bg-fuchsia-500",
      button: "bg-gradient-to-r from-fuchsia-500 to-pink-600 hover:from-fuchsia-600 hover:to-pink-700 shadow-lg"
    },
    "Pediatrician": {
      bg: "bg-gradient-to-br from-cyan-50 via-sky-50 to-blue-50",
      card: "from-cyan-50 to-sky-100",
      text: "text-cyan-800",
      border: "border-cyan-200",
      accent: "bg-cyan-500",
      button: "bg-gradient-to-r from-cyan-500 to-sky-600 hover:from-cyan-600 hover:to-sky-700 shadow-lg"
    },
    "Psychiatrist": {
      bg: "bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50",
      card: "from-indigo-50 to-blue-100",
      text: "text-indigo-800",
      border: "border-indigo-200",
      accent: "bg-indigo-500",
      button: "bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 shadow-lg"
    },
    "Neurologist": {
      bg: "bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50",
      card: "from-violet-50 to-purple-100",
      text: "text-violet-800",
      border: "border-violet-200",
      accent: "bg-violet-500",
      button: "bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 shadow-lg"
    },
    "Ophthalmologist": {
      bg: "bg-gradient-to-br from-amber-50 via-yellow-50 to-lime-50",
      card: "from-amber-50 to-yellow-100",
      text: "text-amber-800",
      border: "border-amber-200",
      accent: "bg-amber-500",
      button: "bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 shadow-lg"
    },
    "Oncologist": {
      bg: "bg-gradient-to-br from-rose-50 via-pink-50 to-red-50",
      card: "from-rose-50 to-pink-100",
      text: "text-rose-800",
      border: "border-rose-200",
      accent: "bg-rose-500",
      button: "bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 shadow-lg"
    },
    "Pulmonologist": {
      bg: "bg-gradient-to-br from-teal-50 via-emerald-50 to-green-50",
      card: "from-teal-50 to-emerald-100",
      text: "text-teal-800",
      border: "border-teal-200",
      accent: "bg-teal-500",
      button: "bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 shadow-lg"
    },
    "Urologist": {
      bg: "bg-gradient-to-br from-lime-50 via-green-50 to-emerald-50",
      card: "from-lime-50 to-green-100",
      text: "text-lime-800",
      border: "border-lime-200",
      accent: "bg-lime-500",
      button: "bg-gradient-to-r from-lime-500 to-green-600 hover:from-lime-600 hover:to-green-700 shadow-lg"
    },
    "Gastroenterologist": {
      bg: "bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50",
      card: "from-emerald-50 to-teal-100",
      text: "text-emerald-800",
      border: "border-emerald-200",
      accent: "bg-emerald-500",
      button: "bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-lg"
    },
    "Nephrologist": {
      bg: "bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50",
      card: "from-sky-50 to-blue-100",
      text: "text-sky-800",
      border: "border-sky-200",
      accent: "bg-sky-500",
      button: "bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 shadow-lg"
    },
  "Endocrinologist": {
    bg: "bg-gradient-to-br from-fuchsia-50 via-purple-50 to-violet-50",
    card: "from-fuchsia-50 to-purple-100",
    text: "text-fuchsia-800",
    border: "border-fuchsia-200",
    accent: "bg-fuchsia-500",
    button: "bg-gradient-to-r from-fuchsia-500 to-purple-600 hover:from-fuchsia-600 hover:to-purple-700 shadow-lg"
  },
    "Hematologist": {
      bg: "bg-gradient-to-br from-red-50 via-rose-50 to-pink-50",
      card: "from-red-50 to-rose-100",
      text: "text-red-800",
      border: "border-red-200",
      accent: "bg-red-500",
      button: "bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 shadow-lg"
    },
    "Rheumatologist": {
      bg: "bg-gradient-to-br from-purple-50 via-violet-50 to-indigo-50",
      card: "from-purple-50 to-violet-100",
      text: "text-purple-800",
      border: "border-purple-200",
      accent: "bg-purple-500",
      button: "bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 shadow-lg"
    },
    "Plastic Surgeon": {
      bg: "bg-gradient-to-br from-pink-50 via-rose-50 to-fuchsia-50",
      card: "from-pink-50 to-rose-100",
      text: "text-pink-800",
      border: "border-pink-200",
      accent: "bg-pink-500",
      button: "bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 shadow-lg"
    },
    "Anesthesiologist": {
      bg: "bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50",
      card: "from-slate-50 to-gray-100",
      text: "text-slate-800",
      border: "border-slate-200",
      accent: "bg-slate-500",
      button: "bg-gradient-to-r from-slate-500 to-gray-600 hover:from-slate-600 hover:to-gray-700 shadow-lg"
    },
    "Radiologist": {
      bg: "bg-gradient-to-br from-blue-50 via-sky-50 to-cyan-50",
      card: "from-blue-50 to-sky-100",
      text: "text-blue-800",
      border: "border-blue-200",
      accent: "bg-blue-500",
      button: "bg-gradient-to-r from-blue-500 to-sky-600 hover:from-blue-600 hover:to-sky-700 shadow-lg"
    },
    "Pathologist": {
      bg: "bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50",
      card: "from-indigo-50 to-blue-100",
      text: "text-indigo-800",
      border: "border-indigo-200",
      accent: "bg-indigo-500",
      button: "bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 shadow-lg"
    }
  };

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

  const fileInputRef = useRef(null);
  const handleImageClick = () => {
    try {
      fileInputRef.current?.click();
    } catch (err) {
      console.error('file input not available', err);
    }
  };

  const handleUploadImg = async () => {
    if (!preview) return toast.error('No image selected');

    const formData = new FormData();
    formData.append('file', preview);

    try {
      const t = toast.loading('Uploading image...');
      const res = await api.post(`/upload/profileD/${user._id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      toast.dismiss(t);

      // Try a few probable response locations for the uploaded url
      const uploadedUrl = res?.data?.data?.secure_url || res?.data?.data?.url || res?.data?.url || res?.data?.secure_url || res?.data?.imageUrl;
      if (uploadedUrl) {
        setUserData(prev => ({ ...prev, photo: uploadedUrl }));
        setpreview(null);
        toast.success('Profile image uploaded');
      } else if (res?.data?.success) {
        setpreview(null);
        toast.success(res.data.message || 'Uploaded');
      } else {
        console.error('unexpected upload response', res?.data);
        toast.error('Upload failed');
      }
    } catch (err) {
      console.error('Upload error', err);
      toast.error('Upload failed');
    }
  };


  if (isLoading) {
    const theme = specializationThemes[specialization] || specializationThemes["General Physician"];
    return (
      <main className={`p-4 md:p-6 min-h-screen ${theme.bg}`}>
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/4 mb-6"></div>
            <div className="bg-white rounded-xl shadow-md p-6 mb-6 h-40"></div>
            <div className="bg-white rounded-xl shadow-md p-6 h-96"></div>
          </div>
        </div>
      </main>
    );
  }

  
  
  const theme = specializationThemes[specialization] || specializationThemes["General Physician"];
  console.log( theme );

  return (
    <main className={`p-4 md:p-6 min-h-screen ${theme.bg}`}>
      <div className='max-w-6xl mx-auto'>
        <div className={`bg-gradient-to-br ${theme.card} rounded-xl shadow-md p-6 mb-6 border ${theme.border}`}>
          <div className='flex flex-col md:flex-row items-center'>
            <div className='relative mb-4 md:mb-0 md:mr-6'>
              <div className='w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-lg overflow-hidden cursor-pointer' onClick={handleImageClick}>
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      setpreview(file)
                      toast.success("Profile image selected successfully!");
                    }
                  }}
                />
                <img
                  src={userData.photo || `https://dummyimage.com/400x400/3b82f6/ffffff&text=${userData.fullName.split(" ")[0]}`}
                  alt="Doctor Profile"
                  className='w-full h-full object-cover hover:opacity-80 transition-opacity duration-200'
                />
              </div>
              <div className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 ${theme.accent} text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center`}>
                <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                {userData.status}
              </div>
            </div>


                { preview && (
                  <div className="absolute inset-0 flex items-start justify-center pt-24 z-50">
                    <div className="bg-white rounded-lg shadow-lg border p-4 w-72 flex flex-col items-center">
                      <div className="w-60 h-40 overflow-hidden rounded-md mb-3">
                        <img
                          src={typeof preview === 'string' ? preview : URL.createObjectURL(preview)}
                          alt="preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex gap-3">
                        <button
                          onClick={handleUploadImg}
                          className={`px-3 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md`}
                        >
                          Upload
                        </button>
                        <button
                          onClick={() => setpreview(null)}
                          className="px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded-md"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}



            
            <div className='flex-1 text-center md:text-left'>
              <h1 className={`text-2xl md:text-3xl font-bold ${theme.text}`}>Dr. {userData.fullName}</h1>
              <p className={`font-medium flex items-center justify-center md:justify-start ${theme.text}`}>
                <FaStethoscope className='mr-2' /> 
                {userData.specialization}
              </p>
              <div className='mt-3 flex flex-wrap items-center justify-center md:justify-start gap-2'>
                <span className={`flex items-center text-sm ${theme.text}`}><FaMapMarkerAlt className='mr-1' /> {userData.hospital || 'Medical Center'}</span>
                <span className={`flex items-center text-sm ${theme.text}`}><FaClock className='mr-1' /> {userData.consultationHours || '9:00 AM - 5:00 PM'}</span>
              </div>
            </div>
            
            <div className='mt-4 md:mt-0'>
              <button
                onClick={() => setisEditModelOpen(true)}
                className={`px-5 py-3 ${theme.button} text-white rounded-lg font-medium transition-all duration-300 flex items-center shadow-md hover:shadow-lg`}
              >
                <FaEdit className='mr-2' /> Edit Profile
              </button>
            </div>
          </div>
        </div>
        
        <div className={`bg-white rounded-xl shadow-md mb-6 overflow-hidden border ${theme.border}`}>
          <div className='flex overflow-x-auto'>
            {['overview', 'professional', 'availability', 'services'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 font-medium flex items-center transition-colors ${activeTab === tab ? `${theme.text} border-b-2 ${theme.accent} bg-opacity-10` : 'text-gray-600 hover:text-blue-600'}`}
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
                <div className={`bg-white rounded-xl shadow-md overflow-hidden border ${theme.border}`}>
          {activeTab === 'overview' && (
            <div className='p-6'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div className='md:col-span-2'>
                  <h3 className={`text-xl font-semibold ${theme.text} mb-4 pb-2 border-b ${theme.border} flex items-center`}>
                    <FaUserMd className='mr-2' /> Personal Information
                  </h3>
                </div>

                <div className={`bg-gradient-to-br ${theme.card} p-4 rounded-lg border ${theme.border}`}>
                  <label className={`block ${theme.text} mb-2 flex items-center`}>
                    <FaEnvelope className='mr-2' /> Email
                  </label>
                  <p className='text-gray-800 font-medium'>{userData.email || 'Not specified'}</p>
                </div>

                <div className={`bg-gradient-to-br ${theme.card} p-4 rounded-lg border ${theme.border}`}>
                  <label className={`block ${theme.text} mb-2 flex items-center`}>
                    <FaPhone className='mr-2' /> Phone
                  </label>
                  <p className='text-gray-800 font-medium'>{userData.phone || 'Not specified'}</p>
                </div>
                
                <div className={`bg-gradient-to-br ${theme.card} p-4 rounded-lg border ${theme.border}`}>
                  <label className={`block ${theme.text} mb-2 flex items-center`}>
                    <FaMapMarkerAlt className='mr-2' /> Address
                  </label>
                  <p className='text-gray-800 font-medium'>{userData.address || 'Not specified'}</p>
                </div>
                
                <div className={`bg-gradient-to-br ${theme.card} p-4 rounded-lg border ${theme.border}`}>
                  <label className={`block ${theme.text} mb-2 flex items-center`}>
                    <MdEmergency className='mr-2' /> Emergency Contact
                  </label>
                  <p className='text-gray-800 font-medium'>{userData.emergencyContact || 'Not specified'}</p>
                </div>

                <div className={`md:col-span-2 bg-gradient-to-br ${theme.card} p-4 rounded-lg border ${theme.border}`}>
                  <label className={`block ${theme.text} mb-2 flex items-center`}>
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
                  <h3 className={`text-xl font-semibold ${theme.text} mb-4 pb-2 border-b ${theme.border} flex items-center`}>
                    <MdWork className='mr-2' /> Professional Information
                  </h3>
                </div>

                <div className={`bg-gradient-to-br ${theme.card} p-4 rounded-lg border ${theme.border}`}>
                  <label className={`block ${theme.text} mb-2`}>Specialization</label>
                  <p className='text-gray-800 font-medium'>{userData.specialization}</p>
                </div>

                <div className={`bg-gradient-to-br ${theme.card} p-4 rounded-lg border ${theme.border}`}>
                  <label className={`block ${theme.text} mb-2`}>Years of Experience</label>
                  <p className='text-gray-800 font-medium'>{userData.experience || '0'}+ years</p>
                </div>

                <div className={`bg-gradient-to-br ${theme.card} p-4 rounded-lg border ${theme.border}`}>
                  <label className={`block ${theme.text} mb-2 flex items-center`}>
                    <FaHospital className='mr-2' /> Hospital/Clinic
                  </label>
                  <p className='text-gray-800 font-medium'>{userData.hospital || 'Not specified'}</p>
                </div>

                <div className={`bg-gradient-to-br ${theme.card} p-4 rounded-lg border ${theme.border}`}>
                  <label className={`block ${theme.text} mb-2`}>Department</label>
                  <p className='text-gray-800 font-medium'>{userData.department || 'Not specified'}</p>
                </div>

                <div className={`bg-gradient-to-br ${theme.card} p-4 rounded-lg border ${theme.border}`}>
                  <label className={`block ${theme.text} mb-2 flex items-center`}>
                    <FaIdCard className='mr-2' /> License Number
                  </label>
                  <p className='text-gray-800 font-medium'>{userData.licenseNumber || 'Not specified'}</p>
                </div>

                <div className={`bg-gradient-to-br ${theme.card} p-4 rounded-lg border ${theme.border}`}>
                  <label className={`block ${theme.text} mb-2 flex items-center`}>
                    <FaMoneyBillWave className='mr-2' /> Consultation Fee
                  </label>
                  <p className='text-gray-800 font-medium'>₹{userData.fee || '500'}</p>
                </div>
                
                <div className={`md:col-span-2 bg-gradient-to-br ${theme.card} p-4 rounded-lg border ${theme.border}`}>
                  <label className={`block ${theme.text} mb-2 flex items-center`}>
                    <FaGraduationCap className='mr-2' /> Education
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
                
                <div className={`md:col-span-2 bg-gradient-to-br ${theme.card} p-4 rounded-lg border ${theme.border}`}>
                  <label className={`block ${theme.text} mb-2 flex items-center`}>
                    <FaLanguage className='mr-2' /> Languages Spoken
                  </label>
                  <div className='flex flex-wrap gap-2'>
                    {userData.languages && userData.languages.length > 0 ? (
                      userData.languages.map((language, index) => (
                        <span key={index} className={`${theme.accent} bg-opacity-20 ${theme.text} px-3 py-1 rounded-full text-sm font-medium`}>
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
                  <h3 className={`text-xl font-semibold ${theme.text} mb-4 pb-2 border-b ${theme.border} flex items-center`}>
                    <FaCalendarAlt className='mr-2' /> Availability
                  </h3>
                </div>

                <div className={`md:col-span-2 bg-gradient-to-br ${theme.card} p-4 rounded-lg border ${theme.border}`}>
                  <label className={`block ${theme.text} mb-2 flex items-center`}>
                    <MdSchedule className='mr-2' /> Consultation Hours
                  </label>
                  <p className='text-gray-800 font-medium'>
                    {userData.consultationHours || 'Not specified. Please update your availability.'}
                  </p>
                </div>

                <div className={`md:col-span-2 bg-gradient-to-br ${theme.card} p-4 rounded-lg border ${theme.border}`}>
                  <label className={`block ${theme.text} mb-2 flex items-center`}>
                    <FaClock className='mr-2' /> Availability Status
                  </label>
                  <p className='text-gray-800 font-medium'>
                    {userData.availability || 'Not specified. Please update your availability status.'}
                  </p>
                </div>
                
                <div className='md:col-span-2'>
                  <div className={`bg-gradient-to-r ${theme.card} p-6 rounded-lg border ${theme.border}`}>
                    <h4 className={`font-semibold ${theme.text} mb-3 flex items-center`}>
                      <FaCalendarAlt className='mr-2' /> Weekly Schedule
                    </h4>
                    <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                      {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                        <div key={day} className='bg-white p-3 rounded-lg shadow-sm text-center border ${theme.border}'>
                          <p className={`font-medium ${theme.text}`}>{day}</p>
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
                  <h3 className={`text-xl font-semibold ${theme.text} mb-4 pb-2 border-b ${theme.border} flex items-center`}>
                    <GiMedicines className='mr-2' /> Services Offered
                  </h3>
                </div>

                <div className={`bg-gradient-to-br ${theme.card} p-6 rounded-lg border ${theme.border}`}>
                  <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {userData.services && userData.services.length > 0 ? (
                      userData.services.map((service, index) => (
                        <div key={index} className='bg-white p-4 rounded-lg shadow-sm border-l-4 hover:shadow-md transition-shadow' style={{borderLeftColor: theme.accent}}>
                          <div className='flex items-start'>
                            <div className={`${theme.accent} bg-opacity-20 p-2 rounded-md mr-3`}>
                              <MdMedicalServices className={`${theme.text} text-xl`} />
                            </div>
                            <div>
                              <h4 className={`font-medium ${theme.text}`}>{service}</h4>
                              <p className='text-sm text-gray-600 mt-1'>Comprehensive care and treatment</p>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className='md:col-span-3 text-center py-8'>
                        <div className={`${theme.accent} bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                          <GiMedicines className={`${theme.text} text-2xl`} />
                        </div>
                        <h4 className={`font-medium ${theme.text} mb-2`}>No services added yet</h4>
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