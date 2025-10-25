import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Diff_Doc_Dash/General_Physician/Sidebar'
import Dashboard from '../components/Diff_Doc_Dash/General_Physician/Dashboard'
import Appointments from '../components/Diff_Doc_Dash/General_Physician/Appointments' 
import UploadDoc from '../components/Diff_Doc_Dash/General_Physician/UploadDoc'
import SearchPatients from '../components/Diff_Doc_Dash/General_Physician/SearchPatients'
import PatientsList from '../components/Diff_Doc_Dash/General_Physician/PatientsList'
import Setting from '../components/Setting'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../Context/authContext'

const GpDashboard = () => { 

    const [active, setActive] = useState("Dashboard"); // Fixed: useState returns array, not object
    const { user } = useAuth();
    const navigate = useNavigate();

    //  authentication check
    useEffect(() => {
      if (!user) {
        navigate('/login');
      }
    }, [user, navigate]);

    return (
        <div className="flex h-screen">
            <div className='fixed h-full'>
                <Sidebar active={active} setActive={setActive} />
            </div>

            <div className='flex-1 ml-70 overflow-y-auto'>
                {active === "Dashboard" && <Dashboard />}
                {active === "Appointments" && <Appointments />} {/* Fixed spelling */}
                {active === "UploadDoc" && <UploadDoc />}
                {active === "SearchPatients" && <SearchPatients />}
                {active === "PatientsList" && <PatientsList />}
                {active === "Setting" && <Setting />}
            </div>
        </div>
    )
}

export default GpDashboard