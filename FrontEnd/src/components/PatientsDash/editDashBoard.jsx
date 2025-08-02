import React, { useState, useEffect } from 'react';
import { AiOutlineClose } from "react-icons/ai";
import { toast } from 'react-hot-toast';
import api from '../../../Configs/api';

const EditDashBoard = ({ isOpen, onClose, oldData, onUpdate }) => {
    const [formData, setFormData] = useState({
        fullName: '',
        gender: 'Prefer not to say',
        dob: '',
        email: '',
        phone: 'N/A',
        address: 'N/A',
        aadharNumber: '',
        bloodGroup: 'Unknown'
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (oldData) {
            const formattedDob = oldData.dob ? new Date(oldData.dob).toISOString().split('T')[0] : '';
            
            setFormData({
                fullName: oldData.fullName || '',
                gender: oldData.gender || 'Prefer not to say',
                dob: formattedDob,
                email: oldData.email || '',
                phone: oldData.phone || 'N/A',
                address: oldData.address || 'N/A',
                aadharNumber: oldData.aadharNumber || '',
                bloodGroup: oldData.bloodGroup || 'Unknown'
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
            const response = await api.put(`/patients/update/${oldData._id}`, formData);
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

    return (
        <div className='fixed inset-0 bg-gray-900/70 flex justify-center items-center z-50'>
            <div className='h-[80vh] w-[90vw] md:w-[70vw] bg-white rounded-lg overflow-hidden flex flex-col'>
                <div className='flex justify-between items-center p-4 border-b'>
                    <h1 className='text-2xl font-semibold'>Edit Profile</h1>
                    <button 
                        onClick={onClose}
                        className='text-gray-500 hover:text-gray-700 text-2xl'
                    >
                        <AiOutlineClose />
                    </button>
                </div>

                <div className='flex-1 overflow-y-auto p-4 md:p-6'>
                    <form onSubmit={handleSubmit} className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        {/* Full Name */}
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

                        {/* Gender */}
                        <div className='space-y-1'>
                            <label className='block text-sm font-medium text-gray-700'>Gender</label>
                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                className='w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500'
                            >
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                                <option value="Prefer not to say">Prefer not to say</option>
                            </select>
                        </div>

                        {/* Date of Birth */}
                        <div className='space-y-1'>
                            <label className='block text-sm font-medium text-gray-700'>Date of Birth</label>
                            <input
                                type="date"
                                name="dob"
                                value={formData.dob}
                                onChange={handleChange}
                                className='w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500'
                                required
                            />
                        </div>

                        {/* Email */}
                        <div className='space-y-1'>
                            <label className='block text-sm font-medium text-gray-700'>Email</label>
                            <input
                                type="email"
                                value={formData.email}
                                className='w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500'
                                required
                            />
                        </div>

                        {/* Phone */}
                        <div className='space-y-1'>
                            <label className='block text-sm font-medium text-gray-700'>Phone</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className='w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500'
                            />
                        </div>

                        {/* Aadhar Number */}
                        <div className='space-y-1'>
                            <label className='block text-sm font-medium text-gray-700'>Aadhar Number</label>
                            <input
                                type="text"
                                value={formData.aadharNumber}
                                className='w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500'
                                required
                                pattern="[0-9]{12}"
                                title="12-digit Aadhar number"
                            />
                        </div>

                        {/* Blood Group */}
                        <div className='space-y-1'>
                            <label className='block text-sm font-medium text-gray-700'>Blood Group</label>
                            <select
                                name="bloodGroup"
                                value={formData.bloodGroup}
                                onChange={handleChange}
                                className='w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500'
                            >
                                <option value="Unknown">Unknown</option>
                                <option value="A+">A+</option>
                                <option value="A-">A-</option>
                                <option value="B+">B+</option>
                                <option value="B-">B-</option>
                                <option value="AB+">AB+</option>
                                <option value="AB-">AB-</option>
                                <option value="O+">O+</option>
                                <option value="O-">O-</option>
                            </select>
                        </div>

                        {/* Address */}
                        <div className='space-y-1 md:col-span-2'>
                            <label className='block text-sm font-medium text-gray-700'>Address</label>
                            <textarea
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                rows={3}
                                className='w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500'
                            />
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

export default EditDashBoard;