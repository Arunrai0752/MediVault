import React, { useState } from 'react'
import Dashboard from "../components/AdminDashboard/Dashboard"
import DoctorManage from '../components/AdminDashboard/DoctorManage'
import PatientManage from '../components/AdminDashboard/PatientManage'
import AppoinmentManage from '../components/AdminDashboard/AppoinmentManage'
import  Sidebar  from '../components/AdminDashboard/Sidebar';

const Admin = () => {
  
    const [active , setActive] = useState("dashboard")

 
    
    return (
            <div className="flex  min-h-screen bg-gray-50">
            
                        <div className='w-[20vw] h-screen fixed '>

                            <Sidebar active={active}  setActive= {setActive} />

                        </div>
                        <div className="flex-1 p-6 ps-[23%]">
                            {active === 'dashboard' && <Dashboard />}
                            {active === 'doctors' && <DoctorManage />}
                            {active === 'patients' && <PatientManage />}
                            {active === 'appointments' && <AppoinmentManage />}
                         
                        </div>
            
            </div>
    )
}

export default Admin