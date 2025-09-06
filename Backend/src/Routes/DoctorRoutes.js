import express from "express";
import { DocRegister   , DoctorLogin,UpdateDoctors, FetchAllAppointments , GetPatientDetail } from "../Controllers/authController.js";
import { ProtectDoctor  } from "../Middlewares/authmiddleWare.js";


const router = express.Router();


router.post("/register", DocRegister)
router.post("/login", DoctorLogin)
router.put("/update/:Did", ProtectDoctor ,   UpdateDoctors) 
router.get("/patient/:id" , ProtectDoctor , GetPatientDetail)
router.get("/PatientAppoinments/:id" , FetchAllAppointments );



export default router;
