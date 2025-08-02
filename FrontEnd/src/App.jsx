import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Register from './pages/Register'
import About from './components/About'
import DoctorDash from './pages/DoctorDash'
import DoctorRegister from './pages/DoctorRegister'
import PaientDashBoard from "./pages/PatientDashboard"
import {Toaster} from 'react-hot-toast'



function App() {
  return (
    <>
      <BrowserRouter>
      <Toaster/>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/doctordash" element={<DoctorDash />} />
          <Route path="/doctorregister" element={<DoctorRegister />} />
          <Route path="/patientDashboard" element={<PaientDashBoard />} />
    

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App