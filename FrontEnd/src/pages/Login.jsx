import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../../Configs/api';

const Login = () => {
    
    const navigate = useNavigate()
    const location = useLocation();
    const [isDoctor, setIsDoctor] = useState(location.state?.isDoctorDefault || false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmitDoctor = async (e) => {
        e.preventDefault();
        try {

            const res = await api.post("/auth/loginD", formData);
            toast.success(res.data.message);
            setFormData({
                email: "",
                password: "",
            });
            sessionStorage.setItem("LoginUser", JSON.stringify(res.data.data))
            navigate("/doctordash")
        } catch (error) {
            toast.error(error.message)
        }
    };


    const handleSubmitPatients = async (e) => {
        e.preventDefault();
        try {

            const res = await api.post("/auth/loginP", formData);
            toast.success(res.data.message);
            setFormData({
                email: "",
                password: "",
            });
            sessionStorage.setItem("LoginUser", JSON.stringify(res.data.data))
            navigate("/patientDashboard")

        } catch (error) {
            toast.error(error.message)
        }
    };


    useEffect(() => {
        setFormData({
            email: '',
            password: ''
        });
    }, [isDoctor]);

    return (
        <main className='min-h-[92vh] w-full bg-blue-50 flex justify-center items-center p-4'>
            <div className='w-full max-w-md h-[60vh] bg-white rounded-lg shadow-md overflow-hidden border border-blue-100'>

                <div className='flex border-b border-blue-200'>
                    <button
                        className={`flex-1 py-4 flex items-center justify-center gap-2 transition-colors ${isDoctor ? 'bg-blue-600 text-white' : 'bg-white text-blue-800'}`}
                        onClick={() => setIsDoctor(true)}
                    >
                        <span className='font-medium'>Doctor</span>
                    </button>

                    <button
                        className={`flex-1 py-4 flex items-center justify-center gap-2 transition-colors ${!isDoctor ? 'bg-blue-600 text-white' : 'bg-white text-blue-800'}`}
                        onClick={() => setIsDoctor(false)}
                    >
                        <span className='font-medium'>Patient</span>
                    </button>
                </div>

                {isDoctor ? (
                    <div>
                        <div className='grid w-full items-center px-10'>
                            <div className='grid p-4'>
                                <label htmlFor="" className='p-2 text-blue-700'>Email :</label>
                                <input
                                    type="email"
                                    placeholder='Enter Your Email'
                                    name='email'
                                    onChange={handleChange}
                                    value={formData.email}
                                    className='border border-blue-200 outline-blue-500 rounded-lg p-2 bg-blue-50'
                                />
                            </div>
                            <div className='grid p-4'>
                                <label htmlFor="" className='p-2 text-blue-700'>Password :</label>
                                <input
                                    type="password"
                                    placeholder='Enter Your Password'
                                    name='password'
                                    onChange={handleChange}
                                    value={formData.password}
                                    className='border border-blue-200 outline-blue-500 rounded-lg p-2 bg-blue-50'
                                />
                            </div>
                        </div>

                        <div className='grid w-full justify-center items-center p-10'>
                            <button
                                className='rounded-lg p-2 w-[200px] bg-blue-600 text-white hover:bg-blue-700 transition-colors'
                                onClick={handleSubmitDoctor}
                            >
                                LogIn
                            </button>
                        </div>
                    </div>
                ) : (
                    <div>
                        <div>
                            <div className='grid w-full items-center px-10'>
                                <div className='grid p-4'>
                                    <label htmlFor="" className='p-2 text-blue-700'>Email :</label>
                                    <input
                                        type="email"
                                        placeholder='Enter Your Email'
                                        name='email'
                                        onChange={handleChange}
                                        value={formData.email}
                                        className='border border-blue-200 outline-blue-500 rounded-lg p-2 bg-blue-50'
                                    />
                                </div>
                                <div className='grid p-4'>
                                    <label htmlFor="" className='p-2 text-blue-700'>Password :</label>
                                    <input
                                        type="password"
                                        placeholder='Enter Your Password'
                                        name='password'
                                        onChange={handleChange}
                                        value={formData.password}
                                        className='border border-blue-200 outline-blue-500 rounded-lg p-2 bg-blue-50'
                                    />
                                </div>
                            </div>

                            <div className='grid w-full justify-center items-center p-10'>
                                <button
                                    className='rounded-lg p-2 w-[200px] bg-blue-600 text-white hover:bg-blue-700 transition-colors'
                                    onClick={handleSubmitPatients}
                                >
                                    LogIn
                                </button>
                            </div>
                        </div>

                        <p className='text-center text-blue-600 hover:text-blue-800 cursor-pointer transition-colors'>
                            Forgot password ?
                        </p>
                    </div>
                )}
            </div>
        </main>);
};

export default Login;