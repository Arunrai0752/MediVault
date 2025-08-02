import React from 'react'
import Profile from '../components/PatientsDash/Profile'
import Sidebar from '../components/PatientsDash/Sidebar'
import Dashboard from '../components/PatientsDash/Dashboard'
import Chatsection from '../components/PatientsDash/Chatsection.jsx'
import Doctorsearch from '../components/PatientsDash/Doctorsearch.jsx'
import Payments from '../components/PatientsDash/Payments.jsx'
import Reports from '../components/PatientsDash/reports.jsx'
import { useState } from 'react'
import Appoinments from '../components/PatientsDash/Appoinments.jsx'




function PatientDashboard() {

  const [active, setActive] = useState("dashBoard");

  return (
    <>
      <main className='flex h-screen overflow-hidden'>

        <div className='fixed h-full' >
          <Sidebar active={active} setActive={setActive} />
        </div>

        <div className='flex-1 ml-[20.2%] overflow-y-auto'>
          {active === "dashBoard" && < Dashboard />}    
          {active === "chatsection" && < Chatsection />}    
          {active === "profile" && < Profile />}    
          {active === "search" && < Doctorsearch />}    
          {active === "payments" && < Payments />}    
          {active === "reports" && <Reports />}    
          {active === "appoinment" && <Appoinments />}    
         

        </div>
      </main>
    </>
  )
}

export default PatientDashboard