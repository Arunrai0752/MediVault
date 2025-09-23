import React, { useState } from 'react'
import Dashboard from '../components/AdminDashboard/Dashboard'
import DoctorManage from '../components/AdminDashboard/DoctorManage'
import PatientManage from '../components/AdminDashboard/PatientManage'
import AppoinmentManage from '../components/AdminDashboard/AppoinmentManage'
import PrescriptionManage from '../components/AdminDashboard/PrescriptionManage'
import ReportManage from '../components/AdminDashboard/ReportManage'

const Admin = () => {
  
    const [active , setActive] = useState("dashboard")

    const nav = [
        { key: 'dashboard', label: 'Overview' },
        { key: 'doctors', label: 'Doctors' },
        { key: 'patients', label: 'Patients' },
        { key: 'appointments', label: 'Appointments' },
        { key: 'prescriptions', label: 'Prescriptions' },
        { key: 'reports', label: 'Reports' },
    ]
    
    return (
            <div className="min-h-screen bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="bg-white rounded-lg shadow-md overflow-hidden flex">
                        
                        <main className="flex-1 p-6">
                            {active === 'dashboard' && <Dashboard />}
                            {active === 'doctors' && <DoctorManage />}
                            {active === 'patients' && <PatientManage />}
                            {active === 'appointments' && <AppoinmentManage />}
                            {active === 'prescriptions' && <PrescriptionManage />}
                            {active === 'reports' && <ReportManage />}
                        </main>
                    </div>
                </div>
            </div>
    )
}

export default Admin