import React, { useEffect, useState } from 'react'
import Sidebar from '../components/DoctorDash/Sidebar.jsx'
import Profile from '../components/DoctorDash/Profile.jsx'
import Patients from '../components/DoctorDash/Patients.jsx'
import Appointments from '../components/DoctorDash/Appointments.jsx'
import Chatsection from '../components/DoctorDash/Chatsection.jsx'
import { useNavigate } from 'react-router-dom'




const DoctorDash = () => {
  const [active, setActive] = useState("Profile");
  const navigate = useNavigate();



  useEffect(() => {  
    const user = sessionStorage.getItem("LoginUser")
    if (!user) { navigate("/login") }

  }, [])

  return (
    <main className='flex h-screen overflow-hidden'>

      <div className='fixed h-full'>
        <Sidebar active={active} setActive={setActive} />
      </div>

      <div className='flex-1 ml-70 overflow-y-auto'>
        {active === "Profile" && <Profile />}
        {active === "Patients" && <Patients />}
        {active === "Appointments" && <Appointments />}
      </div>
    </main>
  )
}

export default DoctorDash