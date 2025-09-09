import React, { useEffect, useState } from 'react'
import Sidebar from '../components/DoctorDash/Sidebar.jsx'
import Profile from '../components/DoctorDash/Profile.jsx'
import Appointments from '../components/DoctorDash/Appointments.jsx'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../Context/authContext.jsx'
import SearchPatients from '../components/DoctorDash/SearchPatients.jsx'




const DoctorDash = () => {
  const [active, setActive] = useState("Profile");
  const navigate = useNavigate();
  const {user} = useAuth();



  useEffect(() => {  
    if (!user) { navigate("/login") }

  }, [])

  return (
    <main className='flex h-fit overflow-hidden bg-gradient-to-br from-teal-50 via-blue-50 to-white'>

      <div className='fixed h-full'>
        <Sidebar active={active} setActive={setActive} />
      </div>

      <div className='flex-1 ml-70 overflow-y-auto'>
        {active === "Profile" && <Profile />}
        {active === "Appointments" && <Appointments />}
        {active === "SearchPatients" && <SearchPatients />}

      </div>
    </main>
  )
}

export default DoctorDash