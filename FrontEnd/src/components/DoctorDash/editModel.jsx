import React, { useState, useEffect } from 'react';
import { AiOutlineClose } from "react-icons/ai";
import { toast } from 'react-hot-toast';
import api from '../../../Configs/api';

const DoctorEditModel = ({ isOpen, onClose, oldData, onUpdate }) => {
    const [formData, setFormData] = useState({
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
        role: "Doctor",
        qualifications: '',
        consultationHours: '',
        emergencyContact: '',
        department: '',
        biography: '',
        services: [],
        languages: [],
        education: []
    });

    const [loading, setLoading] = useState(false);
    const [newService, setNewService] = useState('');
    const [newLanguage, setNewLanguage] = useState('');
    const [newEducation, setNewEducation] = useState('');

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
                fee: oldData.fee || 500,
                status: oldData.status || 'Active',
                role: "Doctor",
                qualifications: oldData.qualifications || '',
                consultationHours: oldData.consultationHours || '',
                emergencyContact: oldData.emergencyContact || '',
                department: oldData.department || '',
                biography: oldData.biography || '',
                services: Array.isArray(oldData.services) ? oldData.services : [],
                languages: Array.isArray(oldData.languages) ? oldData.languages : [],
                education: Array.isArray(oldData.education) ? oldData.education : []
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

    const handleArrayChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: [...prev[field], value]
        }));
    };

    const removeArrayItem = (field, index) => {
        setFormData(prev => ({
            ...prev,
            [field]: prev[field].filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await api.put(`/doctors/update/${oldData._id}`, formData);
            sessionStorage.setItem("LoginUser", JSON.stringify(response.data.data));
            onUpdate(response.data.data);
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
            <div className='h-[90vh] w-[90vw] md:w-[80vw] bg-white rounded-lg overflow-hidden flex flex-col'>
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
                        {/* Personal Information */}
                        <div className='md:col-span-2'>
                            <h3 className='text-lg font-semibold mb-2 text-blue-800 border-b pb-2'>Personal Information</h3>
                        </div>

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
                                className='w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-gray-100'
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
                            <label className='block text-sm font-medium text-gray-700'>Biography</label>
                            <textarea
                                name="biography"
                                value={formData.biography}
                                onChange={handleChange}
                                className='w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 min-h-[100px]'
                            />
                        </div>

                        {/* Professional Information */}
                        <div className='md:col-span-2 mt-4'>
                            <h3 className='text-lg font-semibold mb-2 text-blue-800 border-b pb-2'>Professional Information</h3>
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
                            <label className='block text-sm font-medium text-gray-700'>Department</label>
                            <input
                                type="text"
                                name="department"
                                value={formData.department}
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
                                className='w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-gray-100'
                                disabled
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

                        <div className='space-y-1'>
                            <label className='block text-sm font-medium text-gray-700'>Qualifications</label>
                            <input
                                type="text"
                                name="qualifications"
                                value={formData.qualifications}
                                onChange={handleChange}
                                className='w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500'
                            />
                        </div>

                        {/* Availability */}
                        <div className='md:col-span-2 mt-4'>
                            <h3 className='text-lg font-semibold mb-2 text-blue-800 border-b pb-2'>Availability</h3>
                        </div>

                        <div className='space-y-1'>
                            <label className='block text-sm font-medium text-gray-700'>Consultation Hours</label>
                            <input
                                type="text"
                                name="consultationHours"
                                value={formData.consultationHours}
                                onChange={handleChange}
                                className='w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500'
                                placeholder="e.g., 9:00 AM - 5:00 PM"
                            />
                        </div>

                        <div className='space-y-1'>
                            <label className='block text-sm font-medium text-gray-700'>Availability Status</label>
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

                        {/* Additional Information */}
                        <div className='md:col-span-2 mt-4'>
                            <h3 className='text-lg font-semibold mb-2 text-blue-800 border-b pb-2'>Additional Information</h3>
                        </div>

                        <div className='space-y-1'>
                            <label className='block text-sm font-medium text-gray-700'>Emergency Contact</label>
                            <input
                                type="text"
                                name="emergencyContact"
                                value={formData.emergencyContact}
                                onChange={handleChange}
                                className='w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500'
                            />
                        </div>

                        <div className='space-y-1 md:col-span-2'>
                            <label className='block text-sm font-medium text-gray-700'>Services Offered</label>
                            <div className='flex items-center gap-2'>
                                <input
                                    type="text"
                                    value={newService}
                                    onChange={(e) => setNewService(e.target.value)}
                                    className='flex-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500'
                                    placeholder="Add a service"
                                />
                                <button
                                    type="button"
                                    onClick={() => {
                                        if (newService.trim()) {
                                            handleArrayChange('services', newService);
                                            setNewService('');
                                        }
                                    }}
                                    className='px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700'
                                >
                                    Add
                                </button>
                            </div>
                            <div className='mt-2 flex flex-wrap gap-2'>
                                {formData.services.map((service, index) => (
                                    <div key={index} className='bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center'>
                                        {service}
                                        <button
                                            type="button"
                                            onClick={() => removeArrayItem('services', index)}
                                            className='ml-2 text-blue-600 hover:text-blue-800'
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className='space-y-1 md:col-span-2'>
                            <label className='block text-sm font-medium text-gray-700'>Languages Spoken</label>
                            <div className='flex items-center gap-2'>
                                <input
                                    type="text"
                                    value={newLanguage}
                                    onChange={(e) => setNewLanguage(e.target.value)}
                                    className='flex-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500'
                                    placeholder="Add a language"
                                />
                                <button
                                    type="button"
                                    onClick={() => {
                                        if (newLanguage.trim()) {
                                            handleArrayChange('languages', newLanguage);
                                            setNewLanguage('');
                                        }
                                    }}
                                    className='px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700'
                                >
                                    Add
                                </button>
                            </div>
                            <d iv className='mt-2 flex flex-wrap gap-2'>
                                {formData.languages.map((language, index) => (
                                    <div key={index} className='bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm flex items-center'>
                                        {language}
                                        <button
                                            type="button"
                                            onClick={() => removeArrayItem('languages', index)}
                                            className='ml-2 text-green-600 hover:text-green-800'
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </d>
                        </div>

                        <div className='space-y-1 md:col-span-2'>
                            <label className='block text-sm font-medium text-gray-700'>Education</label>
                            <div className='flex items-center gap-2'>
                                <input
                                    type="text"
                                    value={newEducation}
                                    onChange={(e) => setNewEducation(e.target.value)}
                                    className='flex-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500'
                                    placeholder="Add education"
                                />
                                <button
                                    type="button"
                                    onClick={() => {
                                        if (newEducation.trim()) {
                                            handleArrayChange('education', newEducation);
                                            setNewEducation('');
                                        }
                                    }}
                                    className='px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700'
                                >
                                    Add
                                </button>
                            </div>
                            <div className='mt-2'>
                                {formData.education.map((item, index) => (
                                    <div key={index} className='flex items-center justify-between p-2 border-b'>
                                        {item}
                                        <button
                                            type="button"
                                            onClick={() => removeArrayItem('education', index)}
                                            className='text-red-500 hover:text-red-700'
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className='md:col-span-2 flex justify-end space-x-4 pt-6'>
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