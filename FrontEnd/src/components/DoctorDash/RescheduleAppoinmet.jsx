import React, { useState } from 'react';
import { 
  FaUser, 
  FaPhone, 
  FaCalendarAlt, 
  FaClock, 
  FaStethoscope, 
  FaNotesMedical, 
  FaIdCard, 
  FaTimes,
  FaArrowLeft,
  FaSave,
  FaPlus
} from 'react-icons/fa';
import api from '../../../Configs/api';
import toast from 'react-hot-toast';
import { useAuth } from '../../Context/authContext';

const RescheduleAppoinmet = ({ isOpen, onClose, scheduleData }) => {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    phoneNumber: scheduleData.phoneNumber || '',
    date: scheduleData.date,
    time: scheduleData.time,
    appointmentType: scheduleData.appointmentType || 'Consultation',
    reason: scheduleData.reason || '',
    insuranceProvider: scheduleData.insuranceProvider || '',
    insuranceId: scheduleData.insuranceId || '',
    previousVisit: scheduleData.previousVisit || 'no',
    referredBy: scheduleData.referredBy || '',
    doctorId: user._id,
  });

  const [currentStep, setCurrentStep] = useState(1);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/doctor/appointments/${scheduleData._id}/reschedule`, formData);
      toast.success('Appointment updated successfully ✅');
      setFormData({
        date: '',
        time: '',
        appointmentType: 'Consultation',
        reason: '',
        insuranceProvider: '',
        insuranceId: '',
        previousVisit: 'no',
        referredBy: '',
        doctorId: user._id,
      });
      setCurrentStep(1);
      onClose();
    } catch (err) {
      console.error('Error saving note:', err);
      toast.error('Failed to update appointment ❌');
    }
  };

  const nextStep = () => setCurrentStep(currentStep + 1);
  const prevStep = () => setCurrentStep(currentStep - 1);

  return (
    <main className='fixed inset-0 flex justify-center items-center bg-blue-900/50 z-50 p-4'>
      <div className='bg-white/80 backdrop-blur-md rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden'>
        <div className='bg-blue-600 text-white p-6 flex justify-between items-center'>
          <h2 className='text-2xl font-bold'>Reschedule  Appointment</h2>
          <button onClick={onClose} className='text-white hover:text-blue-200 transition-colors'>
            <FaTimes size={24} />
          </button>
        </div>

        <div className='bg-blue-50 px-6 py-3'>
          <div className='flex items-center justify-between mb-2'>
            <span className='text-sm font-medium text-blue-800'>Step {currentStep} of 3</span>
            <span className='text-sm text-blue-600'>
              {currentStep === 1 && 'Patient Information'}
              {currentStep === 2 && 'Appointment Details'}
              {currentStep === 3 && 'Review & Confirm'}
            </span>
          </div>
          <div className='w-full bg-gray-200 rounded-full h-2.5'>
            <div 
              className='bg-blue-600 h-2.5 rounded-full' 
              style={{ width: `${(currentStep / 3) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className='p-6 overflow-y-auto max-h-[60vh]'>
          <form onSubmit={handleSubmit}>
            {currentStep === 1 && (
              <div className='space-y-6'>
                <h3 className='text-xl font-semibold text-blue-800 border-b pb-2 flex items-center'>
                  <FaUser className='mr-2' /> Patient Details
                </h3>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <div className='space-y-2'>
                    <label className='block text-sm font-medium text-gray-700 flex items-center'>
                      <FaPhone className='mr-2 text-blue-500' /> Phone Number *
                    </label>
                    <input
                      type='tel'
                      name='phoneNumber'
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                      disabled
                    />
                  </div>
                  <div className='space-y-2'>
                    <label className='block text-sm font-medium text-gray-700 flex items-center'>
                      <FaIdCard className='mr-2 text-blue-500' /> Previous Visit
                    </label>
                    <select
                      name='previousVisit'
                      value={formData.previousVisit}
                      onChange={handleChange}
                      className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                    >
                      <option value='no'>No</option>
                      <option value='yes'>Yes</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className='space-y-6'>
                <h3 className='text-xl font-semibold text-blue-800 border-b pb-2 flex items-center'>
                  <FaCalendarAlt className='mr-2' /> Appointment Information
                </h3>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <div className='space-y-2'>
                    <label className='block text-sm font-medium text-gray-700 flex items-center'>
                      <FaCalendarAlt className='mr-2 text-blue-500' /> Date *
                    </label>
                    <input
                      type='date'
                      name='date'
                      value={formData.date}
                      onChange={handleChange}
                      className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                      required
                    />
                  </div>
                  <div className='space-y-2'>
                    <label className='block text-sm font-medium text-gray-700 flex items-center'>
                      <FaClock className='mr-2 text-blue-500' /> Time *
                    </label>
                    <input
                      type='time'
                      name='time'
                      value={formData.time}
                      onChange={handleChange}
                      className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                      required
                    />
                  </div>
                  <div className='space-y-2'>
                    <label className='block text-sm font-medium text-gray-700 flex items-center'>
                      <FaStethoscope className='mr-2 text-blue-500' /> Appointment Type *
                    </label>
                    <select
                      name='appointmentType'
                      value={formData.appointmentType}
                      onChange={handleChange}
                      className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                      required
                    >
                      <option value='Consultation'>Consultation</option>
                      <option value='Follow-up'>Follow-up</option>
                      <option value='Routine Check-up'>Routine Check-up</option>
                      <option value='Emergency'>Emergency</option>
                      <option value='Vaccination'>Vaccination</option>
                      <option value='test'>Test</option>
                      <option value='Procedure'>Procedure</option>
                      <option value='Surgery'>Surgery</option>
                    </select>
                  </div>
                  <div className='space-y-2'>
                    <label className='block text-sm font-medium text-gray-700'>Referred By</label>
                    <input
                      type='text'
                      name='referredBy'
                      value={formData.referredBy}
                      onChange={handleChange}
                      className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                      placeholder='Doctor name or clinic'
                    />
                  </div>
                </div>
                <div className='space-y-2'>
                  <label className='block text-sm font-medium text-gray-700 flex items-center'>
                    <FaNotesMedical className='mr-2 text-blue-500' /> Reason for Visit *
                  </label>
                  <textarea
                    name='reason'
                    value={formData.reason}
                    onChange={handleChange}
                    rows={3}
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                    placeholder='Describe symptoms, concerns, or reason for appointment'
                    required
                  />
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <div className='space-y-2'>
                    <label className='block text-sm font-medium text-gray-700'>Insurance Provider</label>
                    <input
                      type='text'
                      name='insuranceProvider'
                      value={formData.insuranceProvider}
                      onChange={handleChange}
                      className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                    />
                  </div>
                  <div className='space-y-2'>
                    <label className='block text-sm font-medium text-gray-700'>Insurance ID</label>
                    <input
                      type='text'
                      name='insuranceId'
                      value={formData.insuranceId}
                      onChange={handleChange}
                      className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                    />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className='space-y-6'>
                <h3 className='text-xl font-semibold text-blue-800 border-b pb-2'>Review Appointment Details</h3>
                <div className='bg-blue-50 p-4 rounded-lg'>
                  <h4 className='font-medium text-blue-800 mb-3'>Patient Information</h4>
                  <div className='grid grid-cols-2 gap-4 text-sm'>
                    <div><span className='text-gray-600'>Phone:</span> {formData.phoneNumber || 'Not provided'}</div>
                    <div><span className='text-gray-600'>Previous Visit:</span> {formData.previousVisit === 'yes' ? 'Yes' : 'No'}</div>
                  </div>
                </div>
                <div className='bg-blue-50 p-4 rounded-lg'>
                  <h4 className='font-medium text-blue-800 mb-3'>Appointment Details</h4>
                  <div className='grid grid-cols-2 gap-4 text-sm'>
                    <div><span className='text-gray-600'>Date:</span> {formData.date || 'Not selected'}</div>
                    <div><span className='text-gray-600'>Time:</span> {formData.time || 'Not selected'}</div>
                    <div><span className='text-gray-600'>Type:</span> {formData.appointmentType}</div>
                    <div><span className='text-gray-600'>Referred By:</span> {formData.referredBy || 'Not specified'}</div>
                  </div>
                </div>
                <div className='bg-blue-50 p-4 rounded-lg'>
                  <h4 className='font-medium text-blue-800 mb-3'>Reason for Visit</h4>
                  <p className='text-sm'>{formData.reason || 'Not provided'}</p>
                </div>
                <div className='bg-blue-50 p-4 rounded-lg'>
                  <h4 className='font-medium text-blue-800 mb-3'>Insurance Information</h4>
                  <div className='grid grid-cols-2 gap-4 text-sm'>
                    <div><span className='text-gray-600'>Provider:</span> {formData.insuranceProvider || 'Not provided'}</div>
                    <div><span className='text-gray-600'>ID:</span> {formData.insuranceId || 'Not provided'}</div>
                  </div>
                </div>
                <div className='flex items-center mt-4'>
                  <input
                    type='checkbox'
                    id='confirm'
                    className='mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded'
                    required
                  />
                  <label htmlFor='confirm' className='text-sm text-gray-700'>
                    I confirm that all information provided is accurate
                  </label>
                </div>
              </div>
            )}
          </form>
        </div>

        <div className='bg-gray-50 px-6 py-4 flex justify-between'>
          <div>
            {currentStep > 1 && (
              <button
                onClick={prevStep}
                className='flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors'
              >
                <FaArrowLeft className='mr-2' /> Previous
              </button>
            )}
          </div>
          <div>
            {currentStep < 3 ? (
              <button
                onClick={nextStep}
                className='flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'
              >
                Next <FaPlus className='ml-2' />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className='flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors'
              >
                <FaSave className='mr-2' /> Confirm Appointment
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default RescheduleAppoinmet;
