import React, { useState, useEffect } from 'react';
import { AiOutlineClose } from "react-icons/ai";
import { toast } from 'react-hot-toast';
import api from '../../../Configs/api';

const DoctorEditModel = ({ isOpen, onClose, oldData }) => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        specialization: 'General Physician',
        experience: 0,
        hospital: '',
        licenseNumber: '',
        availability: '',
        photo: '',
        fee: 500,
        status: 'Active',
        role: "Doctor"
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (oldData) {
            setFormData({
                fullName: oldData.fullName || '',
                email: oldData.email || '',
                phone: oldData.phone || '',
                specialization: oldData.specialization || 'General Physician',
                experience: oldData.experience || 0,
                hospital: oldData.hospital || '',
                licenseNumber: oldData.licenseNumber || '',
                availability: oldData.availability || '',
                photo: oldData.photo || '',
                fee: oldData.fee || 500,
                status: oldData.status || 'Active',
                role: "Doctor"

            });
        }
    }, [oldData]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await api.put(`/doctors/Dupdate/${oldData._id}`, formData);
            sessionStorage.setItem("LoginUser", JSON.stringify(response.data.data));

            toast.success('Profile updated successfully!');
            onClose();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to update profile');
            console.error('Update error:', error);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    const specializations = [
        "Cardiologist",
        "Neurologist",
        "Dermatologist",
        "ENT",
        "Orthopedic",
        "General Physician",
        "Pediatrician",
        "Psychiatrist",
        "Gynecologist",
        "Other"
    ];

    const statusOptions = ["Active", "Inactive", "Suspended"];

    return (
        <div className='fixed inset-0 bg-gray-500/40 flex justify-center items-center z-50'>
            <div className='h-[80vh] w-[90vw] md:w-[70vw] bg-white rounded-lg overflow-hidden flex flex-col'>
                <div className='flex justify-between items-center p-4 border-b'>
                    <h1 className='text-2xl font-semibold'>Edit Doctor Profile</h1>
                    <button
                        onClick={onClose}
                        className='text-gray-500 hover:text-gray-700 text-2xl'
                    >
                        <AiOutlineClose />
                    </button>
                </div>

                <div className='flex-1 overflow-y-auto p-4 md:p-6'>
                    <form onSubmit={handleSubmit} className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        {/* Basic Information */}
                        <div className='space-y-1'>
                            <label className='block text-sm font-medium text-gray-700'>Full Name</label>
                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                className='w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500'
                                required
                            />
                        </div>

                        <div className='space-y-1'>
                            <label className='block text-sm font-medium text-gray-700'>Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className='w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500'
                                required
                                disabled
                            />
                        </div>

                        <div className='space-y-1'>
                            <label className='block text-sm font-medium text-gray-700'>Phone</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className='w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500'
                                required
                                pattern="[0-9]{10}"
                                title="10-digit phone number"
                            />
                        </div>

                        <div className='space-y-1'>
                            <label className='block text-sm font-medium text-gray-700'>Specialization</label>
                            <select
                                name="specialization"
                                value={formData.specialization}
                                onChange={handleChange}
                                className='w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500'
                                required
                            >
                                {specializations.map(spec => (
                                    <option key={spec} value={spec}>{spec}</option>
                                ))}
                            </select>
                        </div>

                        {/* Professional Details */}
                        <div className='space-y-1'>
                            <label className='block text-sm font-medium text-gray-700'>Years of Experience</label>
                            <input
                                type="number"
                                name="experience"
                                value={formData.experience}
                                onChange={handleChange}
                                min="0"
                                className='w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500'
                                required
                            />
                        </div>

                        <div className='space-y-1'>
                            <label className='block text-sm font-medium text-gray-700'>Hospital/Clinic</label>
                            <input
                                type="text"
                                name="hospital"
                                value={formData.hospital}
                                onChange={handleChange}
                                className='w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500'
                            />
                        </div>

                        <div className='space-y-1'>
                            <label className='block text-sm font-medium text-gray-700'>License Number</label>
                            <input
                                type="text"
                                name="licenseNumber"
                                value={formData.licenseNumber}
                                onChange={handleChange}
                                className='w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500'
                                required
                            />
                        </div>

                        <div className='space-y-1'>
                            <label className='block text-sm font-medium text-gray-700'>Consultation Fee (₹)</label>
                            <input
                                type="number"
                                name="fee"
                                value={formData.fee}
                                onChange={handleChange}
                                min="0"
                                className='w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500'
                                required
                            />
                        </div>

                        {/* Availability and Status */}
                        <div className='space-y-1'>
                            <label className='block text-sm font-medium text-gray-700'>Availability</label>
                            <input
                                type="text"
                                name="availability"
                                value={formData.availability}
                                onChange={handleChange}
                                className='w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500'
                                placeholder="e.g., Mon-Fri 9AM-5PM"
                            />
                        </div>

                        <div className='space-y-1'>
                            <label className='block text-sm font-medium text-gray-700'>Status</label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className='w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500'
                            >
                                {statusOptions.map(status => (
                                    <option key={status} value={status}>{status}</option>
                                ))}
                            </select>
                        </div>



                        <div className='md:col-span-2 flex justify-end space-x-4 pt-4'>
                            <button
                                type="button"
                                onClick={onClose}
                                className='px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50'
                                disabled={loading}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50'
                                disabled={loading}
                            >
                                {loading ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default DoctorEditModel;