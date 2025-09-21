import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Register from './pages/Register'
import About from './components/About'
import DoctorDash from './pages/DoctorDash'
import DoctorRegister from './pages/DoctorRegister'
import PaientDashBoard from "./pages/PatientDashboard"
import { Toaster } from 'react-hot-toast'
import Services from './pages/Services'
import Doctors from './pages/Doctors'
import Loader from './components/loader'
import { useEffect, useState } from 'react'

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000); // 3 sec loader
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <BrowserRouter>
          <Toaster />
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<About />} />
            <Route path="/doctordash" element={<DoctorDash />} />
            <Route path="/doctorregister" element={<DoctorRegister />} />
            <Route path="/patientDashboard" element={<PaientDashBoard />} />
            <Route path="/service" element={<Services />} />
            <Route path="/doctors" element={<Doctors />} />
          </Routes>
        </BrowserRouter>
      )}
    </>
  )
}

export default App;
