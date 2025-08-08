import React, { useEffect } from 'react'
import Profile from '../components/PatientsDash/Profile'
import Sidebar from '../components/PatientsDash/Sidebar'
import Dashboard from '../components/PatientsDash/Dashboard'
import Chatsection from '../components/PatientsDash/Chatsection.jsx'
import Doctorsearch from '../components/PatientsDash/Doctorsearch.jsx'
import Payments from '../components/PatientsDash/Payments.jsx'
import Reports from '../components/PatientsDash/reports.jsx'
import { useState } from 'react'
import Appoinments from '../components/PatientsDash/Appoinments.jsx'
import { useNavigate } from 'react-router-dom'




function PatientDashboard() {
  const navigate = useNavigate();
  const [active, setActive] = useState("dashBoard");
  useEffect(() => {
    const user = sessionStorage.getItem("LoginUser")
    if (!user) { navigate("/login") }

  }, [])

  return (
    <>
      <main className='flex h-screen overflow-hidden'>

        <div className='fixed h-full' >
          <Sidebar active={active} setActive={setActive} />
        </div>

        <div className='flex-1 ml-[23%] overflow-y-auto'>
          {active === "dashBoard" && < Dashboard setActive={setActive} />}
          {active === "chatsection" && < Chatsection />}
          {active === "profile" && < Profile setActive={setActive} />}
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